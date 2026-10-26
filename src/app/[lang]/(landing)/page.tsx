import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { JsonLd } from "@/components/seo/json-ld";
import { resolveLocale } from "@/i18n/params";
import { buildHomeMetadata } from "@/lib/seo/metadata/page";
import { buildHomeStructuredData } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  return buildHomeMetadata(await resolveLocale(params));
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = await resolveLocale(params);

  return (
    <>
      <JsonLd data={buildHomeStructuredData(lang)} />
      <Hero />
      <Services />
      <Team />
      <Faq />
      <Cta />
    </>
  );
}
