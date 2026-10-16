"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

type CaseItem = {
  title: string;
  body: string;
};

type ServiceCasesProps = {
  items: readonly CaseItem[];
  tabsLabel: string;
};

const INDICATOR_SPRING = { type: "spring", duration: 0.3, bounce: 0 } as const;
const INSTANT = { duration: 0 } as const;

function nextIndex(key: string, current: number, count: number) {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

export function ServiceCases({ items, tabsLabel }: ServiceCasesProps) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = nextIndex(event.key, selected, items.length);

    if (target === null) {
      return;
    }

    event.preventDefault();
    setSelected(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={tabsLabel}
        onKeyDown={handleKeyDown}
        className="flex flex-wrap gap-2"
      >
        {items.map((item, index) => {
          const isSelected = index === selected;

          return (
            <button
              key={item.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(index)}
              className={cn(
                "relative isolate rounded-full border border-border px-4 py-2 text-sm transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                isSelected ? "text-paper" : "text-muted hover:text-ink",
              )}
            >
              {isSelected ? (
                <motion.span
                  aria-hidden
                  layoutId={`${baseId}-indicator`}
                  transition={prefersReducedMotion ? INSTANT : INDICATOR_SPRING}
                  className="absolute -inset-px -z-10 rounded-full bg-ink"
                />
              ) : null}
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid">
        {items.map((item, index) => {
          const isSelected = index === selected;

          return (
            <div
              key={item.title}
              id={`${baseId}-panel-${index}`}
              role={isSelected ? "tabpanel" : undefined}
              aria-labelledby={isSelected ? `${baseId}-tab-${index}` : undefined}
              aria-hidden={!isSelected}
              inert={!isSelected}
              className={cn(
                "col-start-1 row-start-1 transition-[opacity,filter,transform] duration-200 ease-out",
                isSelected
                  ? "translate-y-0 opacity-100 blur-0"
                  : "pointer-events-none translate-y-1 opacity-0 blur-xs",
              )}
            >
              <h3 className="font-sans text-lg font-normal tracking-normal text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted sm:text-lg">{item.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
