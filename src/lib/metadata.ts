import type { Metadata } from "next";

import { site } from "@/lib/site";

const TITLE = "ShippersLab";

const DESCRIPTION =
  "Diseñamos y construimos software a medida, automatizaciones y productos con IA para empresas de Argentina y del exterior.";

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
