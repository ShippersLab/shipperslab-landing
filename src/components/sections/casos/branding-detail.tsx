"use client";

import { CaseCta } from "@/components/sections/casos/case-cta";
import { CaseHeader } from "@/components/sections/casos/case-header";
import { CaseImage } from "@/components/sections/casos/case-image";
import { CaseProse } from "@/components/sections/casos/case-prose";
import { CaseRow } from "@/components/sections/casos/case-row";
import { FrameFade } from "@/components/ui/section/frame-fade";
import { Container } from "@/components/ui/section/container";
import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { useI18n } from "@/i18n/provider";
import { estacionarImages } from "@/lib/projects/estacionar";

export function BrandingDetail() {
  const { messages } = useI18n();
  const page = messages.casos.estacionar;
  const [cover, ...details] = page.images;

  return (
    <div className="relative mx-auto w-full max-w-content border-x border-border">
      <FrameFade />
      <Container className="w-full py-20 sm:py-28">
        <CaseHeader
          backLabel={page.backLabel}
          eyebrow={page.eyebrow}
          title={page.title}
          lead={page.lead}
        />

        <CaseImage delay={0.4} className="mt-16 sm:mt-20">
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

        {page.sections.map((section) => (
          <CaseRow key={section.title} title={section.title}>
            <CaseProse paragraphs={section.body} />
          </CaseRow>
        ))}
      </Container>

      <CaseCta />
    </div>
  );
}
