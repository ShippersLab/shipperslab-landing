import type { Metadata } from "next";

import { Onboarding } from "@/components/sections/onboarding";
import { site } from "@/lib/site";

const TITLE = "Contanos tu problema";
const DESCRIPTION =
  "Contanos qué te lleva tiempo o qué querés ordenar en tu negocio. Te responde alguien del equipo con alcance y precio por escrito.";

const IMAGES = [{ url: `${site.url}/opengraph-image.jpg`, width: 1200, height: 630 }];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/empecemos",
  },
  openGraph: {
    type: "website",
    url: `${site.url}/empecemos`,
    siteName: site.name,
    locale: "es_AR",
    title: `${site.name} | ${TITLE}`,
    description: DESCRIPTION,
    images: IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${TITLE}`,
    description: DESCRIPTION,
    images: IMAGES,
  },
};

export default function EmpecemosPage() {
  return <Onboarding />;
}
