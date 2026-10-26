import { serviceIcon } from "@/components/sections/service-page/service-icons";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";

type AudienceItem = {
  id: string;
  title: string;
  body: string;
};

type ServiceAudienceProps = {
  intro: string;
  items: readonly AudienceItem[];
};

export function ServiceAudience({ intro, items }: ServiceAudienceProps) {
  return (
    <>
      <WordReveal text={intro} className="text-base leading-relaxed text-muted" />
      <StaggerReveal as="ul" className="mt-8 grid gap-3 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = serviceIcon(item.id);

          return (
            <li key={item.id} className="flex flex-col gap-3 rounded-lg border border-border p-5">
              <Icon size={20} className="text-muted" />
              <h3 className="font-sans text-base font-normal tracking-normal text-ink">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          );
        })}
      </StaggerReveal>
    </>
  );
}
