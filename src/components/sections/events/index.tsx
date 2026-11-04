"use client";

import { EventFormats } from "@/components/sections/events/event-formats";
import { PartnerWays } from "@/components/sections/events/partner-ways";
import { PolaroidGallery } from "@/components/sections/events/polaroid-gallery";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { FrameFade } from "@/components/ui/section/frame-fade";
import { Container } from "@/components/ui/section/container";
import { PageHeader } from "@/components/ui/section/page-header";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const HEADER = "border-b border-border py-20 sm:py-28";
const SECTION_HEAD = "border-b border-border py-12 sm:py-16";
const SECTION_BODY = "py-12 sm:py-16";

export function Events() {
  const { messages } = useI18n();
  const page = messages.events;

  return (
    <div className="relative mx-auto w-full max-w-content border-x border-border">
      <FrameFade />
      <Container className={HEADER}>
        <PageHeader title={page.title} description={page.description} />
      </Container>

      <Container className={SECTION_HEAD}>
        <BlurReveal>
          <SectionHeading
            title={page.formatsTitle}
            description={page.formatsDescription}
            className="max-w-xl"
          />
        </BlurReveal>
      </Container>
      <Container className={SECTION_BODY}>
        <EventFormats
          items={page.formats}
          soonLabel={page.formatSoon}
          delay={0.1}
          className="w-full"
        />
      </Container>

      <Container className={SECTION_HEAD}>
        <BlurReveal>
          <SectionHeading
            title={page.gallery.title}
            description={page.gallery.description}
            className="max-w-xl"
          />
        </BlurReveal>
      </Container>
      <Container className={SECTION_BODY}>
        <div>
          <PolaroidGallery items={page.gallery.items} delay={0.1} />
        </div>
      </Container>

      <Container className={SECTION_HEAD}>
        <BlurReveal>
          <SectionHeading
            title={page.sponsorTitle}
            description={page.sponsorDescription}
            className="max-w-xl"
          />
        </BlurReveal>
      </Container>
      <Container className={SECTION_BODY}>
        <PartnerWays items={page.sponsorWays} delay={0.1} className="w-full" />
        <BlurReveal delay={0.2} className="mt-10 flex sm:mt-12">
          <TextureButton asChild variant="primary" size="square" className="w-full sm:w-auto">
            <a href={`mailto:${site.emails.events}`}>{page.cta}</a>
          </TextureButton>
        </BlurReveal>
      </Container>
    </div>
  );
}
