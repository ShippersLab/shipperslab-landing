"use client";

import { Companies } from "@/components/sections/trust/companies";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { ArcBandsBackground } from "@/components/ui/arc-bands-background";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.45;
const COMPANIES_DELAY = 0.85;
const CTA_DELAY = 1.6;

export function Trust() {
  const { messages } = useI18n();

  return (
    <ArcBandsBackground
      id="nosotros"
      className="mx-auto w-full max-w-content border-x border-t border-border py-20 sm:py-28 md:py-section"
    >
      <Container>
        <SectionHeading
          title={messages.trust.title}
          description={messages.trust.description}
          className="max-w-2xl"
          descriptionClassName="max-w-xl"
          titleDelay={TITLE_DELAY}
          descriptionDelay={DESCRIPTION_DELAY}
        />

        <Companies delay={COMPANIES_DELAY} />

        <div className="mt-14 flex flex-col items-start gap-x-2 gap-y-3 sm:flex-row sm:flex-wrap sm:items-baseline">
          <WordReveal
            text={messages.trust.ctaTitle}
            delay={CTA_DELAY}
            className="text-base text-ink sm:text-lg"
          />
          <Reveal delay={(CTA_DELAY + 0.1) * 1000}>
            <a
              href={`mailto:${site.emails.contact}`}
              className="text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent sm:text-lg"
            >
              {messages.trust.ctaButton}
            </a>
          </Reveal>
        </div>
      </Container>
    </ArcBandsBackground>
  );
}
