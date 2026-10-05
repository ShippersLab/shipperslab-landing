import type { Metadata } from "next";

import { site } from "@/lib/site";

const TITLE = "ShippersLab | Software a medida para pymes y comercios";

const DESCRIPTION =
  "Software a medida para pymes y comercios de Argentina: sistemas de gestión, integraciones, bots de WhatsApp y webs. Alcance y precio por escrito antes de arrancar.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "es_AR",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};
