import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FramedImageProps = {
  tabs: readonly string[];
  children: ReactNode;
  className?: string;
  frameClassName?: string;
};

export function FramedImage({ tabs, children, className, frameClassName }: FramedImageProps) {
  return (
    <div className={cn("relative mt-10", className)}>
      <ul className="absolute bottom-full left-1/2 flex -translate-x-1/2 translate-y-px gap-1">
        {tabs.map((tab) => (
          <li
            key={tab}
            className="rounded-t-lg border border-b-0 border-border bg-paper px-4 pt-2 pb-1 text-sm font-medium whitespace-nowrap text-ink"
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className={cn("rounded-lg border border-border bg-paper p-1.5", frameClassName)}>
        {children}
      </div>
    </div>
  );
}
