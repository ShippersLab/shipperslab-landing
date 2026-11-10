import type { Metadata } from "next";

import { ServicePage } from "@/components/sections/service-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildMercadoPagoStructuredData } from "@/lib/seo/structured-data";
import { MERCADO_PAGO_PATH } from "@/lib/services";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/integraciones/mercado-pago">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).mercadoPago;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: MERCADO_PAGO_PATH,
    lang,
  });
}

export default async function MercadoPagoServicePage({
  params,
}: PageProps<"/[lang]/integraciones/mercado-pago">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildMercadoPagoStructuredData(lang)} />
      <ServicePage slug="mercadoPago" />
    </>
  );
}
