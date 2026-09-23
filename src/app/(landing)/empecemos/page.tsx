import type { Metadata } from "next";

import { Onboarding } from "@/components/sections/onboarding";
import { site } from "@/lib/site";

const TITLE = "ShippersLab | Empecemos";
const DESCRIPTION =
  "Contanos qué querés construir en tres pasos. Te responde alguien del equipo que lo va a construir.";

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
    title: TITLE,
    description: DESCRIPTION,
    images: IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: IMAGES,
  },
};

export default function EmpecemosPage() {
  return <Onboarding />;
}
