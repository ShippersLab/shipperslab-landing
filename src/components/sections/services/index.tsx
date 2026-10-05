"use client";

import { motion } from "motion/react";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";

export function Services() {
  const { messages } = useI18n();

  return (
    <Section id="servicios" bordered>
      <SectionHeading
        title={messages.services.title}
        description={messages.services.description}
        className="max-w-lg"
      />

      <ol className="mt-12 flex flex-col border-t border-border">
        {messages.services.items.map((item, index) => (
          <motion.li
            key={item.id}
            id={item.id}
            className="grid gap-4 border-b border-border py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12 md:py-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-3">
              <span className="font-mono text-label tracking-label text-muted uppercase">
                0{index + 1}
              </span>
              <h3 className="text-2xl sm:text-3xl">{item.title}</h3>
            </div>
            <div className="flex flex-col gap-3 md:pt-7">
              <p className="text-base text-ink sm:text-lg">{item.description}</p>
              <p className="font-mono text-label tracking-label text-muted uppercase">
                {item.audience}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
