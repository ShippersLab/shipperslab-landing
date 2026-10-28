import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getBlogPostContent } from "@/content/blog/content";
import { resolveLocale } from "@/i18n/params";
import { getBlogPost, isBlogSlug } from "@/lib/blog";
import { BlogOgCard, blogOgSize, loadBlogOgAssets } from "@/lib/seo/blog/og";

export const alt = "ShippersLab";
export const size = blogOgSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const lang = await resolveLocale(params);

  if (!isBlogSlug(slug)) {
    notFound();
  }

  const post = getBlogPost(slug);

  if (!post?.published) {
    notFound();
  }

  const title = getBlogPostContent(slug, lang).title;

  const { fonts, logoSrc, backgroundSrc } = await loadBlogOgAssets();

  return new ImageResponse(
    <BlogOgCard title={title} logoSrc={logoSrc} backgroundSrc={backgroundSrc} />,
    { ...size, fonts },
  );
}
