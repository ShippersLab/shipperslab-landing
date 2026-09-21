import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  title,
  description,
  className,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <h2 className="text-3xl tracking-tighter sm:text-4xl">{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-base text-muted sm:text-lg", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
