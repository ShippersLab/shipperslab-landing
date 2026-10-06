"use client";

import Link from "next/link";

import { Companies } from "@/components/sections/trust/companies";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { ArcBandsBackground } from "@/components/ui/background/arc-bands-background";
import { Container } from "@/components/ui/section/container";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.15;
const COMPANIES_DELAY = 0;
const CTA_DELAY = 0;
const LINK_DELAY = 80;

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

        <Reveal delay={120} className="mt-6">
          <Link
            href="/casos"
            className="rounded-sm text-sm text-muted underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-ink hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-base"
          >
            {messages.trust.casosLink}
          </Link>
        </Reveal>

        <div className="mt-16 flex flex-col items-start gap-x-2 gap-y-3 sm:mt-20 sm:flex-row sm:flex-wrap sm:items-baseline">
          <WordReveal
            text={messages.trust.ctaTitle}
            delay={CTA_DELAY}
            className="text-base text-ink sm:text-lg"
          />
          <Reveal delay={LINK_DELAY}>
            <a
              href={`mailto:${site.emails.contact}`}
              className="text-base text-ink underline decoration-accent underline-offset-4 rounded-sm transition-colors duration-200 ease-out hover:decoration-ink sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {messages.trust.ctaButton}
            </a>
          </Reveal>
        </div>
      </Container>
    </ArcBandsBackground>
  );
}
