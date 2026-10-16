"use client";

import type { ReactNode } from "react";

import { ProcessOverview } from "@/components/sections/como-trabajamos/process-overview";
import {
  CallDetails,
  PricingDetails,
  ScopeDetails,
  WeeklyDetails,
} from "@/components/sections/como-trabajamos/step-details";
import { ServiceCta } from "@/components/sections/service-page/service-cta";
import { ServiceHero } from "@/components/sections/service-page/service-hero";
import { ServiceLinks } from "@/components/sections/service-page/service-links";
import { ServiceSection } from "@/components/sections/service-page/service-section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Container } from "@/components/ui/section/container";
import type { Messages } from "@/i18n/get-messages";
import { useI18n } from "@/i18n/provider";
import { serviceRoutes } from "@/lib/services";

const ROW_DELAY = 0.1;
const STEP_ORDER = ["call", "scope", "weekly", "pricing"] as const;
const SERVICE_SLUGS = serviceRoutes.map((route) => route.slug);

type StepId = (typeof STEP_ORDER)[number];
type Steps = Messages["comoTrabajamos"]["steps"];

function stepDetails(id: StepId, steps: Steps): ReactNode {
  switch (id) {
    case "call":
      return <CallDetails step={steps.call} />;
    case "scope":
      return <ScopeDetails step={steps.scope} />;
    case "weekly":
      return <WeeklyDetails step={steps.weekly} />;
    case "pricing":
      return <PricingDetails step={steps.pricing} />;
  }
}

function stepLabel(prefix: string, index: number) {
  return `${prefix} ${String(index + 1).padStart(2, "0")}`;
}

export function ComoTrabajamos() {
  const { messages } = useI18n();
  const page = messages.comoTrabajamos;
  const overview = STEP_ORDER.map((id) => ({
    id,
    short: page.steps[id].short,
    summary: page.steps[id].summary,
  }));

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <ServiceHero eyebrow={page.eyebrow} title={page.h1} lead={page.lead} />

      <Container className="w-full py-16 sm:py-20">
        <ProcessOverview label={page.overviewLabel} steps={overview} />

        <div className="mt-16 grid gap-16 sm:mt-20 sm:gap-20">
          {STEP_ORDER.map((id, index) => (
            <ServiceSection
              key={id}
              id={id}
              label={stepLabel(page.stepLabel, index)}
              title={page.steps[id].title}
              delay={ROW_DELAY * 1000}
            >
              {stepDetails(id, page.steps)}
            </ServiceSection>
          ))}

          <ServiceSection id="faq" title={page.faq.title} delay={ROW_DELAY * 1000}>
            <FaqAccordion items={page.faq.items} delay={ROW_DELAY} className="-mt-6 border-t-0" />
          </ServiceSection>
        </div>

        <ServiceCta
          title={page.ctaTitle}
          description={page.ctaDescription}
          button={page.ctaButton}
        />
      </Container>

      <ServiceLinks title={page.servicesTitle} slugs={SERVICE_SLUGS} />
    </div>
  );
}
