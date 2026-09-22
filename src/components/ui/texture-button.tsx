"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariantsOuter = cva("active:scale-95", {
  variants: {
    variant: {
      primary: "w-full bg-accent p-[1px] transition duration-300 ease-in-out",
      accent:
        "w-full border-[1px] border-accent/30 bg-gradient-to-b from-accent/70 to-accent p-[1px] transition duration-300 ease-in-out",
      secondary:
        "w-full border-[1px] border-border bg-white p-[1px] transition duration-300 ease-in-out",
    },
    size: {
      sm: "rounded-sm",
      default: "rounded-lg",
      lg: "rounded-lg",
      pill: "rounded-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

const innerDivVariants = cva("w-full h-full flex items-center justify-center whitespace-nowrap", {
  variants: {
    variant: {
      primary:
        "gap-2 bg-accent text-sm text-paper transition duration-300 ease-in-out hover:bg-accent/85 active:bg-accent",
      accent:
        "gap-2 bg-gradient-to-b from-accent/90 to-accent text-sm text-paper transition duration-300 ease-in-out hover:from-accent/70 hover:to-accent/70 active:from-accent active:to-accent",
      secondary:
        "gap-2 bg-white text-sm text-ink transition duration-300 ease-in-out hover:opacity-80",
    },
    size: {
      sm: "text-xs rounded-sm px-4 py-1",
      default: "text-sm rounded-md px-4 py-2",
      lg: "text-sm rounded-md px-4 py-2",
      pill: "text-md rounded-lg px-5 py-2.5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export interface TextureButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
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
            innerDivVariants({ variant, size }),
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
        <div className={cn(innerDivVariants({ variant, size }), className)}>{children}</div>
      </button>
    );
  },
);

TextureButton.displayName = "TextureButton";

export { TextureButton };
