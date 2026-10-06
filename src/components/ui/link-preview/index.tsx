"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { type MouseEvent, type ReactNode, useState } from "react";

type LinkPreviewProps = {
  children: ReactNode;
  url: string;
  imageSrc: StaticImageData;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export function LinkPreview({
  children,
  url,
  imageSrc,
  alt,
  className,
  width = 240,
  height = 150,
}: LinkPreviewProps) {
  const [isOpen, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetFromCenter = event.clientX - rect.left - rect.width / 2;
    x.set(offsetFromCenter / 2);
  };

  const hidden = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.8 };
  const visible = reduceMotion
    ? { opacity: 1, transition: { duration: 0.2 } }
    : {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 260, damping: 20 },
      };
  const exit = reduceMotion
    ? { opacity: 0, transition: { duration: 0.15 } }
    : {
        opacity: 0,
        y: 10,
        scale: 0.9,
        transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] as const },
      };

  return (
    <HoverCard.Root open={isOpen} openDelay={50} closeDelay={100} onOpenChange={setOpen}>
      <HoverCard.Trigger asChild>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={className}
          onMouseMove={handleMouseMove}
        >
          {children}
        </a>
      </HoverCard.Trigger>
      <AnimatePresence>
        {isOpen && (
          <HoverCard.Portal forceMount>
            <HoverCard.Content forceMount side="top" align="center" sideOffset={10}>
              <motion.div
                initial={hidden}
                animate={visible}
                exit={exit}
                className="origin-bottom"
                style={{ x: reduceMotion ? 0 : translateX }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={-1}
                  className="block rounded-lg border border-border bg-paper p-1"
                >
                  <Image
                    src={imageSrc}
                    width={width}
                    height={height}
                    alt={alt}
                    className="rounded-md object-cover object-top"
                  />
                </a>
              </motion.div>
            </HoverCard.Content>
          </HoverCard.Portal>
        )}
      </AnimatePresence>
    </HoverCard.Root>
  );
}
