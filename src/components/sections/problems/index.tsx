"use client";

import { useRef, useState } from "react";

import { CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Problems() {
  const { messages } = useI18n();
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const checkRefs = useRef<Record<number, HTMLSpanElement | null>>({});

  function toggle(index: number) {
    const isChecking = !checked[index];

    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));

    if (!isChecking) {
      return;
    }

    const node = checkRefs.current[index];

    if (node && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(node, { scale: 0.5 }, { scale: 1, duration: 0.4, ease: "back.out(2.5)" });
    }
  }

  return (
    <Section>
      <SectionHeading
        title={messages.problems.title}
        description={messages.problems.description}
        className="max-w-lg"
      />

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {messages.problems.items.map((item, index) => {
          const isChecked = Boolean(checked[index]);

          return (
            <Reveal key={item} as="li" delay={index * 60}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggle(index)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-lg border p-4 text-left transition duration-200 active:scale-95",
                  isChecked ? "border-ink" : "border-border hover:border-ink/30",
                )}
              >
                <span
                  ref={(node) => {
                    checkRefs.current[index] = node;
                  }}
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200",
                    isChecked ? "border-ink bg-ink text-paper" : "border-border text-transparent",
                  )}
                >
                  <CheckIcon className="size-3.5" strokeWidth={2.5} />
                </span>
                <span
                  className={cn(
                    "text-base sm:text-lg",
                    isChecked ? "text-muted line-through decoration-muted" : "text-ink",
                  )}
                >
                  {item}
                </span>
              </button>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-12 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <p className="text-lg text-ink">{messages.problems.ctaTitle}</p>
        <a
          href="#contacto"
          className="text-lg text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
        >
          {messages.problems.ctaLink}
        </a>
      </Reveal>
    </Section>
  );
}
