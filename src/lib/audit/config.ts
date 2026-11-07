import type { Limits } from "@/lib/audit/types/common";

export const AUDIT_SCHEMA_VERSION = "1.0.0";
export const AUDIT_ENGINE_NAME = "shipperslab-audit-engine";
export const AUDIT_ENGINE_VERSION = "0.1.0";
export const AUDIT_USER_AGENT = "ShippersLabAudit/0.1 (+https://shipperslab.tech)";

export const MOBILE_VIEWPORT = { width: 390, height: 844 } as const;
export const DESKTOP_VIEWPORT = { width: 1440, height: 900 } as const;

export const DEFAULT_LIMITS: Limits = {
  totalBudgetMs: 110_000,
  staticFetchMs: 20_000,
  browserMs: 55_000,
  pagespeedMs: 90_000,
  cruxMs: 15_000,
  linkCheckMs: 12_000,
  maxRedirects: 5,
  maxRequestsPerPage: 150,
  maxBytesPerPage: 12 * 1024 * 1024,
  maxHtmlBytes: 2 * 1024 * 1024,
  maxRobotsBytes: 256 * 1024,
  maxSitemapBytes: 1024 * 1024,
  maxLinksSampled: 20,
  maxVisibleTextChars: 20_000,
  maxDomNodes: 150,
  maxScreenshots: 4,
};

export const PAGESPEED_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
export const CRUX_ENDPOINT = "https://chromeuxreport.googleapis.com/v1/records:queryRecord";
