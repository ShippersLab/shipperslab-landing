import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { BlogPost } from "@/components/sections/blog/post";
import { getMessages } from "@/i18n/get-messages";
import { getBlogPost, getVisibleBlogPosts, isBlogSlug, isPostVisible } from "@/lib/blog";
import { BLOG_OG_HEIGHT, BLOG_OG_WIDTH, blogPostOpenGraphPath } from "@/lib/seo/blog-og-path";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { buildBlogPostStructuredData } from "@/lib/seo/structured-data";
import { site } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = isBlogSlug(slug) ? getBlogPost(slug) : undefined;
  if (!isBlogSlug(slug) || !meta || !isPostVisible(meta)) {
    return {};
  }
  const post = getMessages("es").blog.posts[slug];
  const base = buildPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
  });
  const images = meta.published
    ? [
        {
          url: `${site.url}${blogPostOpenGraphPath(slug)}`,
          width: BLOG_OG_WIDTH,
          height: BLOG_OG_HEIGHT,
          alt: post.title,
          type: "image/png",
        },
      ]
    : undefined;

  return {
    ...base,
    title: { absolute: post.metaTitle },
    openGraph: {
      ...base.openGraph,
      type: "article",
      title: post.metaTitle,
      ...(images ? { images } : {}),
    },
    twitter: {
      ...base.twitter,
      title: post.metaTitle,
      ...(images ? { images } : {}),
    },
    ...(meta.published ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const meta = isBlogSlug(slug) ? getBlogPost(slug) : undefined;
  if (!isBlogSlug(slug) || !meta || !isPostVisible(meta)) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildBlogPostStructuredData(slug)} />
      <BlogPost slug={slug} />
    </>
  );
}
