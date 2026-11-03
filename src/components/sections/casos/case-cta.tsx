"use client";

import { CaseArt } from "@/components/sections/casos/case-art";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";

export function CaseCta() {
  const { messages } = useI18n();
  const page = messages.casos;

  return (
    <section className="overflow-hidden border-t border-border pt-24 sm:pt-32">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="pb-2 font-heading text-4xl leading-tight tracking-heading text-ink sm:text-6xl">
            <DiaTextReveal text={page.ctaTitle} colors={["var(--accent)"]} textColor="var(--ink)" />
          </h2>
          <WordReveal
            text={page.ctaDescription}
            delay={0.1}
            className="mt-6 max-w-xl text-base text-muted sm:text-lg"
          />
          <BlurReveal
            delay={0.2}
            className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <TextureButton asChild variant="primary" size="square" className="w-full sm:w-auto">
              <LocalizedLink href="/empecemos">{page.ctaButton}</LocalizedLink>
            </TextureButton>
            <TextureButton asChild variant="secondary" size="square" className="w-full sm:w-auto">
              <LocalizedLink href="/casos">{page.ctaMore}</LocalizedLink>
            </TextureButton>
          </BlurReveal>
        </div>
      </Container>
      <BlurReveal delay={0.3} className="mt-12 sm:mt-16">
        <CaseArt />
      </BlurReveal>
    </section>
  );
}
