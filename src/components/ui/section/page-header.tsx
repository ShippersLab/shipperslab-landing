import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mx-auto flex max-w-2xl flex-col items-center text-center", className)}>
      <h1 className="font-heading text-4xl tracking-heading text-ink sm:text-5xl">
        <DiaTextReveal text={title} colors={["var(--accent)"]} textColor="var(--ink)" delay={0} />
      </h1>
      <WordReveal
        text={description}
        delay={0.25}
        className="mt-5 text-base text-muted sm:text-lg"
      />
    </div>
  );
}
