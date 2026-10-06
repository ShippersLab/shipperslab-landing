import type { Metadata } from "next";

import { site } from "@/lib/site";

const TITLE = "ShippersLab | Software a medida para pymes y comercios";

export const DESCRIPTION =
  "Software a medida para pymes y comercios de Argentina: sistemas de gestión, integraciones, bots de WhatsApp y webs. Alcance y precio por escrito antes de arrancar.";

const KEYWORDS = [
  "software a medida",
  "software a medida para pymes",
  "sistema de gestión a medida",
  "sistema de stock",
  "sistema de turnos",
  "bot de WhatsApp para negocios",
  "agentes de IA",
  "integraciones",
  "desarrollo web para comercios",
  "catálogo con pedido por WhatsApp",
  "desarrollo de software Argentina",
  "desarrollo de software",
];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: `${site.name} | %s`,
  },
  description: DESCRIPTION,
  applicationName: site.name,
  keywords: KEYWORDS,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "es_AR",
    alternateLocale: ["en_US"],
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: site.social.xHandle,
    creator: site.social.xHandle,
    title: TITLE,
    description: DESCRIPTION,
  },
};
