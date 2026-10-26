import type { Metadata } from "next";

import { ComoTrabajamos } from "@/components/sections/como-trabajamos";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildComoTrabajamosStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/como-trabajamos">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).comoTrabajamos;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: "/como-trabajamos",
    lang,
  });
}

export default async function ComoTrabajamosPage({ params }: PageProps<"/[lang]/como-trabajamos">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildComoTrabajamosStructuredData(lang)} />
      <ComoTrabajamos />
    </>
  );
}
