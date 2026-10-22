export const BLOG_OG_WIDTH = 1200;
export const BLOG_OG_HEIGHT = 630;

const BLOG_OG_ROUTE_SUFFIX = "1ofxfa";

export function blogPostOpenGraphPath(slug: string) {
  return `/blog/${slug}/opengraph-image-${BLOG_OG_ROUTE_SUFFIX}`;
}
