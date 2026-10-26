"use client";

import { FaqHelp } from "@/components/sections/faq/faq-help";
import { FaqIntro } from "@/components/sections/faq/faq-intro";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Section } from "@/components/ui/section/section";
import { useI18n } from "@/i18n/provider";

const ITEMS_DELAY = 0.2;
const ITEM_STAGGER = 0.08;
const HELP_DELAY = 200;

export function Faq() {
  const { messages } = useI18n();
  const { faq } = messages;

  return (
    <Section bordered className="py-12 sm:py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <FaqIntro label={faq.label} title={faq.title} description={faq.description} />
          <FaqHelp
            title={faq.help.title}
            description={faq.help.description}
            cta={faq.help.cta}
            delay={HELP_DELAY}
          />
        </div>

        <FaqAccordion items={faq.items} delay={ITEMS_DELAY} stagger={ITEM_STAGGER} />
      </div>
    </Section>
  );
}
