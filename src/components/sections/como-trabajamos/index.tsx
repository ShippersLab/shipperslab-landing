"use client";

import Link from "next/link";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";

const TITLE_DELAY = 0;
const LEAD_DELAY = 0.25;
const BODY_DELAY = 0.4;
const CTA_DELAY = 0.55;
const DETAIL_DELAY = 0.1;

export function ComoTrabajamos() {
  const { messages } = useI18n();
  const page = messages.comoTrabajamos;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-sm text-muted">{page.eyebrow}</p>
          <h1 className="mt-4 font-pixel text-4xl font-medium tracking-tighter text-ink sm:text-5xl">
            <DiaTextReveal
              text={page.h1}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
            />
          </h1>
          <WordReveal text={page.lead} delay={LEAD_DELAY} className="mt-5 text-lg text-muted" />
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 sm:gap-12">
          {page.steps.map((step, index) => (
            <Reveal key={step.title} delay={(BODY_DELAY + index * 0.08) * 1000}>
              <div className="max-w-2xl border-t border-border pt-8">
                <h2 className="text-2xl text-ink sm:text-3xl">{step.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{step.body}</p>
              </div>
            </Reveal>
          ))}

          <div className="max-w-2xl border-t border-border pt-8">
            <Reveal delay={DETAIL_DELAY * 1000}>
              <h2 className="text-2xl text-ink sm:text-3xl">{page.faq.title}</h2>
            </Reveal>
            <FaqAccordion items={page.faq.items} delay={DETAIL_DELAY} className="mt-6" />
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
