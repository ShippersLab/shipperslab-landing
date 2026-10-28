import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { languageAlternates, localizedUrl } from "@/i18n/paths";
import { getPublishedBlogPosts } from "@/lib/blog";
import { projectRoutes } from "@/lib/projects";
import { serviceRoutes, TIENDANUBE_PATH } from "@/lib/services";

const routes: { path: string; priority: number; lastModified?: string }[] = [
  { path: "", priority: 1 },
  { path: "/casos", priority: 0.8 },
  ...projectRoutes.map((route) => ({ path: `/casos/${route.slug}`, priority: 0.7 })),
  { path: "/empecemos", priority: 0.9 },
  { path: "/como-trabajamos", priority: 0.8 },
  ...serviceRoutes.map((route) => ({ path: `/${route.slug}`, priority: 0.85 })),
  { path: TIENDANUBE_PATH, priority: 0.8 },
  { path: "/eventos", priority: 0.8 },
  { path: "/blog", priority: 0.7 },
  ...getPublishedBlogPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
    lastModified: post.datePublished,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((lang) => ({
      url: localizedUrl(route.path || "/", lang),
      changeFrequency: "monthly" as const,
      ...(route.lastModified ? { lastModified: route.lastModified } : {}),
      priority: route.priority,
      alternates: { languages: languageAlternates(route.path || "/") },
    })),
  );
}
