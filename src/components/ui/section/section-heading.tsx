import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  titleDelay?: number;
  descriptionDelay?: number;
};

export function SectionHeading({
  title,
  description,
  className,
  descriptionClassName,
  titleClassName,
  titleDelay = 0,
  descriptionDelay = 0.08,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className={cn("text-3xl sm:text-4xl", titleClassName)}>
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
