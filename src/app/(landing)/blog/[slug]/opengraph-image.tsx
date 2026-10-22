import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getMessages } from "@/i18n/get-messages";
import { getBlogPost, isBlogSlug } from "@/lib/blog";
import { BlogOgCard, blogOgSize, loadBlogOgAssets } from "@/lib/seo/blog-og";

export const alt = "ShippersLab";
export const size = blogOgSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isBlogSlug(slug)) {
    notFound();
  }

  const post = getBlogPost(slug);

  if (!post?.published) {
    notFound();
  }

  const title = getMessages("es").blog.posts[slug].title;

  const { fonts, logoSrc, backgroundSrc } = await loadBlogOgAssets();

  return new ImageResponse(
    <BlogOgCard title={title} logoSrc={logoSrc} backgroundSrc={backgroundSrc} />,
    { ...size, fonts },
  );
}
