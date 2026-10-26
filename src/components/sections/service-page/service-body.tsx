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
import type { Messages } from "@/i18n/get-messages";
import type { ServiceSlug } from "@/lib/services";

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

function Paragraph({ children }: { children: string }) {
  return <WordReveal text={children} className="text-base leading-relaxed text-muted" />;
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
