type DraftBadgeProps = {
  label: string;
  className?: string;
};

export function DraftBadge({ label, className = "" }: DraftBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-accent px-2.5 py-0.5 text-xs font-medium text-accent ${className}`}
    >
      {label}
    </span>
  );
}
