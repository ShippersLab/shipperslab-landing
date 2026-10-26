import type { ReactNode } from "react";

import { Container } from "@/components/ui/section/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function Section({ children, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-content border-x border-border py-16 sm:py-20 md:py-section",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
