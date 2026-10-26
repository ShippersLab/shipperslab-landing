import { BlurReveal } from "@/components/ui/animation/blur-reveal";

type CaseListProps = {
  items: readonly string[];
};

export function CaseList({ items }: CaseListProps) {
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <BlurReveal
          as="li"
          key={item}
          delay={index * 0.08}
          className="border-t border-border py-3.5 text-base text-ink"
        >
          {item}
        </BlurReveal>
      ))}
    </ul>
  );
}
