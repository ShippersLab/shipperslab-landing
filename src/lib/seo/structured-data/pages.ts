import type { BreadcrumbList, FAQPage, Graph } from "schema-dts";

import { languageTags, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import { homeLabel, websiteId } from "@/lib/seo/structured-data/shared";

type BreadcrumbParent = {
  name: string;
  path: string;
};

export function buildPageBreadcrumbStructuredData(
  path: string,
  name: string,
  lang: Locale,
  parents: BreadcrumbParent[] = [],
): Graph {
  const url = localizedUrl(path, lang);
  const trail = [
    { name: homeLabel(lang), item: localizedUrl("/", lang) },
    ...parents.map((parent) => ({
      name: parent.name,
      item: localizedUrl(parent.path, lang),
    })),
    { name, item: url },
  ];

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumb],
  };
}

export function buildFaqPage(
  url: string,
  items: readonly { question: string; answer: string }[],
  lang: Locale,
): FAQPage {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    isPartOf: { "@id": websiteId(lang) },
    inLanguage: languageTags[lang],
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildComoTrabajamosStructuredData(lang: Locale): Graph {
  const page = getMessages(lang).comoTrabajamos;
  const path = "/como-trabajamos";
  const url = localizedUrl(path, lang);

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...buildPageBreadcrumbStructuredData(path, page.navLabel, lang)["@graph"],
      buildFaqPage(url, page.faq.items, lang),
    ],
  };
}
