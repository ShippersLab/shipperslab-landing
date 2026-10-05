import type { Metadata } from "next";

import { site } from "@/lib/site";

const TITLE = "ShippersLab";

const DESCRIPTION =
  "Sistemas de gestión, integraciones, bots de WhatsApp y webs para pymes y comercios de Argentina. Alcance por escrito y avance cada semana.";

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
