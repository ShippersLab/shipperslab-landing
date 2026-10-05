"use client";

import { Companies } from "@/components/sections/trust/companies";
import { EventOpsCard } from "@/components/sections/trust/eventops-card";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.15;
const EVENTOPS_DELAY = 0;
const COMPANIES_DELAY = 0;
const CTA_DELAY = 0;
const LINK_DELAY = 80;

export function Trust() {
  const { messages } = useI18n();

  return (
    <Section id="nosotros" bordered>
      <SectionHeading
        title={messages.trust.title}
        description={messages.trust.description}
        className="max-w-2xl"
        descriptionClassName="max-w-xl"
        titleDelay={TITLE_DELAY}
        descriptionDelay={DESCRIPTION_DELAY}
      />

      <EventOpsCard delay={EVENTOPS_DELAY} />

      <Companies delay={COMPANIES_DELAY} />

      <div className="mt-14 flex flex-col items-start gap-x-2 gap-y-3 sm:flex-row sm:flex-wrap sm:items-baseline">
        <WordReveal
          text={messages.trust.ctaTitle}
          delay={CTA_DELAY}
          className="text-base text-ink sm:text-lg"
        />
        <Reveal delay={LINK_DELAY}>
          <a
            href={`mailto:${site.emails.contact}`}
            className="text-base text-ink underline decoration-accent underline-offset-4 transition-colors duration-200 hover:decoration-ink sm:text-lg"
          >
            {messages.trust.ctaButton}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
