"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariantsOuter = cva(
  "transition-transform duration-200 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
  {
    variants: {
      variant: {
        primary: "w-full bg-accent p-px",
        secondary: "w-full border border-border bg-paper p-px",
      },
      size: {
        sm: "rounded-sm",
        default: "rounded-lg",
        lg: "rounded-lg",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

const innerVariants = cva(
  "w-full h-full flex items-center justify-center whitespace-nowrap transition-colors duration-200 ease-out",
  {
    variants: {
      variant: {
        primary: "gap-2 bg-accent text-sm text-paper hover:bg-accent/90 active:bg-accent",
        secondary: "gap-2 bg-paper text-sm text-ink hover:bg-border",
      },
      size: {
        sm: "text-xs rounded-sm px-4 py-1",
        default: "text-sm rounded-md px-4 py-2",
        lg: "text-sm rounded-md px-4 py-2",
        pill: "text-md rounded-full px-5 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface TextureButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "sm" | "lg" | "pill";
  asChild?: boolean;
}

const TextureButton = React.forwardRef<HTMLButtonElement, TextureButtonProps>(
  (
    { children, variant = "primary", size = "default", asChild = false, className, ...props },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(
            buttonVariantsOuter({ variant, size }),
            innerVariants({ variant, size }),
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariantsOuter({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <span className={innerVariants({ variant, size })}>{children}</span>
      </button>
    );
  },
);

TextureButton.displayName = "TextureButton";

export { TextureButton };
