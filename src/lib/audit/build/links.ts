import { safeFetch } from "@/lib/audit/net/safe-fetch";
import { withTimeout } from "@/lib/audit/net/timeout";
import { describeError } from "@/lib/audit/sections/run-section";
import type { AuditDeps } from "@/lib/audit/deps";
import type { Limits } from "@/lib/audit/types/common";
import type { LinkSample } from "@/lib/audit/types/technical";
import type { PageLink } from "@/lib/audit/types/viewport";

const CONCURRENCY = 4;

async function checkOne(
  link: PageLink,
  deps: AuditDeps,
  limits: Limits,
  signal: AbortSignal,
): Promise<LinkSample> {
  const base = { href: link.href, text: link.text, sameOrigin: link.sameOrigin };
  const options = {
    fetch: deps.fetch,
    policy: { resolveDns: deps.resolveDns, testException: deps.testException },
    maxRedirects: limits.maxRedirects,
    signal,
  };
  try {
    let method: "HEAD" | "GET" = "HEAD";
    let result = await safeFetch(new URL(link.href), { ...options, method });
    await result.response.body?.cancel().catch(() => {});
    if (result.response.status >= 400) {
      method = "GET";
      result = await safeFetch(new URL(link.href), { ...options, method });
      await result.response.body?.cancel().catch(() => {});
    }
    const status = result.response.status;
    const blockedStatus = status === 401 || status === 403 || status === 429 || status === 999;
    return {
      ...base,
      status,
      method,
      check: status < 400 ? "ok" : blockedStatus ? "unverified" : "broken",
      reason: blockedStatus ? "El destino restringe consultas automáticas." : null,
    };
  } catch (error) {
    return {
      ...base,
      status: null,
      method: null,
      check: "unverified",
      reason: describeError(error).reason,
    };
  }
}

export async function checkLinks(
  links: PageLink[],
  deps: AuditDeps,
  limits: Limits,
  parent: AbortSignal,
): Promise<LinkSample[]> {
  const sample = links.slice(0, limits.maxLinksSampled);
  const results: LinkSample[] = sample.map((link) => ({
    href: link.href,
    text: link.text,
    sameOrigin: link.sameOrigin,
    check: "unverified",
    status: null,
    method: null,
    reason: "No se llegó a verificar dentro del tiempo disponible.",
  }));
  try {
    await withTimeout(
      "links",
      limits.linkCheckMs,
      async (signal) => {
        let next = 0;
        const worker = async () => {
          while (next < sample.length) {
            const index = next;
            next += 1;
            results[index] = await checkOne(sample[index], deps, limits, signal);
          }
        };
        await Promise.all(Array.from({ length: CONCURRENCY }, worker));
      },
      parent,
    );
  } catch {
    return results;
  }
  return results;
}
