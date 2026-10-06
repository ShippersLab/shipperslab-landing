"use client";

import { motion, useInView, useReducedMotion, type MotionProps, type Variants } from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type Ref,
} from "react";

type WordRevealProps = {
  text: string;
  as?: "p" | "div";
  className?: string;
  delay?: number;
};

const EASE = [0.23, 1, 0.32, 1] as const;
const MAX_ANIMATED_WORDS = 12;

const word: Variants = {
  hidden: { opacity: 0, transform: "translateY(16px)" },
  visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.35, ease: EASE } },
};

const block: Variants = {
  hidden: { opacity: 0, transform: "translateY(8px)" },
  visible: { opacity: 1, transform: "translateY(0px)" },
};

export function WordReveal({ text, as = "p", className, delay = 0 }: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const reduced = hydrated && prefersReducedMotion;
  const words = useMemo(() => text.split(" ").filter(Boolean), [text]);
  const container = useMemo<Variants>(
    () => ({
      hidden: {},
      visible: { transition: { staggerChildren: 0.02, delayChildren: delay } },
    }),
    [delay],
  );
  const MotionTag = useMemo(
    () =>
      motion.create(as) as ComponentType<
        MotionProps & { children?: ReactNode; className?: string; ref?: Ref<HTMLElement> }
      >,
    [as],
  );

  if (reduced) {
    const StaticTag = as;
    return (
      <StaticTag ref={ref as never} className={className}>
        {text}
      </StaticTag>
    );
  }

  if (words.length > MAX_ANIMATED_WORDS) {
    return (
      <MotionTag
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={block}
        transition={{ duration: 0.35, delay, ease: EASE }}
      >
        {text}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={container}
    >
      {words.map((entry, index) => (
        <motion.span key={`${entry}-${index}`} variants={word} className="inline-block">
          {entry}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
