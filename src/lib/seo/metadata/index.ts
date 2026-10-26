import type { Metadata } from "next";

import { openGraphLocales, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import { site } from "@/lib/site";

export function buildRootMetadata(lang: Locale): Metadata {
  const { title, description, keywords } = getMessages(lang).seo.home;
  const alternateLocale = Object.values(openGraphLocales).filter(
    (locale) => locale !== openGraphLocales[lang],
  );

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description,
    applicationName: site.name,
    keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      url: localizedUrl("/", lang),
      siteName: site.name,
      locale: openGraphLocales[lang],
      alternateLocale,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: site.social.xHandle,
      creator: site.social.xHandle,
      title,
      description,
    },
  };
}
