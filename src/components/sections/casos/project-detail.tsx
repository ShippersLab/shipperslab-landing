"use client";

import { CaseCta } from "@/components/sections/casos/case-cta";
import { CaseHeader } from "@/components/sections/casos/case-header";
import { CaseImage } from "@/components/sections/casos/case-image";
import { CaseList } from "@/components/sections/casos/case-list";
import { CaseRow } from "@/components/sections/casos/case-row";
import { GalleryMarquee } from "@/components/sections/casos/gallery-marquee";
import { InlineText } from "@/components/sections/service-page/inline-text";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { useI18n } from "@/i18n/provider";
import { eventopsImages } from "@/lib/projects/eventops";
import { site } from "@/lib/site";

const BODY = "text-base leading-relaxed text-muted";

export function ProjectDetail() {
  const { messages } = useI18n();
  const page = messages.casos.eventops;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <CaseHeader
          backLabel={page.backLabel}
          eyebrow={page.eyebrow}
          title={page.title}
          lead={page.lead}
          facts={page.facts}
          factsLabel={page.factsLabel}
        >
          <TextureButton asChild variant="primary" size="square" className="w-full sm:w-fit">
            <a href={site.eventopsUrl} target="_blank" rel="noopener noreferrer">
              {page.visitLabel}
              <span className="sr-only"> ({messages.common.opensNewTab})</span>
            </a>
          </TextureButton>
        </CaseHeader>

        <CaseImage tags={page.tags} delay={0.4} className="mt-16 sm:mt-20">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <SkeletonImage
              src={eventopsImages.hero}
              alt={page.heroAlt}
              fill
              preload
              fetchPriority="high"
              quality={90}
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="object-cover"
            />
          </div>
        </CaseImage>

        <CaseRow title={page.whyTitle}>
          <p className={BODY}>{page.why}</p>
        </CaseRow>

        <CaseRow title={page.overviewTitle}>
          <p className={BODY}>
            <InlineText text={page.overview} />
          </p>
        </CaseRow>

        <CaseRow title={page.approachTitle}>
          <p className={BODY}>{page.approach}</p>
        </CaseRow>

        <div className="mt-16 sm:mt-24">
          <BlurReveal className="max-w-2xl">
            <h2 className="text-2xl text-ink sm:text-3xl">{page.flowTitle}</h2>
            <p className={`mt-4 ${BODY}`}>{page.flowDescription}</p>
          </BlurReveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.flow.map((step, index) => (
              <BlurReveal
                as="li"
                key={step.title}
                delay={index * 0.08}
                className="flex flex-col rounded-lg border border-muted/25 p-6"
              >
                <span className="flex size-8 items-center justify-center rounded-md border border-border font-heading text-base text-accent">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </BlurReveal>
            ))}
          </ol>
        </div>

        <div className="mt-16 sm:mt-24">
          <BlurReveal>
            <h2 className="text-2xl text-ink sm:text-3xl">{page.featuresTitle}</h2>
          </BlurReveal>
          <ul className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feature, index) => (
              <BlurReveal as="li" key={feature.title} delay={index * 0.08}>
                <div className="border-t border-border pt-6">
                  <h3 className="text-xl text-ink">{feature.title}</h3>
                  <p className={`mt-3 ${BODY}`}>{feature.body}</p>
                </div>
              </BlurReveal>
            ))}
          </ul>
        </div>

        <CaseRow title={page.doneTitle}>
          <CaseList items={page.done} />
        </CaseRow>

        <CaseRow title={page.customersTitle}>
          <p className={BODY}>{page.customers}</p>
        </CaseRow>
      </Container>

      <div className="py-16 sm:py-24">
        <Container>
          <BlurReveal>
            <h2 className="text-2xl text-ink sm:text-3xl">{page.galleryTitle}</h2>
          </BlurReveal>
        </Container>
        <BlurReveal delay={0.1} className="mt-8">
          <GalleryMarquee images={eventopsImages.gallery} alts={page.galleryAlts} />
        </BlurReveal>
      </div>

      <Container className="pb-20 sm:pb-28">
        <CaseCta />
      </Container>
    </div>
  );
}
