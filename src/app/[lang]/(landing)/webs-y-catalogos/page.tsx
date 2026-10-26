import type { Metadata } from "next";

import { ServicePage } from "@/components/sections/service-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildServiceStructuredData } from "@/lib/seo/structured-data";

const SLUG = "webs-y-catalogos" as const;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/webs-y-catalogos">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).servicePages[SLUG];

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: `/${SLUG}`,
    lang,
  });
}

export default async function WebsYCatalogosPage({
  params,
}: PageProps<"/[lang]/webs-y-catalogos">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildServiceStructuredData(SLUG, lang)} />
      <ServicePage slug={SLUG} />
    </>
  );
}
