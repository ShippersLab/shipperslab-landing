import type { Metadata } from "next";

import { Casos } from "@/components/sections/casos";
import { site } from "@/lib/site";
import { getMessages } from "@/i18n/get-messages";

const messages = getMessages("es").casos;
const TITLE = messages.metaTitle;
const DESCRIPTION = messages.metaDescription;
const PATH = "/casos";

const IMAGES = [{ url: `${site.url}/opengraph-image.jpg`, width: 1200, height: 630 }];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    type: "website",
    url: `${site.url}${PATH}`,
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

export default function CasosPage() {
  return <Casos />;
}
