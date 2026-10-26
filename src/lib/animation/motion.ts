import type { Variants } from "motion/react";

export const BLUR_EASE = [0.23, 1, 0.32, 1] as const;

export const blurItem: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: BLUR_EASE },
  },
};

export function staggerGroup(delayChildren: number): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren } },
  };
}
