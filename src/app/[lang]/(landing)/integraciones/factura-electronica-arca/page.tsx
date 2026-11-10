import type { Metadata } from "next";

import { ServicePage } from "@/components/sections/service-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildFacturaElectronicaArcaStructuredData } from "@/lib/seo/structured-data";
import { FACTURA_ELECTRONICA_ARCA_PATH } from "@/lib/services";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/integraciones/factura-electronica-arca">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).facturaElectronicaArca;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: FACTURA_ELECTRONICA_ARCA_PATH,
    lang,
  });
}

export default async function FacturaElectronicaArcaPage({
  params,
}: PageProps<"/[lang]/integraciones/factura-electronica-arca">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildFacturaElectronicaArcaStructuredData(lang)} />
      <ServicePage slug="facturaElectronicaArca" />
    </>
  );
}
