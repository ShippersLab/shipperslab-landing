import { serviceIcon } from "@/components/sections/service-page/service-icons";
import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { INLINE_LINK_CLASS, InlineText } from "@/components/ui/inline-text";
import { cn } from "@/lib/utils";

type ToolItem = {
  id: string;
  title: string;
  body: string;
};

type ServiceToolsProps = {
  items: readonly ToolItem[];
};

export function ServiceTools({ items }: ServiceToolsProps) {
  const hasOddTail = items.length % 2 === 1;

  return (
    <StaggerReveal as="ul" className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => {
        const Icon = serviceIcon(item.id);
        const isLast = index === items.length - 1;

        return (
          <li
            key={item.id}
            className={cn(
              "flex flex-col gap-3 rounded-lg border border-border p-5",
              hasOddTail && isLast && "sm:col-span-2",
            )}
          >
            <Icon size={20} className="text-muted" />
            <h3 className="font-sans text-base font-normal tracking-normal text-ink">
              {item.title}
            </h3>
            <p className="text-base leading-relaxed text-muted">
              <InlineText className={INLINE_LINK_CLASS} text={item.body} />
            </p>
          </li>
        );
      })}
    </StaggerReveal>
  );
}
