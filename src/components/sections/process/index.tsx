"use client";

import { Reveal } from "@/components/ui/animation/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";

export function Process() {
  const { messages } = useI18n();

  return (
    <Section>
      <SectionHeading title={messages.process.title} />

      <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div aria-hidden className="absolute inset-x-0 top-5 hidden h-px bg-border lg:block" />

        {messages.process.steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 100} className="flex flex-col gap-4">
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
