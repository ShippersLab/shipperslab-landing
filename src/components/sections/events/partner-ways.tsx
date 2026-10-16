import { Reveal } from "@/components/ui/animation/reveal";
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

const ITEM_STAGGER = 0.12;

const ICONS = [BuildingIcon, PlugIcon, AwardIcon, TeamIcon];

export function PartnerWays({ items, className, delay = 0 }: PartnerWaysProps) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item, index) => {
        const Icon = ICONS[index % ICONS.length];

        return (
          <Reveal
            as="li"
            key={item.title}
            delay={(delay + index * ITEM_STAGGER) * 1000}
            className="flex flex-col rounded-lg border border-muted/25 p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-md border border-border">
              <Icon size={20} className="text-ink" />
            </span>
            <h3 className="mt-6 text-lg text-ink">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}
