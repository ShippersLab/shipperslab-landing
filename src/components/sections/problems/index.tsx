"use client";

import { useRef, useState } from "react";

import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { gsap } from "@/lib/gsap";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.55;
const ITEMS_DELAY = 0.95;
const ITEM_STAGGER = 0.045;
const CTA_DELAY = 1.6;

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
        className="max-w-xl"
        titleDelay={TITLE_DELAY}
        descriptionDelay={DESCRIPTION_DELAY}
      />

      <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2">
        {messages.problems.items.map((item, index) => {
          const isChecked = Boolean(checked[index]);

          return (
            <Reveal key={item} as="li" delay={(ITEMS_DELAY + index * ITEM_STAGGER) * 1000}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggle(index)}
                className={cn(
                  "group flex h-full w-full items-center gap-4 rounded-lg border p-4 text-left transition duration-300 active:scale-[0.98]",
                  isChecked
                    ? "border-ink/20 bg-white"
                    : "border-border hover:border-ink/10 hover:bg-white/40 ",
                )}
              >
                <span
                  ref={(node) => {
                    checkRefs.current[index] = node;
                  }}
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200",
                    isChecked
                      ? "border-accent bg-accent text-paper"
                      : "border-border text-transparent group-hover:border-ink/40",
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

      <div className="mt-12 flex flex-col items-start gap-x-2 gap-y-3 sm:flex-row sm:flex-wrap sm:items-baseline">
        <WordReveal
          text={messages.problems.ctaTitle}
          delay={CTA_DELAY}
          className="text-base text-muted sm:text-lg"
        />
        <Reveal delay={(CTA_DELAY + 0.1) * 1000}>
          <a
            href={`mailto:${site.emails.contact}`}
            className="text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent sm:text-lg"
          >
            {messages.problems.ctaLink}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
