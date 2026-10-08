import type { BreadcrumbList, FAQPage, Graph, Organization, Service, WebSite } from "schema-dts";

import es from "@/i18n/messages/es.json";
import { DESCRIPTION } from "@/lib/seo/metadata";
import { plainText, singleLine } from "@/lib/seo/text";
import type { ServiceSlug } from "@/lib/services";
import { serviceRoutes } from "@/lib/services";
import { site } from "@/lib/site";

const ORGANIZATION_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

const organization: Organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo/accent.svg`,
  image: `${site.url}/opengraph-image.jpg`,
  description: DESCRIPTION,
  slogan: "Software a medida para tu negocio.",
  email: site.emails.contact,
  areaServed: { "@type": "Country", name: "Argentina" },
  address: { "@type": "PostalAddress", addressCountry: "AR" },
  knowsAbout: [
    "Software a medida",
    "Sistemas de gestión",
    "Integraciones",
    "Bots con IA",
    "Agentes de IA",
    "Desarrollo web",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.emails.contact,
    areaServed: "AR",
  },
  sameAs: [site.social.instagram, site.social.x],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios",
    itemListElement: es.services.items.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: singleLine(service.title),
        description: plainText(service.description),
        audience: { "@type": "BusinessAudience", audienceType: service.audience },
        areaServed: "AR",
        provider: { "@id": ORGANIZATION_ID },
      },
    })),
  },
};

const website: WebSite = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  inLanguage: "es-AR",
  publisher: { "@id": ORGANIZATION_ID },
};

const faqPage: FAQPage = {
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  isPartOf: { "@id": WEBSITE_ID },
  inLanguage: "es-AR",
  mainEntity: es.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export const homeStructuredData: Graph = {
  "@context": "https://schema.org",
  "@graph": [organization, website, faqPage],
};

export function buildServiceStructuredData(slug: ServiceSlug): Graph {
  const page = es.servicePages[slug];
  const route = serviceRoutes.find((item) => item.slug === slug);
  const item = es.services.items.find((service) => service.id === route?.id);
  const url = `${site.url}/${slug}`;

  const service: Service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: item ? singleLine(item.title) : page.navLabel,
    description: page.metaDescription,
    serviceType: page.navLabel,
    url,
    areaServed: { "@type": "Country", name: "Argentina" },
    ...(item && { audience: { "@type": "BusinessAudience", audienceType: item.audience } }),
    provider: { "@type": "Organization", "@id": ORGANIZATION_ID, name: site.name, url: site.url },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: page.navLabel, item: url },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [service, breadcrumb],
  };
}
