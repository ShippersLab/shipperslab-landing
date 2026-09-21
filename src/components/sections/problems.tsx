"use client";

import { useState } from "react";

import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { CheckIcon } from "@/components/ui/icons";

export function Problems() {
  const { messages } = useI18n();
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  function toggle(index: number) {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  return (
    <section className="py-16 sm:py-24 md:py-section">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <Reveal className="max-w-lg">
          <h2 className="text-3xl sm:text-4xl">{messages.problems.title}</h2>
          <p className="mt-5 text-base text-muted sm:text-lg">{messages.problems.description}</p>
        </Reveal>

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
                    "flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors duration-200",
                    isChecked ? "border-ink" : "border-border hover:border-ink/30",
                  )}
                >
                  <span
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
      </div>
    </section>
  );
}
