import { cn } from "@/lib/utils";

type StepNumberProps = {
  index: number;
  className?: string;
};

export function StepNumber({ index, className }: StepNumberProps) {
  return (
    <span
      className={cn(
        "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-paper font-mono text-xs text-muted",
        className,
      )}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}
