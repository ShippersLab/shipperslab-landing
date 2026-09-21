"use client";

import { Companies } from "@/components/sections/trust/companies";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

export function Trust() {
  const { messages } = useI18n();

  return (
    <Section id="nosotros" bordered>
      <SectionHeading
        title={messages.trust.title}
        description={messages.trust.description}
        className="max-w-2xl"
        descriptionClassName="max-w-xl"
      />

      <Companies />

      <Reveal className="mt-14 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <p className="text-lg text-ink">{messages.trust.ctaTitle}</p>
        <a
          href={`mailto:${site.emails.contact}`}
          className="text-lg text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
        >
          {messages.trust.ctaButton}
        </a>
      </Reveal>
    </Section>
  );
}
