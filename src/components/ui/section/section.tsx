import type { ReactNode } from "react";

import { Container } from "@/components/ui/section/container";
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
        "mx-auto w-full max-w-content border-x border-border py-16 sm:py-20 md:py-section",
        bordered && "border-t",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
