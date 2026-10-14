import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GridGlowBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const GridGlowBackground = forwardRef<HTMLDivElement, GridGlowBackgroundProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="grid-glow-background"
        className={cn("relative isolate overflow-clip", className)}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--ink)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--ink)_6%,transparent)_1px,transparent_1px)] [background-size:40px_40px] [background-position:center_top] [mask-image:radial-gradient(ellipse_70%_60%_at_25%_45%,black_0%,transparent_75%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[35%] -left-[15%] -z-10 h-[90%] w-[70%] rounded-[100%] blur-3xl [background:radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_22%,transparent)_0%,color-mix(in_srgb,var(--accent)_12%,transparent)_40%,transparent_72%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[20%] -right-[10%] -z-10 h-[60%] w-[45%] rounded-[100%] blur-3xl [background:radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_8%,transparent)_0%,transparent_70%)]"
        />

        {children}
      </div>
    );
  },
);

GridGlowBackground.displayName = "GridGlowBackground";

export { GridGlowBackground };
