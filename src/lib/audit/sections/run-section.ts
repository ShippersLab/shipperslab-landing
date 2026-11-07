import { isTimeoutError } from "@/lib/audit/net/timeout";
import { UrlRejectedError } from "@/lib/audit/security/url";
import type { Section, SectionStatus } from "@/lib/audit/types/common";

export interface SectionOutcome<T> {
  status: SectionStatus;
  data: T | null;
  reason?: string;
  reasonCode?: string;
  notes?: string[];
}

export function sanitizeMessage(message: string): string {
  return message
    .replace(/(key|token|apikey|api_key)=[^&\s"']+/gi, "$1=[redacted]")
    .replace(/wss?:\/\/[^\s"']+/gi, "[browser-endpoint]")
    .slice(0, 300);
}

export function describeError(error: unknown): { reasonCode: string; reason: string } {
  if (isTimeoutError(error)) {
    return { reasonCode: "timeout", reason: "La sección superó su tiempo máximo." };
  }
  if (error instanceof UrlRejectedError) {
    return { reasonCode: error.code, reason: error.message };
  }
  const message = error instanceof Error ? error.message : String(error);
  return { reasonCode: "unexpected_error", reason: sanitizeMessage(message) };
}

export function buildSection<T>(
  outcome: SectionOutcome<T>,
  source: string[],
  durationMs: number,
): Section<T> {
  return {
    status: outcome.status,
    reason: outcome.reason ?? null,
    reasonCode: outcome.reasonCode ?? null,
    source,
    durationMs,
    notes: outcome.notes ?? [],
    data: outcome.data,
  };
}

export function unavailableSection<T>(
  reasonCode: string,
  reason: string,
  source: string[] = [],
  status: SectionStatus = "unavailable",
): Section<T> {
  return buildSection<T>({ status, data: null, reason, reasonCode }, source, 0);
}

export async function runSection<T>(
  source: string[],
  now: () => number,
  work: () => Promise<SectionOutcome<T>>,
): Promise<Section<T>> {
  const startedAt = now();
  try {
    const outcome = await work();
    return buildSection(outcome, source, now() - startedAt);
  } catch (error) {
    const { reasonCode, reason } = describeError(error);
    return buildSection<T>(
      { status: "error", data: null, reason, reasonCode },
      source,
      now() - startedAt,
    );
  }
}
