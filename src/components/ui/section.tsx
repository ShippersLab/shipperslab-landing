import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  id?: string;
  bordered?: boolean;
  className?: string;
};

export function Section({ children, id, bordered = false, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24 md:py-section",
        bordered && "border-t border-border",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
