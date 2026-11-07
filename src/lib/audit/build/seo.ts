import type { BrowserPhase } from "@/lib/audit/browser/session";
import type { SectionOutcome } from "@/lib/audit/sections/run-section";
import {
  collapseWhitespace,
  countJsonLd,
  findHeadings,
  findTags,
  findTitle,
  stripToText,
} from "@/lib/audit/static/html-lite";
import type { StaticPhase } from "@/lib/audit/static/collect";
import type { SeoData } from "@/lib/audit/types/seo";

export const SEO_SOURCES = [
  "HTML servido por el fetch propio (lo que ve un rastreador sin ejecutar JavaScript)",
  "robots.txt y sitemap del mismo origen",
];

const DISCLAIMER =
  "Indexabilidad técnica observada en este momento. No confirma que Google haya indexado la página: eso requiere Search Console autorizado. robots.txt controla el rastreo, no garantiza exclusión del índice, y el sitemap ayuda a descubrir URLs pero no garantiza indexarlas.";

function resolveHref(href: string | null, base: string): string | null {
  if (!href) return null;
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

function normalizeForCompare(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return url;
  }
}

export function buildSeo(
  staticPhase: StaticPhase,
  browser: BrowserPhase | { error: { reasonCode: string; reason: string } },
): SectionOutcome<SeoData> {
  const result = staticPhase.page;
  if (!result.ok) {
    return { status: "error", data: null, reasonCode: result.reasonCode, reason: result.reason };
  }
  const page = result.page;
  if (page.blockedBy) {
    return {
      status: "blocked",
      data: null,
      reasonCode: "blocked_by_site",
      reason:
        "El sitio mostró un control antibot o captcha. Queda como no evaluable y no se intentó sortearlo.",
    };
  }
  const html = page.html;
  const notes: string[] = [];
  if (page.truncated)
    notes.push("El HTML se truncó al límite de bytes; algunos datos pueden faltar.");
  if (page.contentType && !/html/i.test(page.contentType)) {
    notes.push(`El contenido devuelto es ${page.contentType}, no HTML.`);
  }

  const head = findTags(html, ["meta", "link", "html"]);
  const metas = head.filter((tag) => tag.name === "meta");
  const metaByName = (name: string) =>
    metas.find((tag) => tag.attrs.name?.toLowerCase() === name)?.attrs.content ?? null;
  const metaByProperty = (property: string) =>
    metas.find((tag) => tag.attrs.property?.toLowerCase() === property)?.attrs.content ?? null;
  const canonicals = head.filter(
    (tag) => tag.name === "link" && tag.attrs.rel?.toLowerCase().split(/\s+/).includes("canonical"),
  );
  const canonicalHref = canonicals[0]?.attrs.href ?? null;
  const canonicalResolved = resolveHref(canonicalHref, page.finalUrl);
  const robotsMetaRaw =
    [metaByName("robots"), metaByName("googlebot")].filter(Boolean).join(", ") || null;
  const robotsDirectives = `${robotsMetaRaw ?? ""} ${page.xRobotsTag ?? ""}`.toLowerCase();
  const noindex = /\bnoindex\b|\bnone\b/.test(robotsDirectives);
  const nofollow = /\bnofollow\b|\bnone\b/.test(robotsDirectives);

  const title = findTitle(html);
  const description = metaByName("description");
  const headings = findHeadings(html);
  const text = stripToText(html);
  const anchors = findTags(html, ["a"]);
  const finalOrigin = new URL(page.finalUrl).origin;
  let internal = 0;
  let external = 0;
  let notCrawlable = 0;
  for (const anchor of anchors) {
    const href = anchor.attrs.href;
    if (!href || href.startsWith("#") || /^\s*javascript:/i.test(href)) {
      notCrawlable += 1;
      continue;
    }
    const resolved = resolveHref(href, page.finalUrl);
    if (!resolved || !/^https?:/i.test(resolved)) continue;
    if (new URL(resolved).origin === finalOrigin) internal += 1;
    else external += 1;
  }

  const blockers: string[] = [];
  const cautions: string[] = [];
  if (page.status >= 400) blockers.push(`La página respondió HTTP ${page.status}.`);
  if (noindex) blockers.push("Se observó una directiva noindex (meta robots o X-Robots-Tag).");
  if (staticPhase.robots?.disallowsPage) {
    blockers.push(`robots.txt bloquea el rastreo de esta URL (${staticPhase.robots.matchedRule}).`);
  }
  if (
    canonicalResolved &&
    normalizeForCompare(canonicalResolved) !== normalizeForCompare(page.finalUrl)
  ) {
    cautions.push("El canonical apunta a otra URL.");
  }
  if (canonicals.length > 1) cautions.push("Hay más de un canonical declarado.");
  if (!canonicalHref) cautions.push("No hay canonical declarado.");
  if (staticPhase.robots === null || staticPhase.robots.status === "error") {
    cautions.push("No se pudo leer robots.txt; el rastreo no se pudo comprobar.");
  }
  if (text.length < 200 && "configured" in browser && browser.configured) {
    cautions.push(
      "El HTML inicial tiene muy poco texto; el contenido podría depender de JavaScript.",
    );
  }

  const robotsUnknown = staticPhase.robots === null || staticPhase.robots.status === "error";
  const verdict: SeoData["indexability"]["verdict"] =
    blockers.length > 0 ? "blockers_observed" : robotsUnknown ? "unknown" : "no_blockers_observed";

  const data: SeoData = {
    scope: "observed_technical_indexability",
    indexingStatus: "not_confirmed",
    disclaimer: DISCLAIMER,
    fetch: { finalUrl: page.finalUrl, status: page.status, xRobotsTag: page.xRobotsTag },
    indexability: { verdict, blockers, cautions },
    title: { value: title, length: title?.length ?? 0 },
    metaDescription: { value: description, length: description?.length ?? 0 },
    canonical: {
      href: canonicalHref,
      resolved: canonicalResolved,
      selfReferencing: canonicalResolved
        ? normalizeForCompare(canonicalResolved) === normalizeForCompare(page.finalUrl)
        : null,
      count: canonicals.length,
    },
    robotsMeta: { raw: robotsMetaRaw, noindex, nofollow },
    headings: {
      h1Count: headings.filter((heading) => heading.level === 1).length,
      outline: headings.slice(0, 30),
    },
    lang: head.find((tag) => tag.name === "html")?.attrs.lang ?? null,
    hasViewportMeta: metaByName("viewport") !== null,
    openGraph: {
      title: metaByProperty("og:title") !== null,
      description: metaByProperty("og:description") !== null,
      image: metaByProperty("og:image") !== null,
    },
    structuredDataBlocks: countJsonLd(html),
    content: {
      visibleTextChars: text.length,
      wordCount: collapseWhitespace(text) === "" ? 0 : text.split(" ").length,
      basis: "HTML inicial sin ejecutar JavaScript",
    },
    links: { total: anchors.length, internal, external, notCrawlable },
    robotsTxt: staticPhase.robots ?? {
      url: new URL("/robots.txt", page.finalUrl).toString(),
      status: "error",
      httpStatus: null,
      reason: "No se consultó.",
      disallowsPage: null,
      matchedRule: null,
      sitemapsDeclared: [],
    },
    sitemap: staticPhase.sitemap ?? {
      url: null,
      origin: "none",
      status: "not_checked",
      httpStatus: null,
      kind: null,
      locCount: null,
      listsPage: null,
      reason: "No se consultó.",
    },
  };
  return { status: "ok", data, notes };
}
