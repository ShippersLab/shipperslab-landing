"use client";

import { motion } from "motion/react";

import { SERVICE_ICONS } from "@/components/sections/services/data";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";

const CARD_STAGGER = 0.05;

export function Services() {
  const { messages } = useI18n();

  return (
    <Section id="servicios" bordered>
      <SectionHeading
        title={messages.services.title}
        description={messages.services.description}
        className="max-w-lg"
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
        {messages.services.items.map((item, index) => {
          const icons = SERVICE_ICONS[item.id];

          return (
            <article key={item.id} id={item.id} className="bg-paper p-6 sm:p-8">
              <motion.div
                className="flex h-full flex-col gap-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 2) * CARD_STAGGER,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="font-mono text-label tracking-label text-muted uppercase">
                  {item.audience}
                </p>
                <h3 className="text-2xl sm:text-3xl">{item.title}</h3>
                <p className="text-base text-ink">{item.description}</p>
                <ul className="mt-auto flex flex-col divide-y divide-border text-base text-muted">
                  {item.highlights.map((highlight, highlightIndex) => {
                    const Icon = icons[highlightIndex];

                    return (
                      <li key={highlight} className="flex items-center gap-3 py-3">
                        <Icon className="size-4 shrink-0" aria-hidden />
                        {highlight}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
