import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
};

const TRACK_CLASS =
  "flex min-w-full shrink-0 animate-marquee-loop items-center justify-evenly gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none";

export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
        className,
      )}
    >
      <ul className={TRACK_CLASS}>{children}</ul>
      <ul aria-hidden className={TRACK_CLASS}>
        {children}
      </ul>
    </div>
  );
}
