"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "div" | "li" | "p";
};

const HIDDEN = { opacity: 0, transform: "translateY(16px)" };
const VISIBLE = { opacity: 1, transform: "translateY(0px)" };

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.4,
  as = "div",
}: RevealProps) {
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
      initial={HIDDEN}
      animate={reduced || isInView ? VISIBLE : HIDDEN}
      transition={{ duration, delay: delay / 1000, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </MotionTag>
  );
}
