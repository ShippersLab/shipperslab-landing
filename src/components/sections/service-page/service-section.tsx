import type { ReactNode } from "react";

import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Container } from "@/components/ui/section/container";

type ServiceSectionProps = {
  title: string;
  children: ReactNode;
  label?: string;
  id?: string;
};

export function ServiceSection({ title, children, label, id }: ServiceSectionProps) {
  return (
    <Container className="w-full border-t border-border py-16 sm:py-20">
      <div id={id} className="grid scroll-mt-28 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          {label ? (
            <BlurReveal className="mb-4">
              <span className="inline-flex rounded-md border border-border px-3 py-1.5 font-mono text-sm tracking-tight text-muted">
                {label}
              </span>
            </BlurReveal>
          ) : null}
          <h2 className="font-heading text-2xl tracking-heading text-ink sm:text-3xl">
            <DiaTextReveal
              text={title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={0}
            />
          </h2>
        </div>
        <div className="max-w-2xl">{children}</div>
      </div>
    </Container>
  );
}
