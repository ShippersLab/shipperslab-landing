import type { Metadata } from "next";

import { Onboarding } from "@/components/sections/onboarding";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildPageBreadcrumbStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/empecemos">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { title, description } = getMessages(lang).seo.empecemos;

  return buildPageMetadata({ title, description, path: "/empecemos", lang });
}

export default async function EmpecemosPage({ params }: PageProps<"/[lang]/empecemos">) {
  const lang = await resolveLocale(params);
  const { links } = getMessages(lang).footer;

  return (
    <>
      <JsonLd data={buildPageBreadcrumbStructuredData("/empecemos", links.empecemos, lang)} />
      <Onboarding />
    </>
  );
}
