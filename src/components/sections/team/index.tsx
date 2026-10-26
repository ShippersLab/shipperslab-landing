"use client";

import { Employers } from "@/components/sections/team/employers";
import { Founders } from "@/components/sections/team/founders";
import { Section } from "@/components/ui/section/section";
import { SectionHeading } from "@/components/ui/section/section-heading";
import { useI18n } from "@/i18n/provider";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.15;

export function Team() {
  const { messages } = useI18n();

  return (
    <Section id="nosotros" className="py-12 sm:py-16 md:py-20">
      <SectionHeading
        title={messages.team.title}
        description={messages.team.description}
        className="max-w-2xl"
        descriptionClassName="max-w-xl"
        titleDelay={TITLE_DELAY}
        descriptionDelay={DESCRIPTION_DELAY}
      />

      <Founders />
      <Employers />
    </Section>
  );
}
