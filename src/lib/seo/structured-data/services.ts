import type { BreadcrumbList, Graph, Service } from "schema-dts";

import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import { singleLine } from "@/lib/seo/shared/text";
import { buildFaqPage } from "@/lib/seo/structured-data/pages";
import { homeLabel, ORGANIZATION_ID } from "@/lib/seo/structured-data/shared";
import { serviceRoutes, type ServiceSlug } from "@/lib/services";
import { site } from "@/lib/site";

export function buildServiceStructuredData(slug: ServiceSlug, lang: Locale): Graph {
  const messages = getMessages(lang);
  const page = messages.servicePages[slug];
  const route = serviceRoutes.find((item) => item.slug === slug);
  const item = messages.services.items.find((service) => service.id === route?.id);
  const url = localizedUrl(`/${slug}`, lang);

  const service: Service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: item ? singleLine(item.title) : page.navLabel,
    description: page.metaDescription,
    serviceType: page.navLabel,
    url,
    areaServed: { "@type": "Country", name: "Argentina" },
    ...(item && {
      audience: { "@type": "BusinessAudience", audienceType: item.audience },
    }),
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      url: site.url,
    },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel(lang), item: localizedUrl("/", lang) },
      { "@type": "ListItem", position: 2, name: page.navLabel, item: url },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [service, breadcrumb, buildFaqPage(url, page.faq.items, lang)],
  };
}
