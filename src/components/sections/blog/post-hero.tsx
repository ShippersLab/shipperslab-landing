"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { DraftBadge } from "@/components/sections/blog/draft-badge";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Container } from "@/components/ui/section/container";
import type { TeamMember } from "@/lib/site";

const TITLE_DELAY = 0;
const LEAD_DELAY = 0.25;
const META_DELAY = 350;

const ServiceHeroDither = dynamic(
  () =>
    import("@/components/sections/service-page/service-hero-dither").then(
      (module) => module.ServiceHeroDither,
    ),
  { ssr: false },
);

const CRUMB_CLASS =
  "rounded-sm transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

type BlogPostHeroProps = {
  title: string;
  lead: string;
  breadcrumbLabel: string;
  homeLabel: string;
  blogLabel: string;
  draftLabel?: string;
  author?: TeamMember;
  authorRole?: string;
  date: string;
  dateLabel: string;
  publishedOn: string;
  readingTime: string;
};

export function BlogPostHero({
  title,
  lead,
  breadcrumbLabel,
  homeLabel,
  blogLabel,
  draftLabel,
  author,
  authorRole,
  date,
  dateLabel,
  publishedOn,
  readingTime,
}: BlogPostHeroProps) {
  return (
    <header className="relative isolate overflow-clip border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-b-from-60% mask-b-to-100%"
      >
        <ServiceHeroDither />
      </div>

      <Container className="w-full py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <nav
              aria-label={breadcrumbLabel}
              className="inline-flex rounded-md border border-border bg-paper px-3 py-1.5 font-mono text-sm tracking-tight text-muted"
            >
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className={CRUMB_CLASS}>
                    {homeLabel}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className={CRUMB_CLASS}>
                    {blogLabel}
                  </Link>
                </li>
              </ol>
            </nav>
            {draftLabel ? <DraftBadge label={draftLabel} /> : null}
          </div>

          <h1 className="mt-6 font-pixel text-4xl text-balance font-medium tracking-tighter text-ink sm:text-5xl">
            <DiaTextReveal
              text={title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
            />
          </h1>
          <WordReveal
            text={lead}
            delay={LEAD_DELAY}
            className="mt-6 max-w-2xl text-lg text-muted"
          />

          <Reveal
            delay={META_DELAY}
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8"
          >
            {author ? (
              <a
                href={author.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-border bg-border">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt=""
                      fill
                      sizes="44px"
                      quality={90}
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center font-heading text-sm text-ink">
                      {author.initials}
                    </span>
                  )}
                </span>
                <span className="flex flex-col">
                  <span className="text-base text-ink underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-out group-hover:decoration-ink/30">
                    {author.name}
                  </span>
                  {authorRole ? <span className="text-sm text-muted">{authorRole}</span> : null}
                </span>
              </a>
            ) : null}
            <p className="font-mono text-sm tracking-tight text-muted sm:border-l sm:border-border sm:pl-8">
              <span className="whitespace-nowrap">
                {publishedOn} <time dateTime={date}>{dateLabel}</time>
              </span>
              <span aria-hidden> · </span>
              <span className="whitespace-nowrap">{readingTime}</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </header>
  );
}
