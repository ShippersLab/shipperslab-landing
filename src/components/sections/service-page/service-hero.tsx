"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Container } from "@/components/ui/section/container";
import { cn } from "@/lib/utils";

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
  eyebrow?: string;
  eyebrowSlot?: ReactNode;
  title: string;
  lead: string;
  variant?: "service" | "article";
  children?: ReactNode;
};

export function ServiceHero({
  eyebrow,
  eyebrowSlot,
  title,
  lead,
  variant = "service",
  children,
}: ServiceHeroProps) {
  const isArticle = variant === "article";
  const Root = isArticle ? "header" : "div";

  return (
    <Root className={"relative isolate overflow-clip"}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-b-from-60% mask-b-to-100%"
      >
        <ServiceHeroDither />
      </div>

      <Container className="w-full py-20 sm:py-28">
        <div
          className={cn(
            isArticle ? "max-w-3xl" : "mx-auto flex max-w-3xl flex-col items-center text-center",
          )}
        >
          {eyebrowSlot ??
            (eyebrow ? (
              <Reveal
                as="p"
                delay={EYEBROW_DELAY}
                className="inline-flex rounded-md border border-border bg-paper px-3 py-1.5 font-mono text-sm tracking-tight text-muted"
              >
                {eyebrow}
              </Reveal>
            ) : null)}
          <h1
            className={cn(
              (eyebrow || eyebrowSlot) && "mt-6",
              "font-heading text-4xl leading-[1.12] text-balance tracking-heading text-ink sm:text-5xl",
            )}
          >
            <DiaTextReveal
              text={title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
              className="pb-[0.08em]"
            />
          </h1>
          <WordReveal
            text={lead}
            delay={LEAD_DELAY}
            className={cn(
              "mt-6 text-base text-muted sm:text-lg",
              isArticle ? "max-w-2xl" : "max-w-2xl text-balance",
            )}
          />
          {children}
        </div>
      </Container>
    </Root>
  );
}
