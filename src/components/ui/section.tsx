import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  id?: string;
  bordered?: boolean;
  className?: string;
};

export function Section({ children, id, bordered = true, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-content border-x border-border py-20 sm:py-28 md:py-section",
        bordered && "border-t",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
