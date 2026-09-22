import type { Metadata } from "next";

import { Events } from "@/components/sections/events";
import { site } from "@/lib/site";

const TITLE = "ShippersLab | Eventos";
const DESCRIPTION =
  "Estamos armando las primeras build nights, meetups y hackathons en Argentina. Escribinos a eventos@shipperslab.tech.";

const IMAGES = [{ url: `${site.url}/opengraph-image.jpg`, width: 1200, height: 630 }];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/eventos",
  },
  openGraph: {
    type: "website",
    url: `${site.url}/eventos`,
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

export default function EventosPage() {
  return <Events />;
}
