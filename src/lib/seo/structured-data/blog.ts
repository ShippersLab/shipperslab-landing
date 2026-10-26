import type { Blog, BlogPosting, Graph } from "schema-dts";

import { languageTags, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import {
  type BlogSlug,
  getBlogAuthor,
  getBlogPost,
  getPublishedBlogPosts,
  getWordCount,
} from "@/lib/blog";
import { blogPostOpenGraphPath } from "@/lib/seo/blog/og-path";
import { buildFaqPage, buildPageBreadcrumbStructuredData } from "@/lib/seo/structured-data/pages";
import { ORGANIZATION_ID, websiteId } from "@/lib/seo/structured-data/shared";
import { site } from "@/lib/site";

const BLOG_PATH = "/blog";

function blogId(lang: Locale) {
  return `${localizedUrl(BLOG_PATH, lang)}#blog`;
}

export function buildBlogIndexStructuredData(lang: Locale): Graph {
  const page = getMessages(lang).blog;
  const blogUrl = localizedUrl(BLOG_PATH, lang);

  const blog: Blog = {
    "@type": "Blog",
    "@id": blogId(lang),
    url: blogUrl,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: languageTags[lang],
    isPartOf: { "@id": websiteId(lang) },
    publisher: { "@id": ORGANIZATION_ID },
    blogPost: getPublishedBlogPosts().map((post) => ({
      "@type": "BlogPosting",
      "@id": `${blogUrl}/${post.slug}#article`,
      headline: page.posts[post.slug].title,
      url: `${blogUrl}/${post.slug}`,
      image: `${site.url}${blogPostOpenGraphPath(post.slug, lang)}`,
      datePublished: post.datePublished,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      blog,
      ...buildPageBreadcrumbStructuredData(BLOG_PATH, page.navLabel, lang)["@graph"],
    ],
  };
}

function firstSectionImage(sections: readonly object[]) {
  for (const section of sections) {
    if (!("image" in section)) continue;
    const image = section.image;
    if (!image || typeof image !== "object" || !("src" in image) || typeof image.src !== "string") {
      continue;
    }
    return image.src;
  }
  return undefined;
}

export function buildBlogPostStructuredData(slug: BlogSlug, lang: Locale): Graph {
  const messages = getMessages(lang);
  const post = messages.blog.posts[slug];
  const meta = getBlogPost(slug);
  const path = `${BLOG_PATH}/${slug}`;
  const url = localizedUrl(path, lang);
  const publisher = {
    "@type": "Organization" as const,
    "@id": ORGANIZATION_ID,
    name: site.name,
    url: site.url,
  };
  const member = getBlogAuthor(slug);
  const author = member
    ? {
        "@type": "Person" as const,
        "@id": `${site.url}/#${member.id}`,
        name: member.name,
        url: member.profileUrl,
      }
    : publisher;

  const ogImage =
    meta?.published === true
      ? `${site.url}${blogPostOpenGraphPath(slug, lang)}`
      : `${site.url}/opengraph-image.jpg`;
  const contentImage = firstSectionImage(post.sections as readonly object[]);

  const article: BlogPosting = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    abstract: post.answer,
    wordCount: getWordCount(post),
    url,
    mainEntityOfPage: url,
    inLanguage: languageTags[lang],
    image: contentImage ? [ogImage, `${site.url}${contentImage}`] : ogImage,
    datePublished: meta?.datePublished,
    dateModified: meta?.datePublished,
    author,
    publisher,
    isPartOf: { "@id": blogId(lang) },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      article,
      ...buildPageBreadcrumbStructuredData(path, post.title, lang, [
        { name: messages.blog.navLabel, path: BLOG_PATH },
      ])["@graph"],
      buildFaqPage(url, post.faq.items, lang),
    ],
  };
}
