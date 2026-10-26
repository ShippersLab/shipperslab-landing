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
      <ServiceHero title={page.h1} lead={page.lead} />

      <Container className="w-full border-t border-border py-16 sm:py-20">
        <ProcessOverview label={page.overviewLabel} steps={overview} />
      </Container>

      {STEP_ORDER.map((id, index) => (
        <ServiceSection
          key={id}
          id={id}
          label={stepLabel(page.stepLabel, index)}
          title={page.steps[id].title}
        >
          {stepDetails(id, page.steps)}
        </ServiceSection>
      ))}

      <ServiceSection id="faq" title={page.faq.title}>
        <FaqAccordion items={page.faq.items} className="border-t-0" />
      </ServiceSection>

      <Container className="w-full border-t border-border py-16 sm:py-20">
        <ServiceCta
          title={page.ctaTitle}
          description={page.ctaDescription}
          button={page.ctaButton}
          className="mt-0 sm:mt-0"
        />
      </Container>

      <ServiceLinks title={page.servicesTitle} slugs={SERVICE_SLUGS} />
    </div>
  );
}
