import { CRUX_ENDPOINT } from "@/lib/audit/config";
import { readBodyLimited } from "@/lib/audit/net/read-body";
import { withTimeout } from "@/lib/audit/net/timeout";
import { describeError } from "@/lib/audit/sections/run-section";
import type { AuditDeps } from "@/lib/audit/deps";
import type { Measured } from "@/lib/audit/types/common";
import type { FieldMetric, FieldResult, FormFactor } from "@/lib/audit/types/performance";

interface CruxMetric {
  histogram?: Array<{ density?: number }>;
  percentiles?: { p75?: number | string };
}

interface CruxRecord {
  key?: { url?: string; origin?: string };
  metrics?: Record<string, CruxMetric | undefined>;
  collectionPeriod?: {
    firstDate?: { year: number; month: number; day: number };
    lastDate?: { year: number; month: number; day: number };
  };
}

type QueryOutcome =
  | { kind: "found"; record: CruxRecord }
  | { kind: "not_found" }
  | { kind: "error"; reason: string };

const METRICS = [
  { field: "lcp", api: "largest_contentful_paint", unit: "ms" },
  { field: "inp", api: "interaction_to_next_paint", unit: "ms" },
  { field: "cls", api: "cumulative_layout_shift", unit: "unitless" },
] as const;

function formatDate(date?: { year: number; month: number; day: number }): string | null {
  if (!date) return null;
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.year}-${pad(date.month)}-${pad(date.day)}`;
}

async function query(
  target: { url: string } | { origin: string },
  formFactor: FormFactor,
  deps: AuditDeps,
  timeoutMs: number,
  parent: AbortSignal,
): Promise<QueryOutcome> {
  try {
    return await withTimeout(
      "crux",
      timeoutMs,
      async (signal) => {
        const response = await deps.fetch(CRUX_ENDPOINT, {
          method: "POST",
          signal,
          headers: {
            "content-type": "application/json",
            "x-goog-api-key": deps.env.pagespeedApiKey ?? "",
          },
          body: JSON.stringify({ ...target, formFactor: formFactor.toUpperCase() }),
        });
        const body = await readBodyLimited(response, 512 * 1024);
        if (response.status === 404) return { kind: "not_found" as const };
        if (response.status !== 200) {
          return { kind: "error" as const, reason: `CrUX respondió ${response.status}` };
        }
        const parsed = JSON.parse(body.text) as { record?: CruxRecord };
        return parsed.record
          ? { kind: "found" as const, record: parsed.record }
          : { kind: "not_found" as const };
      },
      parent,
    );
  } catch (error) {
    return { kind: "error", reason: describeError(error).reason };
  }
}

function extract(
  record: CruxRecord | null,
  api: string,
  unit: "ms" | "unitless",
  scope: "url" | "origin",
  key: string,
): FieldMetric | null {
  const metric = record?.metrics?.[api];
  const raw = metric?.percentiles?.p75;
  const value = typeof raw === "string" ? Number.parseFloat(raw) : raw;
  if (!record || value === undefined || !Number.isFinite(value)) return null;
  const densities = (metric?.histogram ?? []).map((bin) => bin.density ?? 0);
  const first = formatDate(record.collectionPeriod?.firstDate);
  const last = formatDate(record.collectionPeriod?.lastDate);
  return {
    value: value as number,
    unit,
    percentile: "p75",
    distribution:
      densities.length === 3
        ? { good: densities[0], needsImprovement: densities[1], poor: densities[2] }
        : null,
    scope,
    queriedKey: key,
    collectionPeriod: first && last ? { firstDate: first, lastDate: last } : null,
    source: "CrUX API",
  };
}

export async function runCrux(
  pageUrl: string,
  formFactor: FormFactor,
  deps: AuditDeps,
  timeoutMs: number,
  parent: AbortSignal,
): Promise<Measured<FieldResult>> {
  if (!deps.env.pagespeedApiKey) {
    return {
      status: "unavailable",
      reasonCode: "missing_api_key",
      reason: "Falta PAGESPEED_API_KEY. No se consultó CrUX.",
    };
  }
  const origin = new URL(pageUrl).origin;
  const urlOutcome = await query({ url: pageUrl }, formFactor, deps, timeoutMs, parent);
  const urlRecord = urlOutcome.kind === "found" ? urlOutcome.record : null;
  const missing = (api: string) => extract(urlRecord, api, "ms", "url", pageUrl) === null;
  const needOrigin = urlOutcome.kind !== "found" || METRICS.some((m) => missing(m.api));

  let originOutcome: QueryOutcome | null = null;
  if (needOrigin) originOutcome = await query({ origin }, formFactor, deps, timeoutMs, parent);
  const originRecord = originOutcome?.kind === "found" ? originOutcome.record : null;

  if (urlOutcome.kind === "error" && (!originOutcome || originOutcome.kind === "error")) {
    return { status: "unavailable", reasonCode: "crux_error", reason: urlOutcome.reason };
  }

  const measured = (api: string, unit: "ms" | "unitless"): Measured<FieldMetric> => {
    const fromUrl = extract(urlRecord, api, unit, "url", pageUrl);
    if (fromUrl) return { status: "ok", value: fromUrl };
    const fromOrigin = extract(originRecord, api, unit, "origin", origin);
    if (fromOrigin) return { status: "ok", value: fromOrigin };
    return {
      status: "unavailable",
      reasonCode: "no_field_data",
      reason: "CrUX no tiene datos suficientes de esta métrica para la URL ni para el origen.",
    };
  };

  const result: FieldResult = {
    formFactor,
    lcp: measured("largest_contentful_paint", "ms"),
    inp: measured("interaction_to_next_paint", "ms"),
    cls: measured("cumulative_layout_shift", "unitless"),
    urlRecord: urlOutcome.kind === "found" ? "found" : urlOutcome.kind,
    originRecord: originOutcome
      ? originOutcome.kind === "found"
        ? "found"
        : originOutcome.kind
      : "not_queried",
  };
  const anyData = [result.lcp, result.inp, result.cls].some((item) => item.status === "ok");
  if (!anyData) {
    return {
      status: "unavailable",
      reasonCode: "no_field_data",
      reason: "CrUX no tiene datos de campo suficientes para esta URL ni para su origen.",
    };
  }
  return { status: "ok", value: result };
}
