import { JsonLd } from "@/components/seo/json-ld";
import { BlogIndex } from "@/components/sections/blog";
import { getMessages } from "@/i18n/get-messages";
import { getVisibleBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { buildBlogIndexStructuredData } from "@/lib/seo/structured-data";

const messages = getMessages("es").blog;

export const metadata = buildPageMetadata({
  title: messages.metaTitle,
  description: messages.metaDescription,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd data={buildBlogIndexStructuredData()} />
      <BlogIndex posts={getVisibleBlogPosts()} />
    </>
  );
}
