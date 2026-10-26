import type { Metadata } from "next";

import { Events } from "@/components/sections/events";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildPageBreadcrumbStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/eventos">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { title, description } = getMessages(lang).seo.eventos;

  return buildPageMetadata({ title, description, path: "/eventos", lang });
}

export default async function EventosPage({ params }: PageProps<"/[lang]/eventos">) {
  const lang = await resolveLocale(params);
  const { links } = getMessages(lang).footer;

  return (
    <>
      <JsonLd data={buildPageBreadcrumbStructuredData("/eventos", links.eventos, lang)} />
      <Events />
    </>
  );
}
