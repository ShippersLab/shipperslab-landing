import type { Metadata } from "next";

import { Events } from "@/components/sections/events";
import { site } from "@/lib/site";

const TITLE = "ShippersLab | Eventos";
const DESCRIPTION =
  "Estamos armando las primeras build nights, meetups y hackathons para gente que construye en Argentina. Escribinos a eventos@shipperslab.tech.";

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
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function EventosPage() {
  return <Events />;
}
