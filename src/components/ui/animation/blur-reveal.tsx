"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { useGSAP } from "@/lib/animation/gsap";
import { scrollReveal } from "@/lib/animation/scroll-reveal";

type BlurRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

export function BlurReveal({ children, className, delay = 0, as = "div" }: BlurRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      return scrollReveal({
        trigger: element,
        targets: element,
        from: { filter: "blur(8px)" },
        duration: 0.6,
        delay,
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
