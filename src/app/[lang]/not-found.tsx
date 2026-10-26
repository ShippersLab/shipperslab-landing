import type { Metadata } from "next";
import { lang } from "next/root-params";

import { NotFoundContent } from "@/components/sections/not-found";
import { isLocale, openGraphLocales, defaultLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const current = await lang();
  const locale = isLocale(current) ? current : defaultLocale;
  const title = getMessages(locale).seo.notFound.title;
  const fullTitle = `${title} | ${site.name}`;

  return {
    title,
    robots: null,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: openGraphLocales[locale],
      title: fullTitle,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
    },
  };
}

export default function NotFound() {
  return <NotFoundContent />;
}
