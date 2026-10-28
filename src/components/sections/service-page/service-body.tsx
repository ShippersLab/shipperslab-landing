import type { ReactNode } from "react";

import { ServiceAfterDelivery } from "@/components/sections/service-page/service-after-delivery";
import { ServiceAudience } from "@/components/sections/service-page/service-audience";
import { ServiceCases } from "@/components/sections/service-page/service-cases";
import { ServiceCovers } from "@/components/sections/service-page/service-covers";
import { ServiceExample } from "@/components/sections/service-page/service-example";
import { ServiceTextLink } from "@/components/sections/service-page/service-text-link";
import { ServiceSection } from "@/components/sections/service-page/service-section";
import { ServiceSteps } from "@/components/sections/service-page/service-steps";
import { ServiceTools } from "@/components/sections/service-page/service-tools";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { FaqAccordion } from "@/components/ui/faq-accordion";

const PROCESS_HREF = "/como-trabajamos";

export type ServicePageContent = {
  covers?: {
    title: string;
    body: string;
    items: readonly { id: string; label: string }[];
  };
  example?: {
    title: string;
    body: string;
    link: { label: string; href: string };
    tabs: readonly string[];
    alt: string;
  };
  sections?: readonly { title: string; body: string }[];
  tools?: {
    title: string;
    items: readonly { id: string; title: string; body: string }[];
  };
  audience?: {
    title: string;
    intro: string;
    items: readonly { id: string; title: string; body: string }[];
  };
  examples?: {
    title: string;
    tabsLabel: string;
    items: readonly { title: string; body: string }[];
  };
  process: {
    title: string;
    steps: readonly { title: string; body: string }[];
    pricing: { label: string; body: string };
  };
  faq: {
    title: string;
    items: readonly { question: string; answer: string }[];
  };
  afterDelivery: readonly { label: string; body: string }[];
};

type ServiceBodyProps = {
  page: ServicePageContent;
  processLink: string;
};

type Row = {
  key: string;
  title: string;
  content: ReactNode;
};

function Paragraph({ children }: { children: string }) {
  return <WordReveal text={children} className="text-base leading-relaxed text-muted" />;
}

function pageRows(page: ServicePageContent, processLink: string): Row[] {
  const rows: Row[] = [];

  if (page.covers) {
    rows.push({
      key: "covers",
      title: page.covers.title,
      content: <ServiceCovers body={page.covers.body} items={page.covers.items} />,
    });
  }

  if (page.example) {
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

  if (page.sections) {
    for (const section of page.sections) {
      rows.push({
        key: section.title,
        title: section.title,
        content: <Paragraph>{section.body}</Paragraph>,
      });
    }
  }

  if (page.tools) {
    rows.push({
      key: "tools",
      title: page.tools.title,
      content: <ServiceTools items={page.tools.items} />,
    });
  }

  if (page.audience) {
    rows.push({
      key: "audience",
      title: page.audience.title,
      content: <ServiceAudience intro={page.audience.intro} items={page.audience.items} />,
    });
  }

  if (page.examples) {
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
        link={<ServiceTextLink href={PROCESS_HREF}>{processLink}</ServiceTextLink>}
      />
    ),
  });

  rows.push({
    key: "faq",
    title: page.faq.title,
    content: <FaqAccordion items={page.faq.items} />,
  });

  return rows;
}

export function ServiceBody({ page, processLink }: ServiceBodyProps) {
  return (
    <>
      {pageRows(page, processLink).map((row) => (
        <ServiceSection key={row.key} title={row.title}>
          {row.content}
        </ServiceSection>
      ))}

      <ServiceAfterDelivery items={page.afterDelivery} />
    </>
  );
}
