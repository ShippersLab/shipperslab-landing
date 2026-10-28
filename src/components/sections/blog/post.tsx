"use client";

import { BlogPostBody } from "@/components/sections/blog/post-body";
import { BlogPostHero } from "@/components/sections/blog/post-hero";
import { ServiceCta } from "@/components/sections/service-page/service-cta";
import { Reveal } from "@/components/ui/animation/reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section/container";
import { LocalizedLink } from "@/i18n/link";
import type { BlogPostContent } from "@/content/blog/types";
import { useI18n } from "@/i18n/provider";
import {
  type BlogSlug,
  formatBlogDate,
  getBlogAuthor,
  getBlogPost,
  getReadingMinutes,
} from "@/lib/blog";

type BlogPostProps = {
  slug: BlogSlug;
  post: BlogPostContent;
};

export function BlogPost({ slug, post }: BlogPostProps) {
  const { locale, messages } = useI18n();
  const blog = messages.blog;
  const meta = getBlogPost(slug);
  if (!meta) return null;
  const author = getBlogAuthor(slug);
  const authorRole = author ? messages.team.members[author.id].role : undefined;
  const readingTime = blog.readingTime.replace("{minutes}", String(getReadingMinutes(post)));

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <article>
        <BlogPostHero
          title={post.title}
          lead={post.excerpt}
          draftLabel={!meta.published ? blog.draft : undefined}
          author={author}
          authorRole={authorRole}
          date={meta.datePublished}
          dateLabel={formatBlogDate(meta.datePublished, locale)}
          publishedOn={blog.publishedOn}
          readingTime={readingTime}
        />

        <Container className="w-full py-16 sm:py-20">
          <BlogPostBody post={post} />

          <ServiceCta
            title={post.ctaTitle}
            description={post.ctaDescription}
            button={post.ctaButton}
          />
        </Container>
      </article>

      <Container className="py-16 sm:py-20">
        <Reveal>
          <h2 className="text-xl text-ink sm:text-2xl">{post.related.title}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {post.related.links.map((item) => (
              <li key={item.href}>
                <LocalizedLink
                  href={item.href}
                  className="group flex h-full items-start justify-between gap-4 rounded-lg border border-border px-5 py-4 transition-colors duration-200 ease-out hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <span>
                    <span className="block text-base text-ink">{item.label}</span>
                    <span className="mt-1 block text-sm text-muted">{item.description}</span>
                  </span>
                  <ArrowRightIcon
                    size={16}
                    className="mt-1 shrink-0 text-muted transition-colors duration-200 ease-out group-hover:text-ink"
                  />
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
