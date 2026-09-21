"use client";

import { useState } from "react";

import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { PlusIcon } from "@/components/ui/icons";

export function Faq() {
  const { messages } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border py-16 sm:py-24 md:py-section">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">{messages.faq.title}</h2>
        </Reveal>

        <ul className="mt-12 divide-y divide-border border-t border-border">
          {messages.faq.items.map((item, index) => {
            const open = openIndex === index;

            return (
              <Reveal key={item.question} as="li" delay={index * 60}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-lg text-ink">{item.question}</span>
                  <PlusIcon
                    className={cn(
                      "size-4 shrink-0 text-muted transition-transform duration-200",
                      open && "rotate-45",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
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
      </div>
    </section>
  );
}
