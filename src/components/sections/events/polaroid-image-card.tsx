import Image from "next/image";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

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
        className={cn("group w-56", className)}
        {...props}
      >
        <div
          className={cn(
            "border border-border bg-paper p-3 pb-8 transition-transform duration-200 ease-out",
            rotate && "-rotate-2 group-hover:rotate-0",
          )}
        >
          <div className="relative aspect-square w-full overflow-hidden bg-border/30">
            {image ? (
              <Image src={image} alt={imageAlt} fill sizes="224px" className="object-cover" />
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
