import { readBodyLimited } from "@/lib/audit/net/read-body";
import { safeFetch, type RedirectHop } from "@/lib/audit/net/safe-fetch";
import { withTimeout } from "@/lib/audit/net/timeout";
import { describeError } from "@/lib/audit/sections/run-section";
import { detectBlock } from "@/lib/audit/sections/blocked-detect";
import { evaluateRobots, parseRobotsTxt } from "@/lib/audit/static/robots";
import { parseSitemap } from "@/lib/audit/static/sitemap";
import type { AuditDeps } from "@/lib/audit/deps";
import type { Limits } from "@/lib/audit/types/common";
import type { RobotsTxtInfo, SitemapInfo } from "@/lib/audit/types/seo";
import type { ProtocolProbe } from "@/lib/audit/types/technical";

export interface StaticPage {
  finalUrl: string;
  status: number;
  contentType: string | null;
  xRobotsTag: string | null;
  html: string;
  truncated: boolean;
  hops: RedirectHop[];
  responseTimeMs: number;
  blockedBy: string | null;
}

export type StaticPageResult =
  | { ok: true; page: StaticPage }
  | { ok: false; reasonCode: string; reason: string };

export interface StaticPhase {
  page: StaticPageResult;
  protocolProbe: ProtocolProbe | null;
  robots: RobotsTxtInfo | null;
  sitemap: SitemapInfo | null;
}

function fetchOptions(deps: AuditDeps, limits: Limits, signal: AbortSignal) {
  return {
    fetch: deps.fetch,
    policy: { resolveDns: deps.resolveDns, testException: deps.testException },
    maxRedirects: limits.maxRedirects,
    signal,
  };
}

async function fetchPage(
  url: URL,
  deps: AuditDeps,
  limits: Limits,
  signal: AbortSignal,
): Promise<StaticPageResult> {
  const startedAt = deps.now();
  try {
    const { response, finalUrl, hops } = await safeFetch(url, fetchOptions(deps, limits, signal));
    const contentType = response.headers.get("content-type");
    const isHtml = contentType === null || /html|xml/i.test(contentType);
    const body = isHtml
      ? await readBodyLimited(response, limits.maxHtmlBytes)
      : { text: "", bytes: 0, truncated: false };
    if (!isHtml) await response.body?.cancel().catch(() => {});
    const blockedBy = detectBlock({
      status: response.status,
      headers: response.headers,
      html: body.text,
      text: body.text,
    });
    return {
      ok: true,
      page: {
        finalUrl: finalUrl.toString(),
        status: response.status,
        contentType,
        xRobotsTag: response.headers.get("x-robots-tag"),
        html: body.text,
        truncated: body.truncated,
        hops,
        responseTimeMs: deps.now() - startedAt,
        blockedBy,
      },
    };
  } catch (error) {
    return { ok: false, ...describeError(error) };
  }
}

async function probeProtocol(
  url: URL,
  deps: AuditDeps,
  limits: Limits,
  signal: AbortSignal,
): Promise<ProtocolProbe> {
  const variant = new URL(url.toString());
  variant.protocol = url.protocol === "https:" ? "http:" : "https:";
  variant.port = "";
  try {
    const { response, finalUrl } = await safeFetch(variant, {
      ...fetchOptions(deps, limits, signal),
      method: "HEAD",
    });
    await response.body?.cancel().catch(() => {});
    return {
      tested: variant.toString(),
      reachable: true,
      status: response.status,
      finalUrl: finalUrl.toString(),
      endsOnHttps: finalUrl.protocol === "https:",
      reason: null,
    };
  } catch (error) {
    return {
      tested: variant.toString(),
      reachable: false,
      status: null,
      finalUrl: null,
      endsOnHttps: null,
      reason: describeError(error).reason,
    };
  }
}

