"use client";

import { OnboardingForm } from "@/components/sections/onboarding/form";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { ArcBandsBackground } from "@/components/ui/arc-bands-background";
import { Container } from "@/components/ui/container";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.3;
const FORM_DELAY = 0.5;
const ALTERNATIVE_DELAY = 0.65;

export function Onboarding() {
  const { messages } = useI18n();
  const copy = messages.onboarding;

  return (
    <ArcBandsBackground className="mx-auto flex min-h-svh w-full max-w-content flex-1 flex-col border-x border-border">
      <Container className="flex flex-1 flex-col items-center justify-center gap-10 py-16 lg:py-32">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-5xl sm:text-7xl">
            <DiaTextReveal
              text={copy.title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
            />
          </h1>
          <WordReveal
            text={copy.description}
            delay={DESCRIPTION_DELAY}
            className="max-w-md font-sans text-sm text-muted sm:text-base"
          />
        </div>

        <Reveal delay={FORM_DELAY * 1000} className="w-full max-w-xl">
          <OnboardingForm />
        </Reveal>

        <Reveal delay={ALTERNATIVE_DELAY * 1000}>
          <p className="rounded-full border border-border bg-paper/90 px-4 py-2 text-center text-sm text-ink/80 backdrop-blur-sm">
            {copy.alternative}{" "}
            <a
              href={`mailto:${site.emails.contact}`}
              className="font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink"
            >
              {site.emails.contact}
            </a>
          </p>
        </Reveal>
      </Container>
    </ArcBandsBackground>
  );
}
