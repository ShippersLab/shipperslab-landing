import { AUDIT_USER_AGENT } from "@/lib/audit/config";
import { assertPublicUrl, type HostPolicy } from "@/lib/audit/security/assert-public";
import { UrlRejectedError } from "@/lib/audit/security/url";

export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

export interface RedirectHop {
  from: string;
  to: string;
  status: number;
}

export interface SafeFetchOptions {
  fetch: FetchLike;
  policy: HostPolicy;
  maxRedirects: number;
  signal?: AbortSignal;
  method?: "GET" | "HEAD";
  headers?: Record<string, string>;
}

export interface SafeFetchResult {
  response: Response;
  finalUrl: URL;
  hops: RedirectHop[];
}

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

export async function safeFetch(
  startUrl: URL,
  options: SafeFetchOptions,
): Promise<SafeFetchResult> {
  const hops: RedirectHop[] = [];
  let current = startUrl;
  for (let attempt = 0; attempt <= options.maxRedirects; attempt += 1) {
    await assertPublicUrl(current, options.policy);
    const response = await options.fetch(current.toString(), {
      method: options.method ?? "GET",
      redirect: "manual",
      signal: options.signal,
      headers: {
        "user-agent": AUDIT_USER_AGENT,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.5",
        ...options.headers,
      },
    });
    const location = response.headers.get("location");
    if (!REDIRECT_STATUSES.has(response.status) || location === null) {
      return { response, finalUrl: current, hops };
    }
    await response.body?.cancel().catch(() => {});
    if (attempt === options.maxRedirects) break;
    let next: URL;
    try {
      next = new URL(location, current);
    } catch {
      throw new UrlRejectedError("invalid_redirect", "La redirección apunta a una URL inválida.");
    }
    hops.push({ from: current.toString(), to: next.toString(), status: response.status });
    current = next;
  }
  throw new UrlRejectedError("too_many_redirects", "Demasiadas redirecciones.");
}
