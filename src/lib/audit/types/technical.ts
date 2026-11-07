import type { RedirectHop } from "@/lib/audit/net/safe-fetch";
import type {
  FailedResource,
  JsError,
  PolicyBlockedRequest,
  ViewportName,
} from "@/lib/audit/types/viewport";

export interface ProtocolProbe {
  tested: string;
  reachable: boolean;
  status: number | null;
  finalUrl: string | null;
  endsOnHttps: boolean | null;
  reason: string | null;
}

export interface LinkSample {
  href: string;
  text: string;
  sameOrigin: boolean;
  check: "ok" | "broken" | "unverified";
  status: number | null;
  method: "HEAD" | "GET" | null;
  reason: string | null;
}

export interface TechnicalViewportData {
  viewport: ViewportName;
  finalUrl: string | null;
  httpStatus: number | null;
  jsErrors: JsError[];
  jsErrorCount: number;
  failedResources: FailedResource[];
  failedResourceCount: number;
  policyBlocked: PolicyBlockedRequest[];
  policyBlockedCount: number;
  requests: number;
  transferredBytes: number;
  budgetExceeded: boolean;
  navigationError: string | null;
}

export interface TechnicalData {
  requestedUrl: string;
  finalUrl: string | null;
  scheme: "http" | "https";
  finalScheme: "http" | "https" | null;
  status: number | null;
  contentType: string | null;
  redirects: RedirectHop[];
  redirectCount: number;
  responseTimeMs: number | null;
  protocolProbe: ProtocolProbe | null;
  viewports: TechnicalViewportData[];
  links: {
    sampleMethod: string;
    uniqueFound: number;
    sampled: LinkSample[];
  };
}
