import { JsonLd } from "@/components/seo/json-ld";
import { ComoTrabajamos } from "@/components/sections/como-trabajamos";
import { getMessages } from "@/i18n/get-messages";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { buildComoTrabajamosStructuredData } from "@/lib/seo/structured-data";

const messages = getMessages("es").comoTrabajamos;

export const metadata = buildPageMetadata({
  title: messages.metaTitle,
  description: messages.metaDescription,
  path: "/como-trabajamos",
});

export default function ComoTrabajamosPage() {
  return (
    <>
      <JsonLd data={buildComoTrabajamosStructuredData()} />
      <ComoTrabajamos />
    </>
  );
}
