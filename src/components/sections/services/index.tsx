"use client";

import { motion, type Variants } from "motion/react";

import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const row: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const line: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

const item: Variants = {
  hidden: { opacity: 0, transform: "translateY(12px)" },
  visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.4, ease: EASE } },
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

      <ol className="mt-12 flex flex-col">
        {messages.services.items.map((service, index) => (
          <motion.li
            key={service.id}
            id={service.id}
            className="relative grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12 md:py-10"
            variants={row}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              aria-hidden
              variants={line}
              className="absolute inset-x-0 top-0 h-px origin-left bg-border"
            />
            <div className="flex flex-col gap-3">
              <motion.span
                variants={item}
                className="font-mono text-label tracking-label text-muted uppercase"
              >
                0{index + 1}
              </motion.span>
              <motion.h3 variants={item} className="text-2xl sm:text-3xl">
                {service.title}
              </motion.h3>
            </div>
            <div className="flex flex-col gap-3 md:pt-7">
              <motion.p variants={item} className="text-base text-ink sm:text-lg">
                {service.description}
              </motion.p>
              {"link" in service ? (
                <motion.a
                  variants={item}
                  href={site.eventopsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-fit items-center gap-2 text-base text-ink underline decoration-accent underline-offset-4 transition-colors duration-200 hover:decoration-ink"
                >
                  {service.link}
                  <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  <span className="sr-only">({messages.common.opensNewTab})</span>
                </motion.a>
              ) : null}
              <motion.p
                variants={item}
                className="font-mono text-label tracking-label text-muted uppercase"
              >
                {service.audience}
              </motion.p>
            </div>
          </motion.li>
        ))}
        <li aria-hidden className="h-px bg-border" />
      </ol>
    </Section>
  );
}
