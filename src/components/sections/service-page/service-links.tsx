"use client";

import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { ServiceLink } from "@/components/sections/service-page/service-link";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import type { ServiceSlug } from "@/lib/services";

type ServiceLinksProps = {
  title: string;
  slugs: readonly ServiceSlug[];
};

export function ServiceLinks({ title, slugs }: ServiceLinksProps) {
  const { messages } = useI18n();

  return (
    <Container className="w-full py-16 sm:py-20">
      <h2 className="text-center font-heading text-2xl tracking-heading text-ink sm:text-3xl">
        <DiaTextReveal text={title} colors={["var(--accent)"]} textColor="var(--ink)" delay={0} />
      </h2>
      <StaggerReveal as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {slugs.map((slug) => (
          <li key={slug}>
            <ServiceLink slug={slug} label={messages.servicePages[slug].navLabel} />
          </li>
        ))}
      </StaggerReveal>
    </Container>
  );
}
