import type { BreadcrumbList, Graph, ListItem, Service } from "schema-dts";

import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import { singleLine } from "@/lib/seo/shared/text";
import { buildFaqPage } from "@/lib/seo/structured-data/pages";
import { homeLabel, ORGANIZATION_ID } from "@/lib/seo/structured-data/shared";
import { serviceRoutes, TIENDANUBE_PATH, type ServiceSlug } from "@/lib/services";
import { site } from "@/lib/site";

type ServiceGraphInput = {
  url: string;
  name: string;
  description: string;
  serviceType: string;
  audienceType?: string;
  trail: readonly { name: string; url: string }[];
  faq: readonly { question: string; answer: string }[];
  lang: Locale;
};

function buildServiceGraph(input: ServiceGraphInput): Graph {
  const { url, lang } = input;

  const service: Service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url,
    areaServed: { "@type": "Country", name: "Argentina" },
    ...(input.audienceType && {
      audience: { "@type": "BusinessAudience", audienceType: input.audienceType },
    }),
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      url: site.url,
    },
  };

  const crumbs = [{ name: homeLabel(lang), url: localizedUrl("/", lang) }, ...input.trail];
  const itemListElement: ListItem[] = crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  }));

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [service, breadcrumb, buildFaqPage(url, input.faq, lang)],
  };
}

export function buildServiceStructuredData(slug: ServiceSlug, lang: Locale): Graph {
  const messages = getMessages(lang);
  const page = messages.servicePages[slug];
  const route = serviceRoutes.find((item) => item.slug === slug);
  const item = messages.services.items.find((service) => service.id === route?.id);
  const url = localizedUrl(`/${slug}`, lang);

  return buildServiceGraph({
    url,
    name: item ? singleLine(item.title) : page.navLabel,
    description: page.metaDescription,
    serviceType: page.navLabel,
    audienceType: item?.audience,
    trail: [{ name: page.navLabel, url }],
    faq: page.faq.items,
    lang,
  });
}

export function buildTiendanubeStructuredData(lang: Locale): Graph {
  const messages = getMessages(lang);
  const page = messages.tiendanube;
  const parent = messages.servicePages.integraciones;
  const url = localizedUrl(TIENDANUBE_PATH, lang);

  return buildServiceGraph({
    url,
    name: page.metaTitle,
    description: page.metaDescription,
    serviceType: page.navLabel,
    trail: [
      { name: parent.navLabel, url: localizedUrl("/integraciones", lang) },
      { name: page.navLabel, url },
    ],
    faq: page.faq.items,
    lang,
  });
}
