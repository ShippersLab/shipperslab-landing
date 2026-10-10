"use client";

import { useId, useState } from "react";

import { Reveal } from "@/components/ui/animation/reveal";
import { PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  delay?: number;
  stagger?: number;
  defaultOpenIndex?: number | null;
  className?: string;
};

export function FaqAccordion({
  items,
  delay = 0,
  stagger = 0.08,
  defaultOpenIndex = 0,
  className,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const idPrefix = useId();

  return (
    <ul className={cn("divide-y divide-border border-t border-border", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${idPrefix}-question-${index}`;
        const panelId = `${idPrefix}-answer-${index}`;

        return (
          <Reveal key={item.question} as="li" delay={(delay + index * stagger) * 1000}>
            <h3 className="font-sans font-normal tracking-normal">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="text-lg text-ink">{item.question}</span>
                <PlusIcon
                  className={cn(
                    "size-4 shrink-0 text-muted transition-transform duration-200 ease-out",
                    open && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-base text-muted">{item.answer}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
