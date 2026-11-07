export type SectionStatus = "ok" | "unavailable" | "blocked" | "error";

export type RejectionCode =
  | "invalid_url"
  | "unsupported_scheme"
  | "credentials_in_url"
  | "port_not_allowed"
  | "private_address"
  | "blocked_hostname"
  | "dns_failed"
  | "dns_no_addresses"
  | "too_many_redirects"
  | "invalid_redirect"
  | "response_too_large";

export interface Section<T> {
  status: SectionStatus;
  reason: string | null;
  reasonCode: string | null;
  source: string[];
  durationMs: number;
  notes: string[];
  data: T | null;
}

export type Measured<T> =
  | { status: "ok"; value: T }
  | { status: "unavailable"; reason: string; reasonCode: string };

export interface Limits {
  totalBudgetMs: number;
  staticFetchMs: number;
  browserMs: number;
  pagespeedMs: number;
  cruxMs: number;
  linkCheckMs: number;
  maxRedirects: number;
  maxRequestsPerPage: number;
  maxBytesPerPage: number;
  maxHtmlBytes: number;
  maxRobotsBytes: number;
  maxSitemapBytes: number;
  maxLinksSampled: number;
  maxVisibleTextChars: number;
  maxDomNodes: number;
  maxScreenshots: number;
}

export interface AuditFile {
  fileName: string;
  mimeType: string;
  data: Uint8Array;
}
