"use client";

import Link from "next/link";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { ArcBandsBackground } from "@/components/ui/arc-bands-background";
import { Container } from "@/components/ui/container";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.3;
const CTA_DELAY = 0.55;

export default function NotFound() {
  const { messages } = useI18n();

  return (
    <ArcBandsBackground className="mx-auto flex min-h-svh w-full max-w-content flex-1 flex-col border-x border-border">
      <Container className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-8xl sm:text-9xl">
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
          className="max-w-md font-sans text-sm text-muted sm:text-base"
        />
        <Reveal delay={CTA_DELAY * 1000}>
          <TextureButton
            asChild
            variant="primary"
            size="pill"
            className="w-full rounded-full sm:w-auto"
          >
            <Link href="/" className="text-sm sm:text-base">
              {messages.notFound.cta}
            </Link>
          </TextureButton>
        </Reveal>
      </Container>
    </ArcBandsBackground>
  );
}
