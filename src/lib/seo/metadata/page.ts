import type { Metadata } from "next";

import { openGraphLocales, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { languageAlternates, localizedUrl } from "@/i18n/paths";
import { site } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  lang: Locale;
};

const IMAGES = [{ url: `${site.url}/opengraph-image.jpg`, width: 1200, height: 630 }];

function alternateOpenGraphLocales(lang: Locale) {
  return Object.values(openGraphLocales).filter((locale) => locale !== openGraphLocales[lang]);
}

export function buildPageMetadata({ title, description, path, lang }: PageMetadataInput): Metadata {
  const url = localizedUrl(path, lang);
  const fullTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: openGraphLocales[lang],
      alternateLocale: alternateOpenGraphLocales(lang),
      title: fullTitle,
      description,
      images: IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: IMAGES,
    },
  };
}

export function buildHomeMetadata(lang: Locale): Metadata {
  const { title, description } = getMessages(lang).seo.home;
  const url = localizedUrl("/", lang);

  return {
    alternates: {
      canonical: url,
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: openGraphLocales[lang],
      alternateLocale: alternateOpenGraphLocales(lang),
      title,
      description,
      images: IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      site: site.social.xHandle,
      creator: site.social.xHandle,
      title,
      description,
      images: IMAGES,
    },
  };
}
