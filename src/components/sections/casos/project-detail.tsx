"use client";

import { CaseCta } from "@/components/sections/casos/case-cta";
import { CaseHeader } from "@/components/sections/casos/case-header";
import { CaseImage } from "@/components/sections/casos/case-image";
import { CaseProduct } from "@/components/sections/casos/case-product";
import { CaseProse } from "@/components/sections/casos/case-prose";
import { CaseRow } from "@/components/sections/casos/case-row";
import { CaseGallerySection } from "@/components/sections/casos/case-gallery-section";
import { TextureButton } from "@/components/ui/button/texture-button";
import { FrameFade } from "@/components/ui/section/frame-fade";
import { Container } from "@/components/ui/section/container";
import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { useI18n } from "@/i18n/provider";
import { eventopsImages } from "@/lib/projects/eventops";
import { site } from "@/lib/site";

export function ProjectDetail() {
  const { messages } = useI18n();
  const page = messages.casos.eventops;

  return (
    <div className="relative mx-auto w-full max-w-content border-x border-border">
      <FrameFade />
      <Container className="w-full py-20 sm:py-28">
        <CaseHeader
          backLabel={page.backLabel}
          eyebrow={page.eyebrow}
          title={page.title}
          lead={page.lead}
        >
          <TextureButton asChild variant="primary" size="square" className="w-full sm:w-fit">
            <a href={site.eventopsUrl} target="_blank" rel="noopener noreferrer">
              {page.visitLabel}
              <span className="sr-only"> ({messages.common.opensNewTab})</span>
            </a>
          </TextureButton>
        </CaseHeader>

        <CaseImage delay={0.4} className="mt-16 sm:mt-20">
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

        {page.sections.map((section) => (
          <CaseRow key={section.title} title={section.title}>
            <CaseProse paragraphs={section.body} />
          </CaseRow>
        ))}
      </Container>

      <CaseGallerySection
        title={page.galleryTitle}
        images={eventopsImages.gallery}
        alts={page.galleryAlts}
      />

      <CaseProduct
        title={page.productTitle}
        description={page.productDescription}
        label={page.productCta}
        href={site.eventopsUrl}
      />

      <CaseCta />
    </div>
  );
}
