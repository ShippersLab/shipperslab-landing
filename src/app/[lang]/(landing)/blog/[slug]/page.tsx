import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPost } from "@/components/sections/blog/post";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogPostContent } from "@/content/blog/content";
import { locales } from "@/i18n/config";
import { resolveLocale } from "@/i18n/params";
import { getBlogPost, getVisibleBlogPosts, isBlogSlug, isPostVisible } from "@/lib/blog";
import { BLOG_OG_HEIGHT, BLOG_OG_WIDTH, blogPostOpenGraphPath } from "@/lib/seo/blog/og-path";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildBlogPostStructuredData } from "@/lib/seo/structured-data";
import { site } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getVisibleBlogPosts().map((post) => ({ lang, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = await resolveLocale(params);
  const meta = isBlogSlug(slug) ? getBlogPost(slug) : undefined;
  if (!isBlogSlug(slug) || !meta || !isPostVisible(meta)) {
    return {};
  }
  const post = getBlogPostContent(slug, lang);
  const base = buildPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
    lang,
  });
  const images = meta.published
    ? [
        {
          url: `${site.url}${blogPostOpenGraphPath(slug, lang)}`,
          width: BLOG_OG_WIDTH,
          height: BLOG_OG_HEIGHT,
          alt: post.title,
          type: "image/png",
        },
      ]
    : undefined;

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      ...(images ? { images } : {}),
    },
    twitter: {
      ...base.twitter,
      ...(images ? { images } : {}),
    },
    ...(meta.published ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const lang = await resolveLocale(params);
  const meta = isBlogSlug(slug) ? getBlogPost(slug) : undefined;
  if (!isBlogSlug(slug) || !meta || !isPostVisible(meta)) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildBlogPostStructuredData(slug, lang)} />
      <BlogPost slug={slug} post={getBlogPostContent(slug, lang)} />
    </>
  );
}
