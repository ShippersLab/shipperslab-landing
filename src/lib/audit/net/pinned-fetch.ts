import { lookup } from "node:dns";
import { Agent, fetch as undiciFetch } from "undici";
import type { FetchLike } from "@/lib/audit/net/safe-fetch";
import { isPublicAddress } from "@/lib/audit/security/ip";

type LookupCallback = (
  error: NodeJS.ErrnoException | null,
  address: string | Array<{ address: string; family: number }>,
  family?: number,
) => void;

function guardedLookup(
  hostname: string,
  options: { all?: boolean; family?: number },
  callback: LookupCallback,
): void {
  lookup(hostname, { all: true, family: options.family ?? 0, verbatim: true }, (error, results) => {
    if (error) return callback(error, "");
    if (results.length === 0 || !results.every((entry) => isPublicAddress(entry.address))) {
      const rejection: NodeJS.ErrnoException = new Error("Dirección no pública bloqueada");
      rejection.code = "EAUDITBLOCKED";
      return callback(rejection, "");
    }
    if (options.all) return callback(null, results);
    return callback(null, results[0].address, results[0].family);
  });
}

export function createPinnedFetch(): FetchLike {
  const agent = new Agent({ connect: { lookup: guardedLookup as never } });
  return (input, init) =>
    undiciFetch(input, { ...(init as object), dispatcher: agent }) as unknown as Promise<Response>;
}
