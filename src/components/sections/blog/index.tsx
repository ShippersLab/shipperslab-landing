"use client";

import Link from "next/link";

import { DraftBadge } from "@/components/sections/blog/draft-badge";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import { type BlogPostMeta, formatBlogDate, getReadingMinutes } from "@/lib/blog";

const TITLE_DELAY = 0;
const LEAD_DELAY = 0.25;
const LIST_DELAY = 400;

type BlogIndexProps = {
  posts: readonly BlogPostMeta[];
};

export function BlogIndex({ posts }: BlogIndexProps) {
  const { locale, messages } = useI18n();
  const page = messages.blog;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <div className="max-w-2xl">
          <h1 className="font-pixel text-4xl font-medium tracking-tighter text-balance text-ink sm:text-5xl">
            <DiaTextReveal
              text={page.title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
            />
          </h1>
          <WordReveal
            text={page.description}
            delay={LEAD_DELAY}
            className="mt-5 text-lg text-muted"
          />
        </div>

        {posts.length === 0 ? (
          <p className="mt-16 max-w-2xl text-base text-muted sm:mt-20 sm:text-lg">{page.empty}</p>
        ) : (
          <ul className="mt-16 grid gap-6 sm:mt-20">
            {posts.map((post, index) => {
              const content = page.posts[post.slug];
              return (
                <li key={post.slug}>
                  <Reveal delay={LIST_DELAY + index * 80}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block max-w-2xl rounded-lg border border-border p-6 transition-colors duration-200 ease-out hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:p-8"
                    >
                      {post.published ? null : <DraftBadge label={page.draft} className="mb-3" />}
                      <p className="text-sm text-muted">
                        <time dateTime={post.datePublished}>
                          {formatBlogDate(post.datePublished, locale)}
                        </time>
                        {" · "}
                        {page.readingTime.replace("{minutes}", String(getReadingMinutes(content)))}
                      </p>
                      <h2 className="mt-3 text-2xl text-ink sm:text-3xl">{content.title}</h2>
                      <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                        {content.excerpt}
                      </p>
                      <span className="mt-4 inline-block text-base font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out group-hover:decoration-accent">
                        {page.readMore}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </div>
  );
}
