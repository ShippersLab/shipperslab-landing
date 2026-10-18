import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { BlogPost } from "@/components/sections/blog/post";
import { getMessages } from "@/i18n/get-messages";
import { blogPosts, isBlogSlug } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { buildBlogPostStructuredData } from "@/lib/seo/structured-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogSlug(slug)) {
    return {};
  }
  const post = getMessages("es").blog.posts[slug];
  const base = buildPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
  });

  return {
    ...base,
    title: { absolute: post.metaTitle },
    openGraph: { ...base.openGraph, type: "article", title: post.metaTitle },
    twitter: { ...base.twitter, title: post.metaTitle },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildBlogPostStructuredData(slug)} />
      <BlogPost slug={slug} />
    </>
  );
}
