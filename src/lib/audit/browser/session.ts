import type { Browser, BrowserContext } from "puppeteer-core";
import {
  captureViewport,
  type CaptureOutput,
  type ViewportSpec,
} from "@/lib/audit/browser/capture";
import { DESKTOP_VIEWPORT, MOBILE_VIEWPORT } from "@/lib/audit/config";
import { withTimeout } from "@/lib/audit/net/timeout";
import { describeError } from "@/lib/audit/sections/run-section";
import type { AuditDeps } from "@/lib/audit/deps";
import type { Limits } from "@/lib/audit/types/common";
import type { ViewportName } from "@/lib/audit/types/viewport";

export type ViewportOutcome =
  | ({ ok: true } & CaptureOutput)
  | { ok: false; viewport: ViewportName; reasonCode: string; reason: string };

export type BrowserPhase =
  | { configured: false }
  | { configured: true; outcomes: ViewportOutcome[] };

const SPECS: ViewportSpec[] = [
  { name: "mobile", ...MOBILE_VIEWPORT, scale: 2, mobile: true },
  { name: "desktop", ...DESKTOP_VIEWPORT, scale: 1, mobile: false },
];

const SAFETY_MARGIN_MS = 4000;

async function openContext(browser: Browser): Promise<BrowserContext> {
  try {
    return await browser.createBrowserContext();
  } catch {
    return browser.defaultBrowserContext();
  }
}

export async function runBrowserPhase(
  url: URL,
  deps: AuditDeps,
  limits: Limits,
  parent: AbortSignal,
): Promise<BrowserPhase> {
  const endpoint = deps.env.browserWsEndpoint;
  if (!endpoint) return { configured: false };

  return withTimeout(
    "browser",
    limits.browserMs,
    async () => {
      const deadlineAt = deps.now() + limits.browserMs - SAFETY_MARGIN_MS;
      const axeSource = deps.loadAxeSource();
      axeSource.catch(() => {});
      const browser = await deps.connectBrowser(endpoint);
      let context: BrowserContext | null = null;
      try {
        context = await openContext(browser);
        const activeContext = context;
        const outcomes = await Promise.all(
          SPECS.map(async (spec): Promise<ViewportOutcome> => {
            try {
              const output = await captureViewport(activeContext, {
                url,
                spec,
                deps,
                limits,
                axeSource,
                deadlineAt,
              });
              return { ok: true, ...output };
            } catch (error) {
              return { ok: false, viewport: spec.name, ...describeError(error) };
            }
          }),
        );
        return { configured: true as const, outcomes };
      } finally {
        await context?.close().catch(() => {});
        await browser.disconnect().catch(() => {});
      }
    },
    parent,
  );
}
