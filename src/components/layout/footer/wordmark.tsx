"use client";

import { motion, useReducedMotion } from "motion/react";

export function Wordmark() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 1000 100"
      preserveAspectRatio="xMidYMin meet"
      initial={reduceMotion ? false : { opacity: 0, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="pointer-events-none mt-16 block h-auto w-full select-none overflow-hidden fill-ink/10 sm:mt-24"
    >
      <text
        x="0"
        y="152"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        className="font-heading text-[200px] font-medium tracking-heading"
      >
        ShippersLab
      </text>
    </motion.svg>
  );
}
