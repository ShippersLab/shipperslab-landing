import type { BreadcrumbList, Graph, Service, WebPage } from "schema-dts";

import { languageTags, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import { singleLine } from "@/lib/seo/shared/text";
import { buildFaqPage } from "@/lib/seo/structured-data/pages";
import { homeLabel, ORGANIZATION_ID, websiteId } from "@/lib/seo/structured-data/shared";
import { serviceRoutes, TIENDANUBE_PATH, type ServiceSlug } from "@/lib/services";
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

export function buildTiendanubeStructuredData(lang: Locale): Graph {
  const messages = getMessages(lang);
  const page = messages.tiendanube;
  const url = localizedUrl(TIENDANUBE_PATH, lang);
  const parentName = messages.servicePages.integraciones.navLabel;
  const parentUrl = localizedUrl("/integraciones", lang);

  const service: Service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.metaTitle,
    description: page.metaDescription,
    serviceType: page.navLabel,
    url,
    areaServed: { "@type": "Country", name: "Argentina" },
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      url: site.url,
    },
  };

  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: languageTags[lang],
    isPartOf: { "@id": websiteId(lang) },
    about: { "@id": `${url}#service` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mainEntity: { "@id": `${url}#service` },
    publisher: { "@id": ORGANIZATION_ID },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel(lang), item: localizedUrl("/", lang) },
      { "@type": "ListItem", position: 2, name: parentName, item: parentUrl },
      { "@type": "ListItem", position: 3, name: page.navLabel, item: url },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, service, breadcrumb, buildFaqPage(url, page.faq.items, lang)],
  };
}
