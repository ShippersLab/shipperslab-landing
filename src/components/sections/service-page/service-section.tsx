import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/animation/reveal";
import { cn } from "@/lib/utils";

type ServiceSectionProps = {
  title: string;
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function ServiceSection({ title, children, delay = 0, className }: ServiceSectionProps) {
  return (
    <Reveal
      delay={delay}
      className={cn("border-t border-border pt-10 first:border-t-0 first:pt-0", className)}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h2 className="text-2xl text-ink sm:text-3xl">{title}</h2>
        <div className="max-w-2xl">{children}</div>
      </div>
    </Reveal>
  );
}
