import { ServicePage } from "@/components/sections/service-page";
import { getMessages } from "@/i18n/get-messages";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const SLUG = "bots-con-ia" as const;
const messages = getMessages("es").servicePages[SLUG];

export const metadata = buildPageMetadata({
  title: messages.metaTitle,
  description: messages.metaDescription,
  path: `/${SLUG}`,
});

export default function BotsConIaPage() {
  return <ServicePage slug={SLUG} />;
}
