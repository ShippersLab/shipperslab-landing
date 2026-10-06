import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ArcBandsBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const ArcBandsBackground = forwardRef<HTMLDivElement, ArcBandsBackgroundProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="arc-bands-background"
        className={cn("relative isolate overflow-clip bg-paper", className)}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[28%] left-1/2 -z-10 h-[92%] w-[150%] -translate-x-1/2 rounded-[100%] [background:radial-gradient(ellipse_120%_88%_at_50%_100%,color-mix(in_srgb,var(--accent)_32%,transparent)_0%,color-mix(in_srgb,var(--accent)_28%,transparent)_18%,color-mix(in_srgb,var(--accent)_22%,transparent)_40%,color-mix(in_srgb,var(--accent)_16%,transparent)_62%,transparent_82%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[22%] left-1/2 -z-10 h-[78%] w-[128%] -translate-x-1/2 rounded-[100%] blur-2xl [background:radial-gradient(ellipse_110%_80%_at_50%_100%,color-mix(in_srgb,var(--accent)_18%,transparent)_0%,color-mix(in_srgb,var(--accent)_15%,transparent)_22%,color-mix(in_srgb,var(--accent)_12%,transparent)_46%,color-mix(in_srgb,var(--accent)_9%,transparent)_68%,transparent_86%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[18%] left-1/2 -z-10 h-[64%] w-[108%] -translate-x-1/2 rounded-[100%] blur-3xl [background:radial-gradient(ellipse_100%_72%_at_50%_100%,color-mix(in_srgb,var(--paper)_55%,transparent)_0%,color-mix(in_srgb,var(--paper)_18%,transparent)_38%,transparent_72%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,var(--ink)_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.03]"
        />

        {children}
      </div>
    );
  },
);

ArcBandsBackground.displayName = "ArcBandsBackground";

export { ArcBandsBackground };
