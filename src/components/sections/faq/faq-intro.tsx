import { Reveal } from "@/components/ui/animation/reveal";
import { HelpIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section/section-heading";

const LABEL_DELAY = 0;
const TITLE_DELAY = 0.08;
const DESCRIPTION_DELAY = 160;

type FaqIntroProps = {
  label: string;
  title: string;
  description: string;
};

export function FaqIntro({ label, title, description }: FaqIntroProps) {
  return (
    <div>
      <Reveal delay={LABEL_DELAY}>
        <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-sans text-base tracking-[-0.03em] text-muted">
          <HelpIcon className="size-4 text-muted" />
          {label}
        </span>
      </Reveal>

      <SectionHeading title={title} titleDelay={TITLE_DELAY} className="mt-6" />

      <Reveal
        as="p"
        delay={DESCRIPTION_DELAY}
        className="mt-4 max-w-md text-base text-muted sm:text-lg"
      >
        {description}
      </Reveal>
    </div>
  );
}
