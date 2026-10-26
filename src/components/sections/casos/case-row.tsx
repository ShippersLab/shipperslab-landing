import type { ReactNode } from "react";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";

type CaseRowProps = {
  title: string;
  children: ReactNode;
};

export function CaseRow({ title, children }: CaseRowProps) {
  return (
    <BlurReveal className="mt-16 sm:mt-24">
      <div className="grid gap-6 border-t border-border pt-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h2 className="text-2xl sm:text-3xl">
          <DiaTextReveal text={title} colors={["var(--accent)"]} textColor="var(--ink)" />
        </h2>
        <div className="max-w-2xl">{children}</div>
      </div>
    </BlurReveal>
  );
}
