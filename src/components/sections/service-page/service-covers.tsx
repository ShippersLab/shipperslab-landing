import { InlineText } from "@/components/sections/service-page/inline-text";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { serviceIcon } from "@/components/sections/service-page/service-icons";

type CoverItem = {
  id: string;
  label: string;
};

type ServiceCoversProps = {
  body: string;
  items: readonly CoverItem[];
};

export function ServiceCovers({ body, items }: ServiceCoversProps) {
  return (
    <>
      <BlurReveal>
        <p className="text-base leading-relaxed text-muted">
          <InlineText text={body} />
        </p>
      </BlurReveal>
      <StaggerReveal as="ul" className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => {
          const Icon = serviceIcon(item.id);

          return (
            <li
              key={item.id}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-sm tracking-tight text-muted"
            >
              <Icon size={14} className="shrink-0" />
              {item.label}
            </li>
          );
        })}
      </StaggerReveal>
    </>
  );
}
