import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { AwardIcon, BuildingIcon, PlugIcon, TeamIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type PartnerWay = {
  title: string;
  description: string;
};

type PartnerWaysProps = {
  items: PartnerWay[];
  className?: string;
  delay?: number;
};

const ICONS = [BuildingIcon, PlugIcon, AwardIcon, TeamIcon];

export function PartnerWays({ items, className, delay = 0 }: PartnerWaysProps) {
  return (
    <StaggerReveal
      as="ul"
      delay={delay}
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
    >
      {items.map((item, index) => {
        const Icon = ICONS[index % ICONS.length];

        return (
          <li key={item.title} className="flex flex-col rounded-lg border border-muted/25 p-6">
            <span className="flex size-10 items-center justify-center rounded-md border border-border">
              <Icon size={20} className="text-ink" />
            </span>
            <h3 className="mt-6 text-lg text-ink">{item.title}</h3>
            <p className="mt-2 text-base text-muted">{item.description}</p>
          </li>
        );
      })}
    </StaggerReveal>
  );
}
