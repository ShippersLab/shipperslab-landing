"use client";

import Link from "next/link";

import { Companies } from "@/components/sections/trust/companies";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const TITLE_DELAY = 0;
const LEAD_DELAY = 0.25;
const EVENTOPS_DELAY = 0.4;
const CTA_DELAY = 0.55;

export function Casos() {
  const { messages } = useI18n();
  const page = messages.casos;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <div className="max-w-2xl">
          <h1 className="font-pixel text-4xl font-medium tracking-tighter text-ink sm:text-5xl">
            <DiaTextReveal
              text={page.title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
            />
          </h1>
          <WordReveal
            text={page.description}
            delay={LEAD_DELAY}
            className="mt-5 text-lg text-muted"
          />
        </div>

        <Reveal
          delay={EVENTOPS_DELAY * 1000}
          className="mt-16 max-w-2xl rounded-lg border border-border p-8 sm:mt-20 sm:p-10"
        >
          <p className="text-sm text-muted">{page.eventops.eyebrow}</p>
          <h2 className="mt-3 text-2xl text-ink sm:text-3xl">{page.eventops.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {page.eventops.body}
          </p>
          <a
            href={site.eventopsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-sm text-base text-ink underline decoration-accent underline-offset-4 transition-colors duration-200 ease-out hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {page.eventops.linkLabel}
            <span className="sr-only"> ({messages.common.opensNewTab})</span>
          </a>
        </Reveal>

        <div className="mt-16 sm:mt-20">
          <Reveal>
            <h2 className="text-2xl text-ink sm:text-3xl">{page.companiesHeading}</h2>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              {page.companiesDescription}
            </p>
          </Reveal>
          <div className="mt-6">
            <Companies delay={0.1} showTitle={false} />
          </div>
        </div>

        <Reveal
          delay={CTA_DELAY * 1000}
          className="mt-16 flex w-full max-w-2xl flex-col items-start gap-5 rounded-lg border border-border p-8 sm:mt-20 sm:p-10"
        >
          <h2 className="text-2xl text-ink">{page.ctaTitle}</h2>
          <p className="text-base text-muted">{page.ctaDescription}</p>
          <TextureButton asChild variant="primary" size="pill" className="w-full sm:w-auto">
            <Link href="/empecemos">{page.ctaButton}</Link>
          </TextureButton>
        </Reveal>
      </Container>
    </div>
  );
}
