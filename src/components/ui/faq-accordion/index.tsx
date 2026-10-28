"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

import { PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
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
  const reduce = useReducedMotion();

  return (
    <ul className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${idPrefix}-question-${index}`;
        const panelId = `${idPrefix}-answer-${index}`;

        return (
          <motion.li
            key={item.question}
            initial={
              reduce
                ? false
                : {
                    opacity: 0,
                    transform: "translateY(12px)",
                    filter: "blur(4px)",
                  }
            }
            whileInView={{
              opacity: 1,
              transform: "translateY(0px)",
              filter: "blur(0px)",
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: EASE,
              delay: delay + index * stagger,
            }}
          >
            <h3 className="font-sans font-normal tracking-normal">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span
                  className={cn(
                    "text-base tracking-[-0.02em] transition-colors duration-200 ease-out group-hover:text-ink sm:text-lg",
                    open ? "text-ink" : "text-ink/80",
                  )}
                >
                  {item.question}
                </span>
                <PlusIcon
                  className={cn(
                    "size-4 shrink-0 text-muted transition-transform duration-300 ease-out",
                    open && "rotate-45 text-ink",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-base text-muted">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
