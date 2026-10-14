"use client";

import { FaqHelp } from "@/components/sections/faq/faq-help";
import { FaqIntro } from "@/components/sections/faq/faq-intro";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Section } from "@/components/ui/section/section";
import { useI18n } from "@/i18n/provider";

const ITEMS_DELAY = 0.3;
const ITEM_STAGGER = 0.08;
const HELP_DELAY = 200;

export function Faq() {
  const { messages } = useI18n();
  const { faq } = messages;

  return (
    <Section bordered>
      <FaqIntro label={faq.label} title={faq.title} description={faq.description} />

      <FaqAccordion
        items={faq.items}
        delay={ITEMS_DELAY}
        stagger={ITEM_STAGGER}
        className="mt-16 sm:mt-20"
      />

      <FaqHelp
        title={faq.help.title}
        description={faq.help.description}
        cta={faq.help.cta}
        delay={HELP_DELAY}
        className="mt-16 sm:mt-20"
      />
    </Section>
  );
}
