import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { cn } from "@/lib/utils";

export type PolaroidImageCardProps = Readonly<
  {
    image?: string;
    imageAlt: string;
    caption?: string;
    label?: string;
    rotate?: boolean;
    children?: ReactNode;
  } & ComponentPropsWithoutRef<"div">
>;

export const PolaroidImageCard = forwardRef<HTMLDivElement, PolaroidImageCardProps>(
  ({ className, image, imageAlt, caption, label, rotate = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="polaroid-image-card"
        className={cn("group w-64", className)}
        {...props}
      >
        <div
          className={cn(
            "rounded-xs border border-muted/25 bg-paper p-3 pb-8 transition-all duration-300 ease-out",
            rotate ? "-rotate-2 group-hover:rotate-0" : "group-hover:rotate-2",
          )}
        >
          <div className="relative aspect-square w-full overflow-hidden border border-muted/20">
            {image ? (
              <SkeletonImage
                src={image}
                alt={imageAlt}
                fill
                sizes="256px"
                quality={90}
                className="object-cover"
              />
            ) : null}
          </div>

          {caption ? <p className="mt-4 text-center text-sm text-ink">{caption}</p> : null}
          {label ? <p className="mt-1 text-center text-xs text-muted">{label}</p> : null}

          {children}
        </div>
      </div>
    );
  },
);

PolaroidImageCard.displayName = "PolaroidImageCard";
