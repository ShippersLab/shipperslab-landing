import { Reveal } from "@/components/ui/animation/reveal";
import { HelpIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { site } from "@/lib/site";

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
        <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-sm tracking-tight text-muted">
          <HelpIcon className="size-3.5 text-muted" />
          {label}
        </span>
      </Reveal>

      <SectionHeading title={title} titleDelay={TITLE_DELAY} className="mt-6" />

      <Reveal
        as="p"
        delay={DESCRIPTION_DELAY}
        className="mt-4 max-w-2xl text-base text-muted sm:text-lg"
      >
        {description}{" "}
        <a
          href={`mailto:${site.emails.contact}`}
          className="rounded-sm text-ink underline decoration-accent underline-offset-4 transition-colors duration-200 ease-out hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {site.emails.contact}
        </a>
        .
      </Reveal>
    </div>
  );
}
