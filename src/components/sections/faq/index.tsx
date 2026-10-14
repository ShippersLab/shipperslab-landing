"use client";

import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Section } from "@/components/ui/section/section";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";

const TITLE_DELAY = 0;
const ITEMS_DELAY = 0.3;
const ITEM_STAGGER = 0.08;

export function Faq() {
  const { messages } = useI18n();

  return (
    <Section bordered>
      <SectionHeading title={messages.faq.title} titleDelay={TITLE_DELAY} />

      <FaqAccordion
        items={messages.faq.items}
        delay={ITEMS_DELAY}
        stagger={ITEM_STAGGER}
        className="mt-16 sm:mt-20"
      />
    </Section>
  );
}
