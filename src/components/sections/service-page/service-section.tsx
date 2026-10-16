import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/animation/reveal";
import { cn } from "@/lib/utils";

type ServiceSectionProps = {
  title: string;
  children: ReactNode;
  label?: string;
  id?: string;
  delay?: number;
  className?: string;
};

export function ServiceSection({
  title,
  children,
  label,
  id,
  delay = 0,
  className,
}: ServiceSectionProps) {
  return (
    <Reveal
      delay={delay}
      className={cn("border-t border-border pt-10 first:border-t-0 first:pt-0", className)}
    >
      <div id={id} className="grid scroll-mt-28 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          {label ? (
            <p className="font-mono text-label uppercase tracking-label text-muted">{label}</p>
          ) : null}
          <h2 className={cn("text-2xl text-ink sm:text-3xl", label && "mt-4")}>{title}</h2>
        </div>
        <div className="max-w-2xl">{children}</div>
      </div>
    </Reveal>
  );
}
