import type { Metadata } from "next";

import { NotFoundContent } from "@/components/sections/not-found";
import { site } from "@/lib/site";

const TITLE = "Página no encontrada";
const FULL_TITLE = `${TITLE} | ${site.name}`;

export const metadata: Metadata = {
  title: TITLE,
  robots: null,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "es_AR",
    title: FULL_TITLE,
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
