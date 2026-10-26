"use client";

import { DraftBadge } from "@/components/sections/blog/draft-badge";
import { ServiceCta } from "@/components/sections/service-page/service-cta";
import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section/container";
import { PageHeader } from "@/components/ui/section/page-header";
import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { type BlogPostMeta, getReadingMinutes } from "@/lib/blog";
import { blogPostOpenGraphPath } from "@/lib/seo/blog/og-path";

type BlogIndexProps = {
  posts: readonly BlogPostMeta[];
};

export function BlogIndex({ posts }: BlogIndexProps) {
  const { locale, messages } = useI18n();
  const page = messages.blog;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="py-20 sm:py-28">
        <PageHeader title={page.title} description={page.description} />
      </Container>

      <Container className="w-full py-16 sm:py-20 md:py-28">
        {posts.length === 0 ? (
          <p className="rounded-lg border border-border p-8 text-center text-base text-muted sm:p-12 sm:text-lg">
            {page.empty}
          </p>
        ) : (
          <StaggerReveal as="ul" className="grid gap-12">
            {posts.map((post) => {
              const content = page.posts[post.slug];
              return (
                <li key={post.slug}>
                  <LocalizedLink
                    href={`/blog/${post.slug}`}
                    className="group grid items-center gap-6 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink md:grid-cols-[2fr_3fr] md:gap-10"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                      <SkeletonImage
                        src={blogPostOpenGraphPath(post.slug, locale)}
                        alt=""
                        fill
                        unoptimized
                        sizes="(min-width: 768px) 460px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      {post.published ? null : <DraftBadge label={page.draft} />}
                      <p className="text-sm text-muted">
                        {page.readingTime.replace("{minutes}", String(getReadingMinutes(content)))}
                      </p>
                      <h2 className="mt-3 text-2xl text-balance text-ink sm:text-3xl">
                        {content.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-muted">{content.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-base font-medium text-ink underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out group-hover:decoration-accent">
                        {page.readMore}
                        <ArrowRightIcon size={16} aria-hidden />
                      </span>
                    </div>
                  </LocalizedLink>
                </li>
              );
            })}
          </StaggerReveal>
        )}

        <ServiceCta
          title={page.ctaTitle}
          description={page.ctaDescription}
          button={page.ctaButton}
        />
      </Container>
    </div>
  );
}
