"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/animation/reveal";

type Step = {
  title: string;
  body: string;
};

type ServiceStepsProps = {
  steps: readonly Step[];
  pricing: {
    label: string;
    body: string;
  };
  link: ReactNode;
};

const STEPS_DELAY = 0.2;
const STEP_STAGGER = 0.12;
const LINE_DURATION = 0.8;

export function ServiceSteps({ steps, pricing, link }: ServiceStepsProps) {
  return (
    <>
      <ol className="flex flex-col">
        {steps.map((step, index) => (
          <Reveal
            key={step.title}
            as="li"
            delay={(STEPS_DELAY + index * STEP_STAGGER) * 1000}
            className="relative flex gap-5 pb-8 last:pb-0"
          >
            {index < steps.length - 1 ? (
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{
                  duration: LINE_DURATION,
                  delay: STEPS_DELAY + index * STEP_STAGGER,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="absolute top-10 bottom-0 left-5 w-px origin-top bg-border"
              />
            ) : null}
            <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-paper font-mono text-xs text-muted">
              0{index + 1}
            </span>
            <div className="pt-2">
              <h3 className="text-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={(STEPS_DELAY + steps.length * STEP_STAGGER) * 1000}>{link}</Reveal>

      <Reveal
        delay={(STEPS_DELAY + steps.length * STEP_STAGGER) * 1000}
        className="mt-10 rounded-lg border border-border p-6"
      >
        <p className="font-mono text-label uppercase tracking-label text-muted">{pricing.label}</p>
        <p className="mt-3 text-base leading-relaxed text-ink">{pricing.body}</p>
      </Reveal>
    </>
  );
}
