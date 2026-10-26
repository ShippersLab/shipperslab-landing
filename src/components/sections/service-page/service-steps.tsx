"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { StepNumber } from "@/components/ui/section/step-number";

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

const STEP_STAGGER = 0.12;
const LINE_DURATION = 0.8;

export function ServiceSteps({ steps, pricing, link }: ServiceStepsProps) {
  return (
    <>
      <StaggerReveal as="ol" className="flex flex-col">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
            {index < steps.length - 1 ? (
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{
                  duration: LINE_DURATION,
                  delay: index * STEP_STAGGER,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="absolute top-10 bottom-0 left-5 w-px origin-top bg-border"
              />
            ) : null}
            <StepNumber index={index} />
            <div className="pt-2">
              <h3 className="text-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </StaggerReveal>

      <BlurReveal>{link}</BlurReveal>

      <BlurReveal className="mt-10 rounded-lg border border-border p-6">
        <p className="font-mono text-sm tracking-tight text-muted">{pricing.label}</p>
        <p className="mt-3 text-base leading-relaxed text-ink">{pricing.body}</p>
      </BlurReveal>
    </>
  );
}
