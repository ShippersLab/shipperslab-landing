import Link from "next/link";

import { Reveal } from "@/components/ui/animation/reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { ArrowRightIcon, ConversationIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const CONTACT_HREF = "/#contacto";

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
      className={cn(
        "flex flex-col gap-6 rounded-lg border border-dashed border-border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ink text-paper">
          <ConversationIcon className="size-5" />
        </span>
        <div>
          <p className="text-lg text-ink">{title}</p>
          <p className="mt-1 text-base text-muted">{description}</p>
        </div>
      </div>

      <TextureButton asChild variant="secondary" size="pill" className="w-full sm:w-auto">
        <Link href={CONTACT_HREF}>
          {cta}
          <ArrowRightIcon className="size-4" />
        </Link>
      </TextureButton>
    </Reveal>
  );
}
