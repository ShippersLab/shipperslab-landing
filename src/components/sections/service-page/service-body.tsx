"use client";

import type { ReactNode } from "react";

import { ServiceAfterDelivery } from "@/components/sections/service-page/service-after-delivery";
import { ServiceAudience } from "@/components/sections/service-page/service-audience";
import { ServiceCases } from "@/components/sections/service-page/service-cases";
import { ServiceCovers } from "@/components/sections/service-page/service-covers";
import { ServiceExample } from "@/components/sections/service-page/service-example";
import { ServiceLink } from "@/components/sections/service-page/service-link";
import { ServiceSection } from "@/components/sections/service-page/service-section";
import { ServiceSteps } from "@/components/sections/service-page/service-steps";
import { ServiceTools } from "@/components/sections/service-page/service-tools";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import type { Messages } from "@/i18n/get-messages";
import type { ServiceSlug } from "@/lib/services";

const BODY_DELAY = 0.1;
const SECTION_STAGGER = 0.08;
const STAGGERED_ROWS = 3;
const DETAIL_DELAY = 0.1;
const PROCESS_HREF = "/como-trabajamos";

type ServicePageMessages = Messages["servicePages"][ServiceSlug];

type ServiceBodyProps = {
  page: ServicePageMessages;
  processLink: string;
};

type Row = {
  key: string;
  title: string;
  content: ReactNode;
};

function rowDelay(index: number) {
  if (index >= STAGGERED_ROWS) {
    return DETAIL_DELAY * 1000;
  }

  return (BODY_DELAY + index * SECTION_STAGGER) * 1000;
}

function Paragraph({ children }: { children: string }) {
  return <p className="text-base leading-relaxed text-muted sm:text-lg">{children}</p>;
}

function pageRows(page: ServicePageMessages, processLink: string): Row[] {
  const rows: Row[] = [];

  if ("covers" in page) {
    rows.push({
      key: "covers",
      title: page.covers.title,
      content: <ServiceCovers body={page.covers.body} items={page.covers.items} />,
    });
  }

  if ("example" in page) {
    rows.push({
      key: "example",
      title: page.example.title,
      content: (
        <ServiceExample
          body={page.example.body}
          link={page.example.link}
          tabs={page.example.tabs}
          alt={page.example.alt}
        />
      ),
    });
  }

  if ("sections" in page) {
    for (const section of page.sections) {
      rows.push({
        key: section.title,
        title: section.title,
        content: <Paragraph>{section.body}</Paragraph>,
      });
    }
  }

  if ("tools" in page) {
    rows.push({
      key: "tools",
      title: page.tools.title,
      content: <ServiceTools items={page.tools.items} />,
    });
  }

  if ("audience" in page) {
    rows.push({
      key: "audience",
      title: page.audience.title,
      content: <ServiceAudience intro={page.audience.intro} items={page.audience.items} />,
    });
  }

  if ("examples" in page) {
    rows.push({
      key: "examples",
      title: page.examples.title,
      content: <ServiceCases items={page.examples.items} tabsLabel={page.examples.tabsLabel} />,
    });
  }

  rows.push({
    key: "process",
    title: page.process.title,
    content: (
      <ServiceSteps
        steps={page.process.steps}
        pricing={page.process.pricing}
        link={<ServiceLink href={PROCESS_HREF}>{processLink}</ServiceLink>}
      />
    ),
  });

  rows.push({
    key: "faq",
    title: page.faq.title,
    content: <FaqAccordion items={page.faq.items} delay={DETAIL_DELAY} />,
  });

  return rows;
}

export function ServiceBody({ page, processLink }: ServiceBodyProps) {
  return (
    <div className="grid gap-16 sm:gap-20">
      {pageRows(page, processLink).map((row, index) => (
        <ServiceSection key={row.key} title={row.title} delay={rowDelay(index)}>
          {row.content}
        </ServiceSection>
      ))}

      <ServiceAfterDelivery items={page.afterDelivery} delay={DETAIL_DELAY * 1000} />
    </div>
  );
}
