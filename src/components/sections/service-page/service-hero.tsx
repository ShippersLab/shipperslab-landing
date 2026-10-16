"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

import { Reveal } from "@/components/ui/animation/reveal";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Container } from "@/components/ui/section/container";

const EYEBROW_DELAY = 0;
const TITLE_DELAY = 0;
const LEAD_DELAY = 0.25;

const ServiceHeroDither = dynamic(
  () =>
    import("@/components/sections/service-page/service-hero-dither").then(
      (module) => module.ServiceHeroDither,
    ),
  { ssr: false },
);

type ServiceHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  ditherBelowNavbar?: boolean;
};

export function ServiceHero({ eyebrow, title, lead, ditherBelowNavbar = false }: ServiceHeroProps) {
  return (
    <div className="relative isolate overflow-clip border-b border-border">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 mask-b-from-60% mask-b-to-100%",
          ditherBelowNavbar && "lg:top-22.5",
        )}
      >
        <ServiceHeroDither />
      </div>

      <Container className="w-full py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <Reveal
            as="p"
            delay={EYEBROW_DELAY}
            className="inline-flex rounded-md border border-border bg-paper px-3 py-1.5 font-mono text-sm tracking-tight text-muted"
          >
            {eyebrow}
          </Reveal>
          <h1 className="mt-6 font-pixel text-4xl text-balance font-medium tracking-tighter text-ink sm:text-5xl lg:text-6xl">
            <DiaTextReveal
              text={title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
            />
          </h1>
          <WordReveal text={lead} delay={LEAD_DELAY} className="mt-6 max-w-xl text-lg text-muted" />
        </div>
      </Container>
    </div>
  );
}
