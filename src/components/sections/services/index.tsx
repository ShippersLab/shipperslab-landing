"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";

import { DescriptionWithLink } from "@/components/sections/services/description-with-link";
import { getServiceHref } from "@/lib/services";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Section } from "@/components/ui/section/section";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";

const EASE = [0.23, 1, 0.32, 1] as const;
const ROW_STAGGER = 0.08;
const ROWS_DELAY = 0;
const TITLE_DURATION = 1.2;

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: ROW_STAGGER, delayChildren: ROWS_DELAY } },
};

const row: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const line: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease: EASE } },
};

const item: Variants = {
  hidden: { opacity: 0, transform: "translateY(12px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.35, ease: EASE },
  },
};

export function Services() {
  const { messages } = useI18n();

  return (
    <Section id="servicios" bordered>
      <SectionHeading
        title={messages.services.title}
        description={messages.services.description}
        className="max-w-lg"
      />

      <motion.ol
        className="mt-16 flex flex-col sm:mt-20"
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {messages.services.items.map((service, index) => (
          <motion.li
            key={service.id}
            id={service.id}
            variants={row}
            className="group relative grid gap-4 py-10 md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10 md:py-14"
          >
            <motion.span
              aria-hidden
              variants={line}
              className="absolute inset-x-0 top-0 h-px origin-left bg-border"
            />
            <motion.span
              variants={item}
              className="font-mono text-sm text-muted transition-colors duration-200 ease-out group-hover:text-ink md:pt-1.5"
            >
              0{index + 1}
            </motion.span>
            <h3 className="text-2xl leading-tight sm:text-3xl">
              <Link
                href={getServiceHref(service.id) ?? `/#${service.id}`}
                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <DiaTextReveal
                  text={service.title}
                  colors={["var(--accent)"]}
                  textColor="var(--ink)"
                  delay={ROWS_DELAY + index * ROW_STAGGER}
                  duration={TITLE_DURATION}
                  inViewMargin="0px"
                  className="whitespace-pre-line"
                />
              </Link>
            </h3>
            <div className="flex flex-col items-start gap-4">
              <motion.p variants={item} className="text-base text-muted sm:text-lg">
                <DescriptionWithLink
                  text={service.description}
                  opensNewTab={messages.common.opensNewTab}
                  previewAlt={messages.services.eventopsPreviewAlt}
                />
              </motion.p>
              <motion.p
                variants={item}
                className="rounded-md border border-border px-2.5 py-1 text-sm text-muted"
              >
                {service.audience}
              </motion.p>
            </div>
          </motion.li>
        ))}
        <motion.li aria-hidden variants={line} className="h-px origin-left bg-border" />
      </motion.ol>
    </Section>
  );
}
