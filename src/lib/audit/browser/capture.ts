import type { BrowserContext, HTTPRequest, Page } from "puppeteer-core";
import { RequestGuard, GUARD_INIT_SCRIPT, type GuardRequest } from "@/lib/audit/browser/guard";
import { runAxe } from "@/lib/audit/browser/page-scripts/axe";
import { collectDomSnapshot } from "@/lib/audit/browser/page-scripts/dom-snapshot";
import { probeKeyboard } from "@/lib/audit/browser/page-scripts/keyboard";
import { collectLayout } from "@/lib/audit/browser/page-scripts/layout";
import { AuditTimeoutError, isTimeoutError, withTimeout } from "@/lib/audit/net/timeout";
import { detectBlock } from "@/lib/audit/sections/blocked-detect";
import { describeError } from "@/lib/audit/sections/run-section";
import type { AuditDeps } from "@/lib/audit/deps";
import type { AuditFile, Limits, Measured } from "@/lib/audit/types/common";
import type {
  JsError,
  ScreenshotRef,
  ViewportCaptureBase,
  ViewportName,
} from "@/lib/audit/types/viewport";

export interface ViewportSpec {
  name: ViewportName;
  width: number;
  height: number;
  scale: number;
  mobile: boolean;
}

export interface CaptureInput {
  url: URL;
  spec: ViewportSpec;
  deps: AuditDeps;
  limits: Limits;
  axeSource: Promise<string>;
  deadlineAt: number;
}

export interface CaptureOutput {
  capture: ViewportCaptureBase;
  files: AuditFile[];
}

const MAX_RECORDED = 25;
const MAX_FULL_PAGE_HEIGHT = 8000;

function adaptRequest(request: HTTPRequest, page: Page): GuardRequest {
  return {
    url: () => request.url(),
    method: () => request.method(),
    resourceType: () => request.resourceType(),
    isNavigationRequest: () => request.isNavigationRequest(),
    isMainFrame: () => request.frame() === page.mainFrame(),
    redirectChainLength: () => request.redirectChain().length,
    abort: () => request.abort("blockedbyclient"),
    continue: () => request.continue(),
  };
}

function failure(error: unknown): Measured<never> {
  const { reasonCode, reason } = describeError(error);
  return { status: "unavailable", reasonCode, reason };
}

function blockedStep(): Measured<never> {
  return {
    status: "unavailable",
    reasonCode: "blocked_by_site",
    reason: "El sitio mostró un control antibot o captcha. No se intentó sortearlo.",
  };
}

async function step<T>(
  label: string,
  input: CaptureInput,
  work: () => Promise<T>,
): Promise<Measured<T>> {
  const remaining = input.deadlineAt - input.deps.now();
  if (remaining <= 0) return failure(new AuditTimeoutError(label, 0));
  try {
    return { status: "ok", value: await withTimeout(label, remaining, work) };
  } catch (error) {
    return failure(error);
  }
}

async function attachGuards(
  page: Page,
  guard: RequestGuard,
  jsErrors: JsError[],
  counter: { total: number },
) {
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    void guard.handle(adaptRequest(request, page));
  });
  page.on("pageerror", (error) => {
    counter.total += 1;
    if (jsErrors.length < MAX_RECORDED) {
      jsErrors.push({
        kind: "pageerror",
        message: String(error instanceof Error ? error.message : error).slice(0, 300),
        location: null,
      });
    }
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    counter.total += 1;
    if (jsErrors.length >= MAX_RECORDED) return;
    const where = message.location();
    jsErrors.push({
      kind: "console",
      message: message.text().slice(0, 300),
      location: where.url ? `${where.url}:${where.lineNumber ?? 0}`.slice(0, 300) : null,
    });
  });
  page.on("requestfailed", (request) => {
    const errorText = request.failure()?.errorText ?? null;
    if (guard.isPolicyBlocked(request.url().slice(0, 300)) || errorText === "net::ERR_ABORTED")
      return;
    guard.recordFailure({
      url: request.url().slice(0, 300),
      resourceType: request.resourceType(),
      failure: "request_failed",
      status: null,
      errorText,
    });
  });
  page.on("response", (response) => {
    if (response.status() < 400) return;
    guard.recordFailure({
      url: response.url().slice(0, 300),
      resourceType: response.request().resourceType(),
      failure: "http_error",
      status: response.status(),
      errorText: null,
    });
  });
  const cdp = await page.createCDPSession();
  await cdp.send("Network.enable");
  await cdp.send("Network.setBypassServiceWorker", { bypass: true }).catch(() => {});
  await cdp.send("Network.setBlockedURLs", { urls: ["ws://*", "wss://*"] }).catch(() => {});
  cdp.on("Network.dataReceived", (event) => guard.addBytes(event.dataLength));
  cdp.on("Network.webSocketCreated", (event) => {
    guard.recordBlocked({
      url: event.url.slice(0, 300),
      resourceType: "websocket",
      method: "GET",
      reasonCode: "websocket_not_allowed",
    });
  });
  await page.evaluateOnNewDocument(GUARD_INIT_SCRIPT);
}

