import { JsonLd } from "@/components/seo/json-ld";
import { ServicePage } from "@/components/sections/service-page";
import { getMessages } from "@/i18n/get-messages";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { buildServiceStructuredData } from "@/lib/seo/structured-data";

const SLUG = "integraciones" as const;
const messages = getMessages("es").servicePages[SLUG];

export const metadata = buildPageMetadata({
  title: messages.metaTitle,
  description: messages.metaDescription,
  path: `/${SLUG}`,
});

export default function IntegracionesPage() {
  return (
    <>
      <JsonLd data={buildServiceStructuredData(SLUG)} />
      <ServicePage slug={SLUG} />
    </>
  );
}
