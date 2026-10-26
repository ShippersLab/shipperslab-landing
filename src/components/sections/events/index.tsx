"use client";

import { EventFormats } from "@/components/sections/events/event-formats";
import { PartnerWays } from "@/components/sections/events/partner-ways";
import { PolaroidGallery } from "@/components/sections/events/polaroid-gallery";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { PageHeader } from "@/components/ui/section/page-header";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const SECTION = "py-16 sm:py-20 md:py-28";
const HEADER = "py-20 sm:py-28";

export function Events() {
  const { messages } = useI18n();
  const page = messages.events;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className={HEADER}>
        <PageHeader title={page.title} description={page.description} />
      </Container>

      <Container className={SECTION}>
        <BlurReveal>
          <SectionHeading
            title={page.formatsTitle}
            description={page.formatsDescription}
            className="max-w-xl"
          />
        </BlurReveal>
        <EventFormats
          items={page.formats}
          soonLabel={page.formatSoon}
          delay={0.1}
          className="mt-16 w-full sm:mt-20"
        />
      </Container>

      <Container className={SECTION}>
        <BlurReveal>
          <SectionHeading
            title={page.gallery.title}
            description={page.gallery.description}
            className="max-w-xl"
          />
        </BlurReveal>
        <div className="mt-16 sm:mt-20">
          <PolaroidGallery items={page.gallery.items} delay={0.1} />
        </div>
      </Container>

      <Container className={SECTION}>
        <BlurReveal>
          <SectionHeading
            title={page.sponsorTitle}
            description={page.sponsorDescription}
            className="max-w-xl"
          />
        </BlurReveal>
        <PartnerWays items={page.sponsorWays} delay={0.1} className="mt-16 w-full sm:mt-20" />
        <BlurReveal delay={0.2} className="mt-10 flex sm:mt-12">
          <TextureButton asChild variant="primary" size="square" className="w-full sm:w-auto">
            <a href={`mailto:${site.emails.events}`}>{page.cta}</a>
          </TextureButton>
        </BlurReveal>
      </Container>
    </div>
  );
}
