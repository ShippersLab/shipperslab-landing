"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { TagTabs } from "@/components/sections/casos/tag-tabs";
import { BLUR_EASE } from "@/lib/animation/motion";

type CaseImageProps = {
  children: ReactNode;
  tags?: readonly string[];
  delay?: number;
  className?: string;
};

export function CaseImage({ children, tags, delay = 0, className }: CaseImageProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay, ease: BLUR_EASE }}
      className={className}
    >
      {tags ? <TagTabs tags={tags} className="justify-start pl-6" /> : null}
      {children}
    </motion.div>
  );
}
