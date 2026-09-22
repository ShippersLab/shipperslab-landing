"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { PlusIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/animation/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const TITLE_DELAY = 0;
const ITEMS_DELAY = 0.3;
const ITEM_STAGGER = 0.08;

export function Faq() {
  const { messages } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
        <div className="lg:sticky lg:top-24 lg:self-start">
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={
              reduced || isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(20px)" }
            }
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square overflow-hidden rounded-lg border border-border"
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
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        </div>

        <div>
          <SectionHeading title={messages.faq.title} titleDelay={TITLE_DELAY} />

          <ul className="mt-8 divide-y divide-border border-t border-border">
            {messages.faq.items.map((item, index) => {
              const open = openIndex === index;

              return (
                <Reveal
                  key={item.question}
                  as="li"
                  delay={(ITEMS_DELAY + index * ITEM_STAGGER) * 1000}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-lg text-ink">{item.question}</span>
                    <PlusIcon
                      className={cn(
                        "size-4 shrink-0 text-muted transition-transform duration-200",
                        open && "rotate-45",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-base text-muted">{item.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
