"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const buttonVariantsOuter = cva(
  "group/btn transition-transform duration-300 ease-out active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
  {
    variants: {
      variant: {
        primary: "w-full bg-accent p-px",
        secondary: "w-full border border-muted/35 bg-paper p-px",
        paper: "w-full bg-paper p-px",
      },
      size: {
        sm: "rounded-sm",
        default: "rounded-lg",
        lg: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-md",
        compact: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

const innerVariants = cva(
  "w-full h-full flex items-center justify-center whitespace-nowrap transition-colors duration-300 ease-out",
  {
    variants: {
      variant: {
        primary: "gap-2 bg-accent text-sm text-paper hover:bg-accent/90 active:bg-accent",
        secondary: "gap-2 bg-paper text-sm text-ink hover:bg-border",
        paper: "gap-2 bg-paper text-sm text-ink hover:bg-paper/90",
      },
      size: {
        sm: "text-xs rounded-sm px-4 py-1",
        default: "text-sm rounded-md px-4 py-2",
        lg: "text-sm rounded-md px-4 py-2",
        pill: "text-base rounded-full px-5 py-2.5",
        square: "justify-between gap-6 rounded-md py-1 pr-1 pl-4 text-sm sm:text-base",
        compact: "rounded-sm px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

const iconBoxVariants = cva("flex size-8 shrink-0 items-center justify-center rounded-sm", {
  variants: {
    variant: {
      primary: "bg-paper text-ink",
      secondary: "bg-ink text-paper",
      paper: "bg-accent text-paper",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface TextureButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "paper";
  size?: "default" | "sm" | "lg" | "pill" | "square" | "compact";
  icon?: React.ReactNode;
  asChild?: boolean;
}

function IconBox({
  variant,
  icon,
}: {
  variant: "primary" | "secondary" | "paper";
  icon?: React.ReactNode;
}) {
  return (
    <span aria-hidden className={iconBoxVariants({ variant })}>
      {icon ?? <ArrowUpRightIcon size={16} />}
    </span>
  );
}

const TextureButton = React.forwardRef<HTMLButtonElement, TextureButtonProps>(
  (
    { children, variant = "primary", size = "default", icon, asChild = false, className, ...props },
    ref,
  ) => {
    const isSquare = size === "square";

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      const content = isSquare
        ? React.cloneElement(
            child,
            undefined,
            <>
              {child.props.children}
              <IconBox variant={variant} icon={icon} />
            </>,
          )
        : children;

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
          {content}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariantsOuter({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <span className={innerVariants({ variant, size })}>
          {children}
          {isSquare ? <IconBox variant={variant} icon={icon} /> : null}
        </span>
      </button>
    );
  },
);

TextureButton.displayName = "TextureButton";

export { TextureButton };
