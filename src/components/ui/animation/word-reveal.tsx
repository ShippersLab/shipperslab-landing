"use client";

import { Fragment, useMemo, useRef } from "react";

import { useGSAP } from "@/lib/animation/gsap";
import { scrollReveal } from "@/lib/animation/scroll-reveal";

type WordRevealProps = {
  text: string;
  as?: "p" | "div";
  className?: string;
  delay?: number;
};

const WORD_STAGGER = 0.04;
const MAX_STAGGER_TOTAL = 0.9;

export function WordReveal({ text, as = "p", className, delay = 0 }: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => text.split(" ").filter(Boolean), [text]);
  const stagger = Math.min(WORD_STAGGER, MAX_STAGGER_TOTAL / words.length);
  const Tag = as;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      return scrollReveal({
        trigger: element,
        targets: element.querySelectorAll("[data-word]"),
        from: { y: 16 },
        duration: 0.7,
        delay,
        stagger,
      });
    },
    { scope: ref, dependencies: [text, stagger, delay] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((entry, index) => (
        <Fragment key={`${entry}-${index}`}>
          <span data-word className="inline-block">
            {entry}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
