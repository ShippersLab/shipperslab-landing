export interface RobotsTxtInfo {
  url: string;
  status: "fetched" | "not_found" | "error" | "blocked_by_policy";
  httpStatus: number | null;
  reason: string | null;
  disallowsPage: boolean | null;
  matchedRule: string | null;
  sitemapsDeclared: string[];
}

export interface SitemapInfo {
  url: string | null;
  origin: "robots_txt" | "default_location" | "none";
  status: "fetched" | "not_found" | "error" | "not_checked";
  httpStatus: number | null;
  kind: "urlset" | "sitemapindex" | "unknown" | null;
  locCount: number | null;
  listsPage: boolean | null;
  reason: string | null;
}

export interface SeoData {
  scope: "observed_technical_indexability";
  indexingStatus: "not_confirmed";
  disclaimer: string;
  fetch: { finalUrl: string; status: number; xRobotsTag: string | null };
  indexability: {
    verdict: "no_blockers_observed" | "blockers_observed" | "unknown";
    blockers: string[];
    cautions: string[];
  };
  title: { value: string | null; length: number };
  metaDescription: { value: string | null; length: number };
  canonical: {
    href: string | null;
    resolved: string | null;
    selfReferencing: boolean | null;
    count: number;
  };
  robotsMeta: { raw: string | null; noindex: boolean; nofollow: boolean };
  headings: { h1Count: number; outline: Array<{ level: number; text: string }> };
  lang: string | null;
  hasViewportMeta: boolean;
  openGraph: { title: boolean; description: boolean; image: boolean };
  structuredDataBlocks: number;
  content: { visibleTextChars: number; wordCount: number; basis: string };
  links: { total: number; internal: number; external: number; notCrawlable: number };
  robotsTxt: RobotsTxtInfo;
  sitemap: SitemapInfo;
}
