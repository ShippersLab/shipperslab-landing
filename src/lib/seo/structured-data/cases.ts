import type {
  BreadcrumbList,
  CollectionPage,
  Graph,
  SoftwareApplication,
  WebPage,
} from "schema-dts";

import { languageTags, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import { estacionarImages } from "@/lib/projects/estacionar";
import { eventopsImages } from "@/lib/projects/eventops";
import {
  casosLabel,
  homeLabel,
  ORGANIZATION_ID,
  websiteId,
} from "@/lib/seo/structured-data/shared";
import { site } from "@/lib/site";

function caseUrls(lang: Locale) {
  const casos = localizedUrl("/casos", lang);
  return {
    casos,
    eventops: `${casos}/eventops`,
    estacionar: `${casos}/estacionar`,
    home: localizedUrl("/", lang),
  };
}

export function buildCasosStructuredData(lang: Locale): Graph {
  const page = getMessages(lang).casos;
  const urls = caseUrls(lang);

  const collection: CollectionPage = {
    "@type": "CollectionPage",
    "@id": `${urls.casos}#webpage`,
    url: urls.casos,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: languageTags[lang],
    isPartOf: { "@id": websiteId(lang) },
    about: { "@id": ORGANIZATION_ID },
    breadcrumb: { "@id": `${urls.casos}#breadcrumb` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: page.eventops.title,
          url: urls.eventops,
        },
      ],
    },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${urls.casos}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel(lang), item: urls.home },
      { "@type": "ListItem", position: 2, name: casosLabel(lang), item: urls.casos },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [collection, breadcrumb],
  };
}

export function buildEventopsCaseStructuredData(lang: Locale): Graph {
  const page = getMessages(lang).casos.eventops;
  const urls = caseUrls(lang);

  const app: SoftwareApplication = {
    "@type": "SoftwareApplication",
    "@id": `${urls.eventops}#software`,
    name: page.title,
    description: page.metaDescription,
    url: site.eventopsUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: languageTags[lang],
    audience: {
      "@type": "BusinessAudience",
      audienceType: page.facts[2].value,
    },
    featureList: page.features.map((feature) => feature.title),
    image: `${site.url}${eventopsImages.hero.src}`,
    creator: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      url: site.url,
    },
    publisher: { "@id": ORGANIZATION_ID },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${urls.eventops}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel(lang), item: urls.home },
      { "@type": "ListItem", position: 2, name: casosLabel(lang), item: urls.casos },
      { "@type": "ListItem", position: 3, name: page.title, item: urls.eventops },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [app, breadcrumb],
  };
}

export function buildEstacionarCaseStructuredData(lang: Locale): Graph {
  const page = getMessages(lang).casos.estacionar;
  const urls = caseUrls(lang);

  const article: WebPage = {
    "@type": "WebPage",
    "@id": `${urls.estacionar}#page`,
    name: page.title,
    description: page.metaDescription,
    url: urls.estacionar,
    inLanguage: languageTags[lang],
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${site.url}${estacionarImages.cover.src}`,
    },
    publisher: { "@id": ORGANIZATION_ID },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${urls.estacionar}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel(lang), item: urls.home },
      { "@type": "ListItem", position: 2, name: casosLabel(lang), item: urls.casos },
      { "@type": "ListItem", position: 3, name: page.title, item: urls.estacionar },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [article, breadcrumb],
  };
}
