"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { useGSAP } from "@/lib/animation/gsap";
import { staggerReveal } from "@/lib/animation/scroll-reveal";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "ul" | "ol";
};

export function StaggerReveal({ children, className, delay = 0, as = "div" }: StaggerRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || element.children.length === 0) return;
      return staggerReveal({
        trigger: element,
        targets: Array.from(element.children),
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
