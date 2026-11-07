import { decodeEntities } from "@/lib/audit/static/html-lite";

export interface SitemapParse {
  kind: "urlset" | "sitemapindex" | "unknown";
  locCount: number;
  listsPage: boolean | null;
}

function normalize(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return url.replace(/\/$/, "");
  }
}

export function parseSitemap(xml: string, pageUrl: string, truncated: boolean): SitemapParse {
  const kind = /<urlset\b/i.test(xml)
    ? "urlset"
    : /<sitemapindex\b/i.test(xml)
      ? "sitemapindex"
      : "unknown";
  const locs: string[] = [];
  const pattern = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  let match = pattern.exec(xml);
  while (match !== null && locs.length < 50_000) {
    locs.push(normalize(decodeEntities(match[1])));
    match = pattern.exec(xml);
  }
  const target = normalize(pageUrl);
  const found = locs.includes(target);
  const listsPage = kind === "urlset" ? (found ? true : truncated ? null : false) : null;
  return { kind, locCount: locs.length, listsPage };
}
