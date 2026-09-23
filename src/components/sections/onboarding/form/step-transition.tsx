"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

type StepTransitionProps = {
  step: number;
  direction: number;
  children: ReactNode;
};

const OFFSET = 24;

const variants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * OFFSET }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -OFFSET }),
};

export function StepTransition({ step, direction, children }: StepTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  function focusFirstField(definition: unknown) {
    if (definition !== "center" || direction === 0) {
      return;
    }

    ref.current?.querySelector<HTMLElement>("input, textarea")?.focus({ preventScroll: true });
  }

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={step}
        ref={ref}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={focusFirstField}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
