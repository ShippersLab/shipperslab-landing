import type { Metadata } from "next";

import { site } from "@/lib/site";

const DESCRIPTION =
  "Diseñamos y construimos software a medida, automatizaciones y productos digitales con IA. Trabajamos con clientes de Argentina y del exterior. Contanos qué querés resolver.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "ShippersLab | Software que simplifica tu negocio",
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "es_AR",
    title: "ShippersLab | Software que simplifica tu negocio",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "ShippersLab | Software que simplifica tu negocio",
    description: DESCRIPTION,
  },
};
