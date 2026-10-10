"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Section } from "@/components/ui/section/section";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const TITLE_DELAY = 0;
const ITEMS_DELAY = 0.3;
const ITEM_STAGGER = 0.08;

export function Faq() {
  const { messages } = useI18n();
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef, { once: true, margin: "0px 0px -12% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const reduced = hydrated && prefersReducedMotion;

  return (
    <Section bordered>
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="w-full lg:sticky lg:top-24 lg:self-start">
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={
              reduced || isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(12px)" }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-4/5 w-full overflow-hidden rounded-lg border border-border"
          >
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 animate-pulse bg-border/60 transition-opacity duration-300",
                imageLoaded ? "opacity-0" : "opacity-100",
              )}
            />
            <Image
              src="/images/bridge-illustration.webp"
              alt={messages.faq.imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover object-center"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        </div>

        <div>
          <SectionHeading title={messages.faq.title} titleDelay={TITLE_DELAY} />

          <FaqAccordion
            items={messages.faq.items}
            delay={ITEMS_DELAY}
            stagger={ITEM_STAGGER}
            className="mt-8"
          />
        </div>
      </div>
    </Section>
  );
}
