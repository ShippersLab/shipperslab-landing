import type { Metadata } from "next";

import { TuturneroDetail } from "@/components/sections/casos/tuturnero-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildTuturneroCaseStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/casos/tuturnero">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).casos.tuturnero;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: "/casos/tuturnero",
    lang,
  });
}

export default async function TuturneroCasePage({ params }: PageProps<"/[lang]/casos/tuturnero">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildTuturneroCaseStructuredData(lang)} />
      <TuturneroDetail />
    </>
  );
}
