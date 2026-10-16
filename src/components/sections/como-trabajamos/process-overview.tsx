"use client";

import { motion, useReducedMotion } from "motion/react";

import { Reveal } from "@/components/ui/animation/reveal";
import { StepNumber } from "@/components/ui/section/step-number";

type OverviewStep = {
  id: string;
  short: string;
  summary: string;
};

type ProcessOverviewProps = {
  label: string;
  steps: readonly OverviewStep[];
};

const ITEMS_DELAY = 0.3;
const ITEM_STAGGER = 0.08;
const LINE_DURATION = 1.1;

export function ProcessOverview({ label, steps }: ProcessOverviewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav aria-label={label} className="border-b border-border pb-16 sm:pb-20">
      <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{
            duration: prefersReducedMotion ? 0 : LINE_DURATION,
            delay: prefersReducedMotion ? 0 : ITEMS_DELAY,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="absolute top-5 right-[calc(25%-2.75rem)] left-5 hidden h-px origin-left bg-border lg:block"
        />

        {steps.map((step, index) => (
          <Reveal key={step.id} as="li" delay={(ITEMS_DELAY + index * ITEM_STAGGER) * 1000}>
            <a
              href={`#${step.id}`}
              className="group flex gap-4 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:flex-col"
            >
              <StepNumber
                index={index}
                className="transition-colors duration-200 ease-out group-hover:border-ink/30 group-hover:text-ink"
              />
              <span className="flex flex-col gap-1.5 pt-2 lg:pt-0">
                <span className="text-lg text-ink underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-out group-hover:decoration-ink/30">
                  {step.short}
                </span>
                <span className="hidden max-w-xs text-base text-muted sm:block">
                  {step.summary}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </ol>
    </nav>
  );
}
