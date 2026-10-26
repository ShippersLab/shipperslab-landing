import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { LocalizedLink } from "@/i18n/link";
import { cn } from "@/lib/utils";

type ServiceCtaProps = {
  title: string;
  description: string;
  button: string;
  className?: string;
};

export function ServiceCta({ title, description, button, className }: ServiceCtaProps) {
  return (
    <BlurReveal
      className={cn(
        "mt-16 flex w-full flex-col items-start gap-5 rounded-lg border border-border p-8 sm:mt-20 sm:p-10",
        className,
      )}
    >
      <h2 className="text-2xl text-ink">
        <DiaTextReveal text={title} colors={["var(--accent)"]} textColor="var(--ink)" delay={0} />
      </h2>
      <WordReveal text={description} className="max-w-2xl text-base text-muted" />
      <TextureButton asChild variant="primary" size="pill" className="w-full sm:w-auto">
        <LocalizedLink href="/empecemos">{button}</LocalizedLink>
      </TextureButton>
    </BlurReveal>
  );
}
