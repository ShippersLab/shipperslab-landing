"use client";

import { useI18n } from "@/i18n/provider";
import { Reveal } from "@/components/ui/reveal";

export function Process() {
  const { messages } = useI18n();

  return (
    <section className="py-16 sm:py-24 md:py-section">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">{messages.process.title}</h2>
        </Reveal>

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
      </div>
    </section>
  );
}
