import type { Metadata } from "next";

import { Casos } from "@/components/sections/casos";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildCasosStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/casos">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).casos;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: "/casos",
    lang,
  });
}

export default async function CasosPage({ params }: PageProps<"/[lang]/casos">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildCasosStructuredData(lang)} />
      <Casos />
    </>
  );
}