async function fetchRobots(
  origin: URL,
  pageUrl: URL,
  deps: AuditDeps,
  limits: Limits,
  signal: AbortSignal,
): Promise<{ info: RobotsTxtInfo; text: string | null }> {
  const robotsUrl = new URL("/robots.txt", origin);
  const base: RobotsTxtInfo = {
    url: robotsUrl.toString(),
    status: "error",
    httpStatus: null,
    reason: null,
    disallowsPage: null,
    matchedRule: null,
    sitemapsDeclared: [],
  };
  try {
    const { response } = await safeFetch(robotsUrl, fetchOptions(deps, limits, signal));
    if (response.status === 404 || response.status === 410) {
      await response.body?.cancel().catch(() => {});
      return { info: { ...base, status: "not_found", httpStatus: response.status }, text: null };
    }
    if (!response.ok) {
      await response.body?.cancel().catch(() => {});
      return {
        info: { ...base, httpStatus: response.status, reason: `HTTP ${response.status}` },
        text: null,
      };
    }
    const body = await readBodyLimited(response, limits.maxRobotsBytes);
    const parsed = parseRobotsTxt(body.text);
    const verdict = evaluateRobots(parsed, `${pageUrl.pathname}${pageUrl.search}`);
    return {
      info: {
        ...base,
        status: "fetched",
        httpStatus: response.status,
        disallowsPage: verdict.disallowed,
        matchedRule: verdict.matchedRule,
        sitemapsDeclared: parsed.sitemaps.slice(0, 10),
      },
      text: body.text,
    };
  } catch (error) {
    return { info: { ...base, reason: describeError(error).reason }, text: null };
  }
}

async function fetchSitemap(
  origin: URL,
  pageUrl: URL,
  declared: string[],
  deps: AuditDeps,
  limits: Limits,
  signal: AbortSignal,
): Promise<SitemapInfo> {
  const fromRobots = declared.length > 0;
  const target = fromRobots ? declared[0] : new URL("/sitemap.xml", origin).toString();
  const base: SitemapInfo = {
    url: target,
    origin: fromRobots ? "robots_txt" : "default_location",
    status: "error",
    httpStatus: null,
    kind: null,
    locCount: null,
    listsPage: null,
    reason: null,
  };
  try {
    const { response } = await safeFetch(
      new URL(target, origin),
      fetchOptions(deps, limits, signal),
    );
    if (response.status === 404 || response.status === 410) {
      await response.body?.cancel().catch(() => {});
      return { ...base, status: "not_found", httpStatus: response.status };
    }
    if (!response.ok) {
      await response.body?.cancel().catch(() => {});
      return { ...base, httpStatus: response.status, reason: `HTTP ${response.status}` };
    }
    const body = await readBodyLimited(response, limits.maxSitemapBytes);
    const parsed = parseSitemap(body.text, pageUrl.toString(), body.truncated);
    return { ...base, status: "fetched", httpStatus: response.status, ...parsed };
  } catch (error) {
    return { ...base, reason: describeError(error).reason };
  }
}

export async function collectStatic(
  url: URL,
  deps: AuditDeps,
  limits: Limits,
  parent: AbortSignal,
): Promise<StaticPhase> {
  return withTimeout(
    "static",
    limits.staticFetchMs,
    async (signal) => {
      const [page, protocolProbe] = await Promise.all([
        fetchPage(url, deps, limits, signal),
        probeProtocol(url, deps, limits, signal),
      ]);
      if (!page.ok) return { page, protocolProbe, robots: null, sitemap: null };
      const origin = new URL(page.page.finalUrl);
      const robots = await fetchRobots(origin, new URL(page.page.finalUrl), deps, limits, signal);
      const sitemap = await fetchSitemap(
        origin,
        new URL(page.page.finalUrl),
        robots.info.sitemapsDeclared,
        deps,
        limits,
        signal,
      );
      return { page, protocolProbe, robots: robots.info, sitemap };
    },
    parent,
  );
}
