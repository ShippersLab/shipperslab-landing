import type { Metadata } from "next";

import { TiendanubePage } from "@/components/sections/tiendanube";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildTiendanubeStructuredData } from "@/lib/seo/structured-data";
import { TIENDANUBE_PATH } from "@/lib/services";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/integraciones/tiendanube">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).tiendanube;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: TIENDANUBE_PATH,
    lang,
  });
}

export default async function TiendanubeServicePage({
  params,
}: PageProps<"/[lang]/integraciones/tiendanube">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildTiendanubeStructuredData(lang)} />
      <TiendanubePage />
    </>
  );
}
