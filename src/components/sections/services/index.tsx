"use client";

import { ServiceRow } from "@/components/sections/services/service-row";
import { Reveal } from "@/components/ui/animation/reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Section } from "@/components/ui/section/section";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";

const CASES_CTA_DELAY = 300;

export function Services() {
  const { messages } = useI18n();

  return (
    <Section id="servicios">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-px top-0 h-40 bg-linear-to-b from-paper to-transparent sm:h-56"
      />
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title={messages.services.title}
          description={messages.services.description}
          className="max-w-lg"
        />
        <Reveal delay={CASES_CTA_DELAY} className="w-full sm:w-auto">
          <TextureButton asChild variant="secondary" size="square" className="w-full sm:w-auto">
            <LocalizedLink href="/casos">{messages.services.casesCta}</LocalizedLink>
          </TextureButton>
        </Reveal>
      </div>

      <ol className="mt-16 flex flex-col sm:mt-24">
        {messages.services.items.map((service, index) => (
          <ServiceRow key={service.id} index={index} service={service} />
        ))}
      </ol>
    </Section>
  );
}
