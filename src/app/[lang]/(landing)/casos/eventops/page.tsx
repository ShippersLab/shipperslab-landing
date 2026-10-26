import type { Metadata } from "next";

import { ProjectDetail } from "@/components/sections/casos/project-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { buildPageMetadata } from "@/lib/seo/metadata/page";
import { buildEventopsCaseStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/casos/eventops">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const messages = getMessages(lang).casos.eventops;

  return buildPageMetadata({
    title: messages.metaTitle,
    description: messages.metaDescription,
    path: "/casos/eventops",
    lang,
  });
}

export default async function EventopsCasePage({ params }: PageProps<"/[lang]/casos/eventops">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildEventopsCaseStructuredData(lang)} />
      <ProjectDetail />
    </>
  );
}
