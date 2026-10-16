"use client";

import { ServiceBody } from "@/components/sections/service-page/service-body";
import { ServiceCta } from "@/components/sections/service-page/service-cta";
import { ServiceHero } from "@/components/sections/service-page/service-hero";
import { ServiceLinks } from "@/components/sections/service-page/service-links";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import type { ServiceSlug } from "@/lib/services";
import { serviceRoutes } from "@/lib/services";

type ServicePageProps = {
  slug: ServiceSlug;
};

export function ServicePage({ slug }: ServicePageProps) {
  const { messages } = useI18n();
  const page = messages.servicePages[slug];
  const related = serviceRoutes.filter((route) => route.slug !== slug).map((route) => route.slug);

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <ServiceHero eyebrow={messages.servicePages.eyebrow} title={page.h1} lead={page.lead} />

      <Container className="w-full py-16 sm:py-20">
        <ServiceBody page={page} processLink={messages.servicePages.processLink} />
        <ServiceCta
          title={page.ctaTitle}
          description={page.ctaDescription}
          button={page.ctaButton}
        />
      </Container>

      <ServiceLinks title={messages.servicePages.relatedTitle} slugs={related} />
    </div>
  );
}
