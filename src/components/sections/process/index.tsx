"use client";

import { motion } from "motion/react";

import { Reveal } from "@/components/ui/animation/reveal";
import { Section } from "@/components/ui/section/section";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";

const TITLE_DELAY = 0;
const ITEMS_DELAY = 0.3;
const ITEM_STAGGER = 0.2;
const LINE_DURATION = 1.1;

export function Process() {
  const { messages } = useI18n();

  return (
    <Section>
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
            <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-border bg-paper font-mono text-xs text-muted">
              0{index + 1}
            </span>
            <h3 className="text-xl">{step.title}</h3>
            <p className="max-w-xs text-base text-muted">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
