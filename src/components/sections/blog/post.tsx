"use client";

import Link from "next/link";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import { type BlogSlug, formatBlogDate, getBlogAuthor, getBlogPost } from "@/lib/blog";

const TITLE_DELAY = 0;
const DETAIL_DELAY = 100;

const LINK_CLASS =
  "text-base font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const PARAGRAPH_CLASS = "mt-4 text-base leading-relaxed text-muted sm:text-lg";

type BlogPostProps = {
  slug: BlogSlug;
};

export function BlogPost({ slug }: BlogPostProps) {
  const { locale, messages } = useI18n();
  const blog = messages.blog;
  const post = blog.posts[slug];
  const meta = getBlogPost(slug);
  const author = getBlogAuthor(slug);

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <article className="max-w-2xl">
          <Link href="/blog" className={`text-sm ${LINK_CLASS}`}>
            {blog.back}
          </Link>
          <h1 className="mt-6 font-pixel text-4xl font-medium tracking-tighter text-ink sm:text-5xl">
            <DiaTextReveal
              text={post.title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
            />
          </h1>
          {meta ? (
            <p className="mt-5 text-sm text-muted">
              {author ? (
                <>
                  {blog.byline} {author.name}
                  {" · "}
                </>
              ) : null}
              {blog.publishedOn}{" "}
              <time dateTime={meta.datePublished}>
                {formatBlogDate(meta.datePublished, locale)}
              </time>
              {" · "}
              {post.readingTime}
            </p>
          ) : null}
          {post.intro.map((paragraph) => (
            <p key={paragraph} className={PARAGRAPH_CLASS}>
              {paragraph}
            </p>
          ))}

          {post.sections.map((section) => (
            <Reveal key={section.title} delay={DETAIL_DELAY}>
              <section className="mt-12 border-t border-border pt-8">
                <h2 className="text-2xl text-ink sm:text-3xl">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={PARAGRAPH_CLASS}>
                    {paragraph}
                  </p>
                ))}
                {"items" in section && section.items ? (
                  <ul className="mt-4 grid list-disc gap-3 pl-5 text-base leading-relaxed text-muted marker:text-accent sm:text-lg">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {"closing" in section && section.closing ? (
                  <p className={PARAGRAPH_CLASS}>{section.closing}</p>
                ) : null}
                {"link" in section && section.link ? (
                  <Link href={section.link.href} className={`mt-4 inline-block ${LINK_CLASS}`}>
                    {section.link.label}
                  </Link>
                ) : null}
              </section>
            </Reveal>
          ))}

          <Reveal delay={DETAIL_DELAY}>
            <section className="mt-12 rounded-lg border border-border p-6 sm:p-8">
              <h2 className="text-2xl text-ink sm:text-3xl">{post.checklist.title}</h2>
              <p className={PARAGRAPH_CLASS}>{post.checklist.intro}</p>
              <ul className="mt-4 grid gap-3 text-base leading-relaxed text-muted sm:text-lg">
                {post.checklist.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 size-3 shrink-0 rounded-sm border border-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={PARAGRAPH_CLASS}>{post.checklist.closing}</p>
            </section>
          </Reveal>

          <section className="mt-12 border-t border-border pt-8">
            <Reveal delay={DETAIL_DELAY}>
              <h2 className="text-2xl text-ink sm:text-3xl">{post.faq.title}</h2>
            </Reveal>
            <FaqAccordion items={post.faq.items} delay={0.1} className="mt-6" />
          </section>

          <Reveal delay={DETAIL_DELAY}>
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="text-xl text-ink sm:text-2xl">{post.related.title}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {post.related.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block h-full rounded-lg border border-border px-4 py-3 transition-colors duration-200 ease-out hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      <span className="block text-base text-ink">{item.label}</span>
                      <span className="mt-1 block text-sm text-muted">{item.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </article>

        <Reveal
          delay={DETAIL_DELAY}
          className="mt-16 flex w-full max-w-2xl flex-col items-start gap-5 rounded-lg border border-border p-8 sm:mt-20 sm:p-10"
        >
          <h2 className="text-2xl text-ink">{post.ctaTitle}</h2>
          <p className="text-base text-muted">{post.ctaDescription}</p>
          <TextureButton asChild variant="primary" size="pill" className="w-full sm:w-auto">
            <Link href="/empecemos">{post.ctaButton}</Link>
          </TextureButton>
        </Reveal>
      </Container>
    </div>
  );
}
