import type { Metadata } from "next";

import { site } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = `${site.url}${path}`;
  const images = [{ url: `${site.url}/opengraph-image.jpg`, width: 1200, height: 630 }];
  const fullTitle = `${site.name} | ${title}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: "es_AR",
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
