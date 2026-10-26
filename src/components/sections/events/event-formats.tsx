import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { ChatIcon, DashboardIcon, DocumentIcon, MicIcon, RocketIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type EventFormat = {
  title: string;
  description: string;
};

type EventFormatsProps = {
  items: EventFormat[];
  soonLabel: string;
  className?: string;
  delay?: number;
};

const ICONS = [DocumentIcon, DashboardIcon, MicIcon, RocketIcon, ChatIcon];

export function EventFormats({ items, soonLabel, className, delay = 0 }: EventFormatsProps) {
  return (
    <StaggerReveal
      as="ul"
      delay={delay}
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-6", className)}
    >
      {items.map((item, index) => {
        const Icon = ICONS[index % ICONS.length];
        const wide = items.length % 3 !== 0 && index < 2;

        return (
          <li
            key={item.title}
            className={cn(
              "flex flex-col rounded-lg border border-muted/25 p-6",
              wide ? "lg:col-span-3" : "lg:col-span-2",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-md border border-border">
                <Icon size={20} className="text-ink" />
              </span>
              <span className="rounded-md border border-muted/35 px-2.5 py-1 font-mono text-xs tracking-tight text-muted">
                {soonLabel}
              </span>
            </div>
            <h3 className="mt-6 text-xl text-ink">{item.title}</h3>
            <p className="mt-2 text-base text-muted">{item.description}</p>
          </li>
        );
      })}
    </StaggerReveal>
  );
}
