import { CalendarIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type BuildingIllustrationProps = {
  items: string[];
  className?: string;
};

export function BuildingIllustration({ items, className }: BuildingIllustrationProps) {
  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        "relative h-72 w-full overflow-hidden rounded-lg border border-border bg-paper mask-y-from-70%",
        className,
      )}
    >
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="animate-marquee-vertical flex flex-col gap-3 p-4">
        {loop.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-3 rounded-md border border-border bg-paper px-5 py-3.5"
          >
            <CalendarIcon size={18} className="shrink-0 text-muted" />
            <span className="text-sm text-ink">{item}</span>
            <span className="ms-auto size-2 shrink-0 rounded-full bg-border" />
          </div>
        ))}
      </div>
    </div>
  );
}
