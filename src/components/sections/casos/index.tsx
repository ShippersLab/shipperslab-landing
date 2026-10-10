"use client";

import Link from "next/link";

import { ProjectCard } from "@/components/sections/casos/project-card";
import { SoonCard } from "@/components/sections/casos/soon-card";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import { eventopsImages } from "@/lib/projects/eventops";

const TITLE_DELAY = 0;
const LEAD_DELAY = 0.25;
const GRID_DELAY = 400;
const SOON_DELAY = 520;
const CTA_DELAY = 200;

export function Casos() {
  const { messages } = useI18n();
  const page = messages.casos;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
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

        <div className="mt-16 grid gap-x-6 gap-y-12 sm:mt-20 md:grid-cols-2 md:items-stretch">
          <Reveal delay={GRID_DELAY} className="h-full">
            <ProjectCard
              href="/casos/eventops"
              image={eventopsImages.hero}
              imageAlt={page.eventops.heroAlt}
              title={page.eventops.title}
              summary={page.eventops.summary}
              tags={page.eventops.tags}
            />
          </Reveal>
          <Reveal delay={SOON_DELAY} className="h-full">
            <SoonCard
              label={page.soon.label}
              title={page.soon.title}
              description={page.soon.description}
            />
          </Reveal>
        </div>

        <Reveal
          delay={CTA_DELAY}
          className="mx-auto mt-16 flex w-full max-w-2xl flex-col items-center gap-5 text-center sm:mt-20"
        >
          <h2 className="text-2xl text-ink sm:text-3xl">{page.ctaTitle}</h2>
          <p className="text-base text-muted sm:text-lg">{page.ctaDescription}</p>
          <TextureButton asChild variant="primary" size="pill" className="w-full sm:w-auto">
            <Link href="/empecemos">{page.ctaButton}</Link>
          </TextureButton>
        </Reveal>
      </Container>
    </div>
  );
}
