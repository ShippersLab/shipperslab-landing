import type { Metadata } from "next";

import { BlogIndex } from "@/components/sections/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { getVisibleBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildBlogIndexStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).blog;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: "/blog",
    lang,
  });
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildBlogIndexStructuredData(lang)} />
      <BlogIndex posts={getVisibleBlogPosts()} />
    </>
  );
}
