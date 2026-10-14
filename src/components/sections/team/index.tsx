"use client";

import { Founders } from "@/components/sections/team/founders";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Section } from "@/components/ui/section/section";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.15;
const CTA_DELAY = 0;
const LINK_DELAY = 80;

export function Team() {
  const { messages } = useI18n();

  return (
    <Section id="nosotros">
      <SectionHeading
        title={messages.team.title}
        description={messages.team.description}
        className="max-w-2xl"
        descriptionClassName="max-w-xl"
        titleDelay={TITLE_DELAY}
        descriptionDelay={DESCRIPTION_DELAY}
      />

      <Founders />

      <div className="mt-16 flex flex-col items-start gap-x-2 gap-y-3 sm:mt-20 sm:flex-row sm:flex-wrap sm:items-baseline">
        <WordReveal
          text={messages.team.ctaTitle}
          delay={CTA_DELAY}
          className="text-base text-ink sm:text-lg"
        />
        <Reveal delay={LINK_DELAY}>
          <a
            href={`mailto:${site.emails.contact}`}
            className="text-base text-ink underline decoration-accent underline-offset-4 rounded-sm transition-colors duration-200 ease-out hover:decoration-ink sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {messages.team.ctaButton}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
