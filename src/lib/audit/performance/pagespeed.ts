import { PAGESPEED_ENDPOINT } from "@/lib/audit/config";
import { readBodyLimited } from "@/lib/audit/net/read-body";
import { withTimeout } from "@/lib/audit/net/timeout";
import { describeError } from "@/lib/audit/sections/run-section";
import type { AuditDeps } from "@/lib/audit/deps";
import type { Measured } from "@/lib/audit/types/common";
import type { LabMetric, LabResult, Strategy } from "@/lib/audit/types/performance";

interface LighthouseAudit {
  numericValue?: number;
}

interface PsiResponse {
  lighthouseResult?: {
    lighthouseVersion?: string;
    fetchTime?: string;
    finalDisplayedUrl?: string;
    finalUrl?: string;
    runWarnings?: unknown[];
    runtimeError?: { code?: string; message?: string };
    audits?: Record<string, LighthouseAudit | undefined>;
  };
  error?: { code?: number; message?: string; status?: string };
}

const LAB_SOURCE = "PageSpeed Insights / Lighthouse (laboratorio)" as const;

function metric(audit: LighthouseAudit | undefined, unit: "ms" | "unitless"): LabMetric | null {
  if (!audit || typeof audit.numericValue !== "number" || !Number.isFinite(audit.numericValue)) {
    return null;
  }
  return { value: audit.numericValue, unit, source: LAB_SOURCE };
}

export async function runPageSpeed(
  url: string,
  strategy: Strategy,
  deps: AuditDeps,
  timeoutMs: number,
  parent: AbortSignal,
): Promise<Measured<LabResult>> {
  const apiKey = deps.env.pagespeedApiKey;
  if (!apiKey) {
    return {
      status: "unavailable",
      reasonCode: "missing_api_key",
      reason: "Falta PAGESPEED_API_KEY. No se midió con PageSpeed Insights.",
    };
  }
  try {
    const endpoint = new URL(PAGESPEED_ENDPOINT);
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("strategy", strategy);
    endpoint.searchParams.set("category", "performance");
    const { status, json } = await withTimeout(
      `pagespeed-${strategy}`,
      timeoutMs,
      async (signal) => {
        const response = await deps.fetch(endpoint.toString(), {
          signal,
          headers: { "x-goog-api-key": apiKey, accept: "application/json" },
        });
        const body = await readBodyLimited(response, 4 * 1024 * 1024);
        return { status: response.status, json: JSON.parse(body.text) as PsiResponse };
      },
      parent,
    );
    if (status !== 200 || json.error) {
      return {
        status: "unavailable",
        reasonCode: status === 429 ? "quota_exceeded" : "pagespeed_http_error",
        reason: `PageSpeed Insights respondió ${status}${json.error?.message ? `: ${json.error.message.slice(0, 160)}` : ""}.`,
      };
    }
    const lighthouse = json.lighthouseResult;
    if (!lighthouse || lighthouse.runtimeError) {
      return {
        status: "unavailable",
        reasonCode: "lighthouse_runtime_error",
        reason: `Lighthouse no pudo medir la página${lighthouse?.runtimeError?.code ? ` (${lighthouse.runtimeError.code})` : ""}.`,
      };
    }
    const lcp = metric(lighthouse.audits?.["largest-contentful-paint"], "ms");
    const cls = metric(lighthouse.audits?.["cumulative-layout-shift"], "unitless");
    const tbt = metric(lighthouse.audits?.["total-blocking-time"], "ms");
    if (!lcp || !cls || !tbt) {
      return {
        status: "unavailable",
        reasonCode: "metrics_missing",
        reason: "Lighthouse no devolvió LCP, CLS y TBT completos.",
      };
    }
    return {
      status: "ok",
      value: {
        strategy,
        lcp,
        cls,
        tbt,
        lighthouseVersion: lighthouse.lighthouseVersion ?? null,
        fetchTime: lighthouse.fetchTime ?? null,
        finalUrl: lighthouse.finalDisplayedUrl ?? lighthouse.finalUrl ?? null,
        warnings: (lighthouse.runWarnings ?? [])
          .map((item) => String(item).slice(0, 200))
          .slice(0, 5),
        note: "TBT es Total Blocking Time de laboratorio. No es INP y no mide interacciones reales.",
      },
    };
  } catch (error) {
    const { reasonCode, reason } = describeError(error);
    return { status: "unavailable", reasonCode, reason };
  }
}
