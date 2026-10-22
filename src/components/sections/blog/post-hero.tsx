"use client";

import Image from "next/image";
import Link from "next/link";

import { DraftBadge } from "@/components/sections/blog/draft-badge";
import { ServiceHero } from "@/components/sections/service-page/service-hero";
import { Reveal } from "@/components/ui/animation/reveal";
import type { TeamMember } from "@/lib/site";

const META_DELAY = 350;

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
    <ServiceHero
      variant="article"
      ditherBelowNavbar
      title={title}
      lead={lead}
      eyebrowSlot={
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
      }
    >
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
    </ServiceHero>
  );
}
