import { INLINE_LINK_CLASS, InlineText } from "@/components/ui/inline-text";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { serviceIcon } from "@/components/sections/service-page/service-icons";
import { LocalizedLink } from "@/i18n/link";

type CoverItem = {
  id: string;
  label: string;
  href?: string;
};

const CHIP_CLASS =
  "inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-sm tracking-tight text-muted";

type ServiceCoversProps = {
  body: string;
  items: readonly CoverItem[];
};

export function ServiceCovers({ body, items }: ServiceCoversProps) {
  return (
    <>
      <BlurReveal>
        <p className="text-base leading-relaxed text-muted">
          <InlineText className={INLINE_LINK_CLASS} text={body} />
        </p>
      </BlurReveal>
      <StaggerReveal as="ul" className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => {
          const Icon = serviceIcon(item.id);
          const content = (
            <>
              <Icon size={14} className="shrink-0" />
              {item.label}
            </>
          );

          if (!item.href) {
            return (
              <li key={item.id} className={CHIP_CLASS}>
                {content}
              </li>
            );
          }

          return (
            <li key={item.id}>
              <LocalizedLink
                href={item.href}
                className={`${CHIP_CLASS} underline decoration-accent underline-offset-4 transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`}
              >
                {content}
              </LocalizedLink>
            </li>
          );
        })}
      </StaggerReveal>
    </>
  );
}
