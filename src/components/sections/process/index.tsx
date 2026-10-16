"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Reveal } from "@/components/ui/animation/reveal";
import { ArcBandsBackground } from "@/components/ui/background/arc-bands-background";
import { Section } from "@/components/ui/section/section";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { StepNumber } from "@/components/ui/section/step-number";
import { useI18n } from "@/i18n/provider";

const TITLE_DELAY = 0;
const ITEMS_DELAY = 0.3;
const ITEM_STAGGER = 0.2;
const LINE_DURATION = 1.1;

export function Process() {
  const { messages } = useI18n();

  return (
    <Section className="relative isolate overflow-clip">
      <ArcBandsBackground
        aria-hidden
        className="absolute inset-0 -z-10 bg-transparent opacity-60 saturate-150 hue-rotate-30"
      />

      <SectionHeading title={messages.process.title} titleDelay={TITLE_DELAY} />

      <div className="relative mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: LINE_DURATION, delay: ITEMS_DELAY, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-5 right-[calc(25%-2.75rem)] left-5 hidden h-px origin-left bg-border lg:block"
        />

        {messages.process.steps.map((step, index) => (
          <Reveal
            key={step.title}
            delay={(ITEMS_DELAY + index * ITEM_STAGGER) * 1000}
            className="flex flex-col gap-4"
          >
            <StepNumber index={index} />
            <h3 className="text-xl">{step.title}</h3>
            <p className="max-w-xs text-base text-muted">{step.description}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={ITEMS_DELAY * 1000} className="mt-12">
        <Link
          href="/como-trabajamos"
          className="text-base font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {messages.process.link}
        </Link>
      </Reveal>
    </Section>
  );
}
