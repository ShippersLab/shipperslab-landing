"use client";

import Image from "next/image";
import Link from "next/link";

import { GalleryMarquee } from "@/components/sections/casos/gallery-marquee";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import { eventopsImages } from "@/lib/projects/eventops";
import { site } from "@/lib/site";

const TITLE_DELAY = 0;
const LEAD_DELAY = 0.25;
const BUTTON_DELAY = 450;
const IMAGE_DELAY = 300;

export function ProjectDetail() {
  const { messages } = useI18n();
  const page = messages.casos.eventops;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <Link
          href="/casos"
          className="inline-flex items-center gap-2 rounded-sm text-sm text-muted transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <ArrowRightIcon className="size-4 rotate-180" />
          {page.backLabel}
        </Link>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm text-muted">{page.eyebrow}</p>
            <h1 className="mt-4 font-pixel text-4xl font-medium tracking-tighter text-ink sm:text-5xl">
              <DiaTextReveal
                text={page.title}
                colors={["var(--accent)"]}
                textColor="var(--ink)"
                delay={TITLE_DELAY}
              />
            </h1>
            <WordReveal text={page.lead} delay={LEAD_DELAY} className="mt-5 text-lg text-muted" />
          </div>
          <Reveal delay={BUTTON_DELAY} className="w-full lg:w-auto">
            <TextureButton asChild variant="secondary" size="pill" className="w-full lg:w-auto">
              <a href={site.eventopsUrl} target="_blank" rel="noreferrer">
                {page.visitLabel}
                <ArrowUpRightIcon size={16} />
                <span className="sr-only"> ({messages.common.opensNewTab})</span>
              </a>
            </TextureButton>
          </Reveal>
        </div>

        <Reveal delay={IMAGE_DELAY} className="mt-6 sm:mt-10">
          <div className="aspect-video overflow-hidden rounded-lg border border-border bg-ink">
            <Image
              src={eventopsImages.hero}
              alt={page.heroAlt}
              priority
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="size-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <dl
            aria-label={page.factsLabel}
            className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 lg:grid-cols-4"
          >
            {page.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-2 text-base text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-16 sm:mt-20">
          <div className="grid gap-6 border-t border-border pt-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h2 className="text-2xl text-ink sm:text-3xl">{page.overviewTitle}</h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted">{page.overview}</p>
          </div>
        </Reveal>

        <Reveal className="mt-16 sm:mt-20">
          <div className="grid gap-6 border-t border-border pt-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h2 className="text-2xl text-ink sm:text-3xl">{page.approachTitle}</h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted">{page.approach}</p>
          </div>
        </Reveal>

        <div className="mt-16 sm:mt-20">
          <Reveal>
            <h2 className="text-2xl text-ink sm:text-3xl">{page.featuresTitle}</h2>
          </Reveal>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {page.features.map((feature, index) => (
              <Reveal key={feature.title} as="li" delay={index * 80}>
                <div className="border-t border-border pt-6">
                  <h3 className="text-xl text-ink">{feature.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-16 sm:py-24">
        <Container>
          <Reveal>
            <h2 className="text-2xl text-ink sm:text-3xl">{page.galleryTitle}</h2>
          </Reveal>
        </Container>
        <Reveal delay={150} className="mt-8">
          <GalleryMarquee images={eventopsImages.gallery} alts={page.galleryAlts} />
        </Reveal>
      </div>
    </div>
  );
}
