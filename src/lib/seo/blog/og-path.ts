import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

export const BLOG_OG_WIDTH = 1200;
export const BLOG_OG_HEIGHT = 630;

const BLOG_OG_ROUTE_SUFFIX = "1pb291";

export function blogPostOpenGraphPath(slug: string, lang: Locale) {
  return localizePath(`/blog/${slug}/opengraph-image-${BLOG_OG_ROUTE_SUFFIX}`, lang);
}
