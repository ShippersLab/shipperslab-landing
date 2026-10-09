import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

type SitemapRoute = {
  path: string;
  lastModified: string;
  priority: number;
};

const routes: SitemapRoute[] = [
  { path: "", lastModified: "2026-10-07", priority: 1 },
  { path: "/casos", lastModified: "2026-10-07", priority: 0.8 },
  { path: "/empecemos", lastModified: "2026-10-07", priority: 0.9 },
  { path: "/sistemas-de-gestion", lastModified: "2026-10-08", priority: 0.85 },
  { path: "/webs-y-catalogos", lastModified: "2026-10-08", priority: 0.85 },
  { path: "/bots-con-ia", lastModified: "2026-10-08", priority: 0.85 },
  { path: "/integraciones", lastModified: "2026-10-08", priority: 0.85 },
  { path: "/eventos", lastModified: "2026-10-07", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
