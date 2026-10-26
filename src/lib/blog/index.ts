import { team } from "@/lib/site";

type BlogPostEntry = {
  slug: string;
  datePublished: string;
  authorId: string;
  published: boolean;
};

export const blogPosts = [
  {
    slug: "cuanto-cuesta-un-sistema-de-gestion-a-medida",
    datePublished: "2026-10-26",
    authorId: "juani",
    published: true,
  },
  {
    slug: "como-organizar-una-empresa-de-eventos",
    datePublished: "2026-10-23",
    authorId: "juani",
    published: true,
  },
  {
    slug: "como-saber-si-tu-negocio-necesita-pagina-web",
    datePublished: "2026-10-18",
    authorId: "juani",
    published: true,
  },
] as const satisfies readonly BlogPostEntry[];

export type BlogPostMeta = (typeof blogPosts)[number];

export type BlogSlug = BlogPostMeta["slug"];

export function isPreviewEnvironment() {
  return process.env.VERCEL_ENV !== "production";
}

export function isPostVisible(post: BlogPostMeta) {
  return post.published || isPreviewEnvironment();
}

export function getVisibleBlogPosts() {
  return blogPosts.filter(isPostVisible);
}

export function getPublishedBlogPosts() {
  return blogPosts.filter((post) => post.published);
}

export function isBlogSlug(value: string): value is BlogSlug {
  return blogPosts.some((post) => post.slug === value);
}

export function getBlogPost(slug: BlogSlug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getBlogAuthor(slug: BlogSlug) {
  const post = getBlogPost(slug);
  return team.find((member) => member.id === post?.authorId);
}

const WORDS_PER_MINUTE = 200;
const NON_READING_KEYS = new Set([
  "metaTitle",
  "metaDescription",
  "excerpt",
  "href",
  "related",
  "ctaTitle",
  "ctaDescription",
  "ctaButton",
]);

function collectText(value: unknown, key?: string): string[] {
  if (key && NON_READING_KEYS.has(key)) {
    return [];
  }
  if (typeof value === "string") {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectText(item));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([childKey, child]) => collectText(child, childKey));
  }
  return [];
}

export function getWordCount(content: unknown) {
  return collectText(content).join(" ").split(/\s+/).filter(Boolean).length;
}

export function getReadingMinutes(content: unknown) {
  return Math.max(1, Math.ceil(getWordCount(content) / WORDS_PER_MINUTE));
}

export function slugifyHeading(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BLOG_HREF = /^\/blog\/([^/]+)$/;

export function isPublishedBlogHref(href: string) {
  const slug = BLOG_HREF.exec(href)?.[1];
  if (!slug || !isBlogSlug(slug)) return true;
  return getBlogPost(slug)?.published === true;
}

export function omitUnpublishedBlogLinks(text: string) {
  if (!text.includes("](/blog/")) return text;

  const sentences = text.split(/(?<=[.!?])\s+/);
  let changed = false;
  const kept = sentences.filter((sentence) => {
    const hrefs = [...sentence.matchAll(/\((\/blog\/[^)\s]+)\)/g)].map((match) => match[1]);
    const drop = hrefs.some((href) => !isPublishedBlogHref(href));
    if (drop) changed = true;
    return !drop;
  });

  if (!changed) return text;
  return kept
    .join(" ")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
