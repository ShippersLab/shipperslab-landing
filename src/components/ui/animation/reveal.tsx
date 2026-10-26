"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { useGSAP } from "@/lib/animation/gsap";
import { scrollReveal } from "@/lib/animation/scroll-reveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "div" | "li" | "p";
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      return scrollReveal({
        trigger: element,
        targets: element,
        from: { y: 16 },
        duration,
        delay: delay / 1000,
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
