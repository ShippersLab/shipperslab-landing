"use client";

import { ServiceBody } from "@/components/sections/service-page/service-body";
import { ServiceCta } from "@/components/sections/service-page/service-cta";
import { ServiceHero } from "@/components/sections/service-page/service-hero";
import { ServiceLinks } from "@/components/sections/service-page/service-links";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import type { Messages } from "@/i18n/get-messages";
import { serviceRoutes, type ServicePageKey } from "@/lib/services";

type ServicePageProps = {
  slug: ServicePageKey;
};

function servicePageContent(messages: Messages, slug: ServicePageKey) {
  return slug === "tiendanube" ? messages.tiendanube : messages.servicePages[slug];
}

export function ServicePage({ slug }: ServicePageProps) {
  const { messages } = useI18n();
  const page = servicePageContent(messages, slug);
  const related = serviceRoutes.filter((route) => route.slug !== slug).map((route) => route.slug);

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <ServiceHero title={page.h1} lead={page.lead} />

      <ServiceBody page={page} processLink={messages.servicePages.processLink} />

      <Container className="w-full py-16 sm:py-20">
        <ServiceCta
          title={page.ctaTitle}
          description={page.ctaDescription}
          button={page.ctaButton}
          className="mt-0 sm:mt-0"
        />
      </Container>

      <ServiceLinks title={messages.servicePages.relatedTitle} slugs={related} />
    </div>
  );
}
