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

const word: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
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
  const words = useMemo(() => text.split(" "), [text]);
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
