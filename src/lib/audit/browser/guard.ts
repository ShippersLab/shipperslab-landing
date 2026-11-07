import { assertPublicHost, type HostPolicy } from "@/lib/audit/security/assert-public";
import { UrlRejectedError, assertAllowedUrl } from "@/lib/audit/security/url";
import type { FailedResource, PolicyBlockedRequest } from "@/lib/audit/types/viewport";

export interface GuardRequest {
  url(): string;
  method(): string;
  resourceType(): string;
  isNavigationRequest(): boolean;
  isMainFrame(): boolean;
  redirectChainLength(): number;
  abort(): Promise<void>;
  continue(): Promise<void>;
}

export interface GuardOptions {
  policy: HostPolicy;
  maxRequests: number;
  maxBytes: number;
  maxRecorded: number;
}

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const LOCAL_SCHEMES = new Set(["data:", "blob:", "about:"]);

export interface GuardDecision {
  allow: boolean;
  reasonCode: string | null;
}

export class RequestGuard {
  private readonly options: GuardOptions;
  private readonly hostChecks = new Map<string, Promise<string | null>>();
  private requestCount = 0;
  private bytes = 0;
  private navigationStarted = false;
  private navigationClosed = false;
  private blocked: PolicyBlockedRequest[] = [];
  private blockedCount = 0;
  private failed: FailedResource[] = [];
  private failedCount = 0;
  private budgetExceeded = false;

  constructor(options: GuardOptions) {
    this.options = options;
  }

  closeNavigation(): void {
    this.navigationClosed = true;
  }

  addBytes(amount: number): void {
    this.bytes += amount;
    if (this.bytes > this.options.maxBytes) this.budgetExceeded = true;
  }

  recordFailure(failure: FailedResource): void {
    this.failedCount += 1;
    if (this.failed.length < this.options.maxRecorded) this.failed.push(failure);
  }

  recordBlocked(entry: PolicyBlockedRequest): void {
    this.blockedCount += 1;
    if (this.blocked.length < this.options.maxRecorded) this.blocked.push(entry);
  }

  isPolicyBlocked(url: string): boolean {
    return this.blocked.some((entry) => entry.url === url);
  }

  snapshot() {
    return {
      requests: this.requestCount,
      transferredBytes: this.bytes,
      failedResources: this.failed,
      failedResourceCount: this.failedCount,
      policyBlocked: this.blocked,
      policyBlockedCount: this.blockedCount,
      budgetExceeded: this.budgetExceeded,
    };
  }

  private checkHost(url: URL): Promise<string | null> {
    const key = `${url.protocol}//${url.host}`;
    const cached = this.hostChecks.get(key);
    if (cached) return cached;
    const pending = (async () => {
      try {
        assertAllowedUrl(new URL(url.toString()), this.options.policy.testException);
        await assertPublicHost(url.hostname, this.options.policy);
        return null;
      } catch (error) {
        return error instanceof UrlRejectedError ? error.code : "host_check_failed";
      }
    })();
    this.hostChecks.set(key, pending);
    return pending;
  }

  async decide(request: GuardRequest): Promise<GuardDecision> {
    const method = request.method().toUpperCase();
    if (!SAFE_METHODS.has(method)) return { allow: false, reasonCode: "method_not_allowed" };

    let url: URL;
    try {
      url = new URL(request.url());
    } catch {
      return { allow: false, reasonCode: "invalid_url" };
    }
    if (LOCAL_SCHEMES.has(url.protocol)) return { allow: true, reasonCode: null };
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return { allow: false, reasonCode: "scheme_not_allowed" };
    }

    this.requestCount += 1;
    if (this.requestCount > this.options.maxRequests) {
      this.budgetExceeded = true;
      return { allow: false, reasonCode: "request_budget_exceeded" };
    }
    if (this.budgetExceeded) return { allow: false, reasonCode: "byte_budget_exceeded" };

    if (request.isNavigationRequest() && request.isMainFrame()) {
      if (this.navigationClosed) return { allow: false, reasonCode: "navigation_closed" };
      if (request.redirectChainLength() === 0) {
        if (this.navigationStarted) return { allow: false, reasonCode: "extra_navigation" };
        this.navigationStarted = true;
      }
    }

    const hostError = await this.checkHost(url);
    if (hostError) return { allow: false, reasonCode: hostError };
    return { allow: true, reasonCode: null };
  }

  async handle(request: GuardRequest): Promise<void> {
    let decision: GuardDecision;
    try {
      decision = await this.decide(request);
    } catch {
      decision = { allow: false, reasonCode: "guard_error" };
    }
    try {
      if (decision.allow) {
        await request.continue();
        return;
      }
      this.recordBlocked({
        url: request.url().slice(0, 300),
        resourceType: request.resourceType(),
        method: request.method(),
        reasonCode: decision.reasonCode ?? "blocked",
      });
      await request.abort();
    } catch {
      return;
    }
  }
}

export const GUARD_INIT_SCRIPT = `(() => {
  const blocked = function () { throw new DOMException('Blocked by audit policy', 'SecurityError'); };
  try { window.WebSocket = function () { blocked(); }; } catch (e) {}
  try { window.EventSource = function () { blocked(); }; } catch (e) {}
  try { window.WebTransport = function () { blocked(); }; } catch (e) {}
  try { HTMLFormElement.prototype.submit = function () {}; } catch (e) {}
  try { HTMLFormElement.prototype.requestSubmit = function () {}; } catch (e) {}
  try {
    window.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  } catch (e) {}
})();`;
