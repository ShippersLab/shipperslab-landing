"use client";

import Link from "next/link";

import { BlogPostHero } from "@/components/sections/blog/post-hero";
import { BlogPostList } from "@/components/sections/blog/post-list";
import { BlogPostTable } from "@/components/sections/blog/post-table";
import { BlogPostToc } from "@/components/sections/blog/post-toc";
import { StepCard } from "@/components/sections/como-trabajamos/step-card";
import { ServiceCta } from "@/components/sections/service-page/service-cta";
import { Reveal } from "@/components/ui/animation/reveal";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import {
  type BlogSlug,
  formatBlogDate,
  getBlogAuthor,
  getBlogPost,
  getReadingMinutes,
  slugifyHeading,
} from "@/lib/blog";

const FAQ_DELAY = 0.1;

const LINK_CLASS =
  "text-base font-medium text-ink underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const PARAGRAPH_CLASS = "mt-4 text-base leading-relaxed text-muted sm:text-lg";

const SECTION_CLASS = "scroll-mt-8 border-t border-border pt-10";

const H2_CLASS = "text-2xl text-balance text-ink sm:text-3xl";

type BlogPostProps = {
  slug: BlogSlug;
};

export function BlogPost({ slug }: BlogPostProps) {
  const { locale, messages } = useI18n();
  const blog = messages.blog;
  const post = blog.posts[slug];
  const meta = getBlogPost(slug);
  if (!meta) return null;
  const author = getBlogAuthor(slug);
  const authorRole = author ? messages.team.members[author.id].role : undefined;
  const readingTime = blog.readingTime.replace("{minutes}", String(getReadingMinutes(post)));

  const sections = post.sections.map((section) => ({
    ...section,
    id: slugifyHeading(section.title),
  }));
  const checklistId = slugifyHeading(post.checklist.title);
  const faqId = slugifyHeading(post.faq.title);
  const toc = [
    ...sections.map((section) => ({ id: section.id, title: section.title })),
    { id: checklistId, title: post.checklist.title },
    { id: faqId, title: post.faq.title },
  ];

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <article>
        <BlogPostHero
          title={post.title}
          lead={post.excerpt}
          breadcrumbLabel={blog.breadcrumb}
          homeLabel={blog.home}
          blogLabel={blog.navLabel}
          draftLabel={!meta.published ? blog.draft : undefined}
          author={author}
          authorRole={authorRole}
          date={meta.datePublished}
          dateLabel={formatBlogDate(meta.datePublished, locale)}
          publishedOn={blog.publishedOn}
          readingTime={readingTime}
        />

        <Container className="w-full py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <BlogPostToc label={blog.toc} items={toc} />

            <div className="min-w-0 max-w-2xl">
              <StepCard
                label={blog.answerLabel}
                icon={<CheckIcon size={14} className="shrink-0 text-muted" />}
                className="mt-0 bg-paper"
              >
                <p className="p-5 text-base leading-relaxed text-ink sm:p-6 sm:text-lg">
                  {post.answer}
                </p>
              </StepCard>

              <div className="mt-10">
                {post.intro.map((paragraph) => (
                  <p key={paragraph} className={PARAGRAPH_CLASS}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-14 grid gap-14">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className={SECTION_CLASS}>
                    <h2 className={H2_CLASS}>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className={PARAGRAPH_CLASS}>
                        {paragraph}
                      </p>
                    ))}
                    {"items" in section && section.items ? (
                      <BlogPostList items={section.items} />
                    ) : null}
                    {"table" in section && section.table ? (
                      <BlogPostTable table={section.table} />
                    ) : null}
                    {"closing" in section && section.closing ? (
                      <p className={PARAGRAPH_CLASS}>{section.closing}</p>
                    ) : null}
                    {"link" in section && section.link ? (
                      <Link href={section.link.href} className={`mt-6 inline-block ${LINK_CLASS}`}>
                        {section.link.label}
                      </Link>
                    ) : null}
                  </section>
                ))}

                <section id={checklistId} className={SECTION_CLASS}>
                  <h2 className={H2_CLASS}>{post.checklist.title}</h2>
                  <p className={PARAGRAPH_CLASS}>{post.checklist.intro}</p>
                  <ul className="mt-6 divide-y divide-border rounded-lg border border-border">
                    {post.checklist.items.map((item) => (
                      <li key={item} className="flex gap-3 px-5 py-4 text-base text-ink">
                        <span
                          aria-hidden
                          className="mt-1.5 size-3.5 shrink-0 rounded-sm border border-muted"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={PARAGRAPH_CLASS}>{post.checklist.closing}</p>
                </section>

                <section id={faqId} className={SECTION_CLASS}>
                  <h2 className={H2_CLASS}>{post.faq.title}</h2>
                  <FaqAccordion items={post.faq.items} delay={FAQ_DELAY} className="mt-6" />
                </section>
              </div>
            </div>
          </div>

          <ServiceCta
            title={post.ctaTitle}
            description={post.ctaDescription}
            button={post.ctaButton}
          />
        </Container>
      </article>

      <Container className="border-t border-border py-16 sm:py-20">
        <Reveal>
          <h2 className="text-xl text-ink sm:text-2xl">{post.related.title}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {post.related.links.map((item) => (
              <li key={item.href}>
                <Link
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
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
