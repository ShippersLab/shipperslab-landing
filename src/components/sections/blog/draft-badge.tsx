import { cn } from "@/lib/utils";

type DraftBadgeProps = {
  label: string;
  className?: string;
};

export function DraftBadge({ label, className }: DraftBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-border bg-paper px-3 py-1.5 font-mono text-sm tracking-tight text-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}
