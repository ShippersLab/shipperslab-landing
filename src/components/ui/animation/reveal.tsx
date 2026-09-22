"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "p";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const reduced = hydrated && prefersReducedMotion;
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={reduced || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
