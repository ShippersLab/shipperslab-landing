import { Reveal } from "@/components/ui/animation/reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { ConversationIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type FaqHelpProps = {
  title: string;
  description: string;
  cta: string;
  delay?: number;
  className?: string;
};

export function FaqHelp({ title, description, cta, delay = 0, className }: FaqHelpProps) {
  return (
    <Reveal
      delay={delay}
      className={cn("flex flex-col gap-6 rounded-lg border border-border p-6", className)}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-paper">
          <ConversationIcon className="size-5" />
        </span>
        <div>
          <p className="text-lg text-ink">{title}</p>
          <p className="mt-1 text-base text-muted">{description}</p>
        </div>
      </div>

      <TextureButton asChild variant="secondary" size="square" className="w-full">
        <a href={site.calUrl} target="_blank" rel="noopener noreferrer">
          {cta}
        </a>
      </TextureButton>
    </Reveal>
  );
}
