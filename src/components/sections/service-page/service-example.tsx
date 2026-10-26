"use client";

import { motion, useReducedMotion } from "motion/react";

import { FramedImage } from "@/components/sections/casos/framed-image";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { LocalizedLink } from "@/i18n/link";
import { eventopsImages } from "@/lib/projects/eventops";

type ServiceExampleProps = {
  body: string;
  link: {
    label: string;
    href: string;
  };
  tabs: readonly string[];
  alt: string;
};

const IMAGE_DELAY = 0.25;
const IMAGE_DURATION = 1;
const BLURRED = { opacity: 0, filter: "blur(12px)" };
const SHARP = { opacity: 1, filter: "blur(0px)" };

export function ServiceExample({ body, link, tabs, alt }: ServiceExampleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <WordReveal text={body} className="text-base leading-relaxed text-muted" />
      <LocalizedLink
        href={link.href}
        className="mt-4 inline-block text-base font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {link.label}
      </LocalizedLink>
      <motion.div
        initial={BLURRED}
        whileInView={SHARP}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{
          duration: prefersReducedMotion ? 0 : IMAGE_DURATION,
          delay: prefersReducedMotion ? 0 : IMAGE_DELAY,
          ease: [0.23, 1, 0.32, 1],
        }}
        className="mt-16"
      >
        <FramedImage tabs={tabs}>
          <div className="relative aspect-video overflow-hidden rounded-md border border-border">
            <SkeletonImage
              src={eventopsImages.calendar}
              alt={alt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 672px, 100vw"
              className="object-cover"
            />
          </div>
        </FramedImage>
      </motion.div>
    </>
  );
}
