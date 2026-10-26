import type { ReactNode } from "react";

import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { cn } from "@/lib/utils";

type StepCardProps = {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function StepParagraph({ children }: { children: string }) {
  return <WordReveal text={children} className="text-base leading-relaxed text-muted" />;
}

export function StepCard({ label, icon, children, className }: StepCardProps) {
  return (
    <BlurReveal className={cn("mt-8 rounded-lg border border-border", className)}>
      <p className="flex items-center gap-2 border-b border-border px-5 py-3 font-mono text-sm tracking-tight text-muted">
        {icon}
        {label}
      </p>
      {children}
    </BlurReveal>
  );
}
