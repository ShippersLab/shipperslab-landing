import type { Metadata } from "next";

import { BrandingDetail } from "@/components/sections/casos/branding-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildEstacionarCaseStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/casos/estacionar">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).casos.estacionar;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: "/casos/estacionar",
    lang,
  });
}

export default async function EstacionarCasePage({
  params,
}: PageProps<"/[lang]/casos/estacionar">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildEstacionarCaseStructuredData(lang)} />
      <BrandingDetail />
    </>
  );
}
