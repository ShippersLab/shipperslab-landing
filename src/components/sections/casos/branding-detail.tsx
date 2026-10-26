"use client";

import { CaseCta } from "@/components/sections/casos/case-cta";
import { CaseHeader } from "@/components/sections/casos/case-header";
import { CaseImage } from "@/components/sections/casos/case-image";
import { CaseList } from "@/components/sections/casos/case-list";
import { CaseRow } from "@/components/sections/casos/case-row";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { Container } from "@/components/ui/section/container";
import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { useI18n } from "@/i18n/provider";
import { estacionarImages } from "@/lib/projects/estacionar";

const BODY = "text-base leading-relaxed text-muted";

export function BrandingDetail() {
  const { messages } = useI18n();
  const page = messages.casos.estacionar;
  const [cover, ...details] = page.images;

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
        />

        <CaseImage tags={page.tags} delay={0.4} className="mt-16 sm:mt-20">
          <figure>
            <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
              <SkeletonImage
                src={estacionarImages.cover}
                alt={cover.alt}
                fill
                preload
                fetchPriority="high"
                quality={90}
                sizes="(min-width: 1200px) 1136px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </CaseImage>

        <ul className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-8">
          {details.map((item, index) => (
            <li key={item.alt}>
              <CaseImage delay={index * 0.1}>
                <figure>
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                    <SkeletonImage
                      src={estacionarImages.details[index]}
                      alt={item.alt}
                      fill
                      quality={90}
                      sizes="(min-width: 1200px) 564px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CaseImage>
            </li>
          ))}
        </ul>

        <CaseRow title={page.ideaTitle}>
          <p className={BODY}>{page.idea}</p>
        </CaseRow>

        <CaseRow title={page.whyTitle}>
          <p className={BODY}>{page.why}</p>
        </CaseRow>

        <CaseRow title={page.howTitle}>
          <p className={BODY}>{page.howIntro}</p>
          <ul className="mt-6 flex flex-col">
            {page.how.map((item, index) => (
              <BlurReveal
                as="li"
                key={item.title}
                delay={index * 0.08}
                className="border-t border-border py-5"
              >
                <h3 className="text-lg text-ink">{item.title}</h3>
                <p className={`mt-2 ${BODY}`}>{item.body}</p>
              </BlurReveal>
            ))}
          </ul>
        </CaseRow>

        <CaseRow title={page.doneTitle}>
          <CaseList items={page.done} />
        </CaseRow>

        <CaseRow title={page.brandTitle}>
          <p className={BODY}>{page.brand}</p>
        </CaseRow>

        <CaseRow title={page.stageTitle}>
          <p className={BODY}>{page.stage}</p>
        </CaseRow>

        <CaseCta />
      </Container>
    </div>
  );
}
