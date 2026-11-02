import type { Metadata } from "next";

import { ServicePage } from "@/components/sections/service-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildPedidosStructuredData } from "@/lib/seo/structured-data";
import { PEDIDOS_PATH } from "@/lib/services";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/sistemas-de-gestion/pedidos">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).pedidos;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: PEDIDOS_PATH,
    lang,
  });
}

export default async function PedidosServicePage({
  params,
}: PageProps<"/[lang]/sistemas-de-gestion/pedidos">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildPedidosStructuredData(lang)} />
      <ServicePage slug="pedidos" />
    </>
  );
}
