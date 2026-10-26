"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { CaseBack } from "@/components/sections/casos/case-back";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { blurItem, staggerGroup } from "@/lib/animation/motion";

type Fact = {
  label: string;
  value: string;
};

type CaseHeaderProps = {
  backLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  facts: readonly Fact[];
  factsLabel: string;
  children?: ReactNode;
};

const group = staggerGroup(0.05);

export function CaseHeader({
  backLabel,
  eyebrow,
  title,
  lead,
  facts,
  factsLabel,
  children,
}: CaseHeaderProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.header
      variants={group}
      initial={reducedMotion ? "visible" : "hidden"}
      animate="visible"
    >
      <motion.div variants={blurItem}>
        <CaseBack label={backLabel} />
      </motion.div>

      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <motion.p variants={blurItem} className="text-sm text-muted">
            {eyebrow}
          </motion.p>
          <h1 className="mt-4 font-heading text-5xl tracking-heading text-ink sm:text-6xl">
            <DiaTextReveal
              text={title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={0}
            />
          </h1>
          <WordReveal text={lead} delay={0.25} className="mt-5 text-base text-muted sm:text-lg" />
        </div>
        {children ? <motion.div variants={blurItem}>{children}</motion.div> : null}
      </div>

      <motion.dl
        variants={blurItem}
        aria-label={factsLabel}
        className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 lg:grid-cols-4"
      >
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-sm text-muted">{fact.label}</dt>
            <dd className="mt-1.5 text-base text-ink">{fact.value}</dd>
          </div>
        ))}
      </motion.dl>
    </motion.header>
  );
}
