import { UrlRejectedError } from "@/lib/audit/security/url";

export interface ReadBodyResult {
  text: string;
  bytes: number;
  truncated: boolean;
}

export async function readBodyLimited(
  response: Response,
  maxBytes: number,
): Promise<ReadBodyResult> {
  const body = response.body;
  if (!body) return { text: "", bytes: 0, truncated: false };
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  let truncated = false;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (total + value.byteLength > maxBytes) {
        const keep = maxBytes - total;
        if (keep > 0) chunks.push(value.subarray(0, keep));
        total = maxBytes;
        truncated = true;
        break;
      }
      chunks.push(value);
      total += value.byteLength;
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return {
    text: new TextDecoder("utf-8", { fatal: false }).decode(merged),
    bytes: total,
    truncated,
  };
}

export function assertDeclaredSizeWithin(response: Response, maxBytes: number): void {
  const declared = Number.parseInt(response.headers.get("content-length") ?? "", 10);
  if (Number.isFinite(declared) && declared > maxBytes * 4) {
    throw new UrlRejectedError("response_too_large", "La respuesta supera el límite de tamaño.");
  }
}
