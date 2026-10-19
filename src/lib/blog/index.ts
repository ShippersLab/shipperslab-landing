import { team } from "@/lib/site";

export const blogPosts = [
  {
    slug: "como-saber-si-tu-negocio-necesita-pagina-web",
    datePublished: "2026-10-18",
    authorId: "juani",
  },
] as const;

export type BlogSlug = (typeof blogPosts)[number]["slug"];

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
