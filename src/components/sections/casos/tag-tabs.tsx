import { cn } from "@/lib/utils";

const MAX_TAGS = 2;

type TagTabsProps = {
  tags: readonly string[];
  className?: string;
};

export function TagTabs({ tags, className }: TagTabsProps) {
  return (
    <ul className={cn("flex justify-center gap-1", className)}>
      {tags.slice(0, MAX_TAGS).map((tag) => (
        <li
          key={tag}
          className="rounded-t-md border border-b-0 border-muted/35 px-3 pt-1.5 pb-1 text-sm whitespace-nowrap text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