async function takeScreenshots(page: Page, input: CaptureInput, docHeight: number) {
  const { spec } = input;
  const files: AuditFile[] = [];
  const refs: ScreenshotRef[] = [];
  const height = Math.max(spec.height, Math.min(docHeight || spec.height, MAX_FULL_PAGE_HEIGHT));
  const jobs = [
    {
      kind: "fold" as const,
      clip: { x: 0, y: 0, width: spec.width, height: spec.height },
      quality: 80,
    },
    { kind: "full" as const, clip: { x: 0, y: 0, width: spec.width, height }, quality: 70 },
  ];
  for (const job of jobs) {
    const data = await page.screenshot({
      type: "jpeg",
      quality: job.quality,
      clip: job.clip,
      captureBeyondViewport: job.kind === "full",
    });
    const fileName = `${spec.name}-${job.kind}.jpg`;
    files.push({ fileName, mimeType: "image/jpeg", data: new Uint8Array(data) });
    refs.push({
      kind: job.kind,
      fileName,
      mimeType: "image/jpeg",
      width: job.clip.width * spec.scale,
      height: job.clip.height * spec.scale,
      bytes: data.byteLength,
      clippedFullPage: job.kind === "full" && docHeight > MAX_FULL_PAGE_HEIGHT,
    });
  }
  return { files, refs };
}

export async function captureViewport(
  context: BrowserContext,
  input: CaptureInput,
): Promise<CaptureOutput> {
  const { spec, limits, url } = input;
  const startedAt = input.deps.now();
  const jsErrors: JsError[] = [];
  const counter = { total: 0 };
  const guard = new RequestGuard({
    policy: { resolveDns: input.deps.resolveDns, testException: input.deps.testException },
    maxRequests: limits.maxRequestsPerPage,
    maxBytes: limits.maxBytesPerPage,
    maxRecorded: MAX_RECORDED,
  });
  const page = await context.newPage();
  let files: AuditFile[] = [];
  let screenshots: ScreenshotRef[] = [];
  let httpStatus: number | null = null;
  let finalUrl: string | null = null;
  let navigationError: string | null = null;
  let blockedBy: string | null = null;
  let dom: ViewportCaptureBase["dom"] = failure(new Error("no ejecutado"));
  let layout: ViewportCaptureBase["layout"] = dom as ViewportCaptureBase["layout"];
  let axe: ViewportCaptureBase["axe"] = dom as ViewportCaptureBase["axe"];
  let keyboard: ViewportCaptureBase["keyboard"] = dom as ViewportCaptureBase["keyboard"];

  try {
    await attachGuards(page, guard, jsErrors, counter);
    await page.setViewport({
      width: spec.width,
      height: spec.height,
      deviceScaleFactor: spec.scale,
      isMobile: spec.mobile,
      hasTouch: spec.mobile,
    });
    try {
      const navTimeout = Math.max(
        1000,
        Math.min(25_000, input.deadlineAt - input.deps.now() - 15_000),
      );
      const response = await page.goto(url.toString(), { waitUntil: "load", timeout: navTimeout });
      httpStatus = response?.status() ?? null;
      await page.waitForNetworkIdle({ idleTime: 700, timeout: 3000 }).catch(() => {});
      const headers = response?.headers() ?? {};
      const title = await page.title().catch(() => "");
      const text = (await page
        .evaluate("document.body ? document.body.innerText.slice(0, 4000) : ''")
        .catch(() => "")) as string;
      blockedBy = detectBlock({
        status: httpStatus,
        headers: { get: (name) => headers[name.toLowerCase()] ?? null },
        title,
        text,
      });
    } catch (error) {
      navigationError = isTimeoutError(error) ? "timeout" : describeError(error).reason;
    }
    guard.closeNavigation();
    finalUrl = page.url() === "about:blank" ? null : page.url();

    if (navigationError === null && blockedBy === null) {
      const snapshot = await step("dom", input, () =>
        collectDomSnapshot(page, {
          maxText: limits.maxVisibleTextChars,
          maxNodes: limits.maxDomNodes,
          maxLinks: limits.maxLinksSampled,
        }),
      );
      dom = snapshot;
      layout = await step("layout", input, () => collectLayout(page, 10));
      const docHeight = snapshot.status === "ok" ? snapshot.value.documentHeight : spec.height;
      const shots = await step("screenshots", input, () => takeScreenshots(page, input, docHeight));
      if (shots.status === "ok") {
        files = shots.value.files;
        screenshots = shots.value.refs;
      }
      axe = await step("axe", input, async () => runAxe(page, await input.axeSource, 3));
      keyboard = await step("keyboard", input, () => probeKeyboard(page, 40));
    } else if (blockedBy !== null) {
      dom = blockedStep();
      layout = blockedStep();
      axe = blockedStep();
      keyboard = blockedStep();
      const shots = await step("screenshots", input, () =>
        takeScreenshots(page, input, spec.height),
      );
      if (shots.status === "ok") {
        files = shots.value.files;
        screenshots = shots.value.refs;
      }
    }
  } finally {
    await withTimeout("page-close", 3000, () => page.close()).catch(() => {});
  }

  return {
    capture: {
      viewport: spec.name,
      width: spec.width,
      height: spec.height,
      finalUrl,
      httpStatus,
      blockedBy,
      navigationError,
      elapsedMs: input.deps.now() - startedAt,
      jsErrors,
      jsErrorCount: counter.total,
      network: guard.snapshot(),
      screenshots,
      dom,
      layout,
      axe,
      keyboard,
    },
    files,
  };
}
