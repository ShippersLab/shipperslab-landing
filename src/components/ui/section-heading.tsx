import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
  titleDelay?: number;
  descriptionDelay?: number;
};

export function SectionHeading({
  title,
  description,
  className,
  descriptionClassName,
  titleDelay = 0,
  descriptionDelay = 0.08,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className="text-3xl tracking-tighter sm:text-4xl">
        <DiaTextReveal
          text={title}
          colors={["var(--accent)"]}
          textColor="var(--ink)"
          delay={titleDelay}
        />
      </h2>
      {description ? (
        <WordReveal
          text={description}
          delay={descriptionDelay}
          className={cn("mt-4 text-base text-muted sm:text-lg", descriptionClassName)}
        />
      ) : null}
    </div>
  );
}
