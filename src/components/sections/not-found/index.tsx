"use client";

import Image from "next/image";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { NOT_FOUND_BLUR_DATA_URL } from "@/lib/images/blur-data";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.3;
const CTA_DELAY = 0.55;

export function NotFoundContent() {
  const { messages } = useI18n();

  return (
    <section
      data-fullbleed
      className="relative -mx-4 -mt-4 flex min-h-svh flex-col overflow-hidden"
    >
      <Image
        src="/images/not-found.webp"
        alt=""
        fill
        preload
        fetchPriority="high"
        quality={90}
        placeholder="blur"
        blurDataURL={NOT_FOUND_BLUR_DATA_URL}
        sizes="100vw"
        className="animate-hero-image object-cover object-bottom select-none"
      />
      <Container className="relative flex flex-1 flex-col items-center justify-center pb-[18svh] text-center">
        <h1 className="font-heading text-8xl tracking-heading text-ink sm:text-9xl">
          <DiaTextReveal
            text={messages.notFound.title}
            colors={["var(--accent)"]}
            textColor="var(--ink)"
            delay={TITLE_DELAY}
          />
        </h1>
        <WordReveal
          text={messages.notFound.description}
          delay={DESCRIPTION_DELAY}
          className="mt-5 max-w-xs text-base text-muted sm:text-lg"
        />
        <Reveal delay={CTA_DELAY * 1000} className="mt-10 w-full sm:w-auto">
          <TextureButton asChild variant="primary" size="square" className="w-full sm:w-auto">
            <LocalizedLink href="/">{messages.notFound.cta}</LocalizedLink>
          </TextureButton>
        </Reveal>
      </Container>
    </section>
  );
}
