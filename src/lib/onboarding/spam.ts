import { isRecord, readString } from "@/lib/forms/payload";

const MIN_FILL_MS = 3000;

export function getSpamReason(payload: unknown) {
  if (!isRecord(payload)) {
    return null;
  }

  if (readString(payload, "website", 200)) {
    return "honeypot";
  }

  const elapsed = payload.elapsedMs;

  if (typeof elapsed !== "number" || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return "too-fast";
  }

  return null;
}
