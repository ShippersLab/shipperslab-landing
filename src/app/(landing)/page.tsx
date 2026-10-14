import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { homeStructuredData } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <Hero />
      <Services />
      <Process />
      <Team />
      <Faq />
      <Contact />
    </>
  );
}
