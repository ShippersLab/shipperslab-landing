import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog";
import { projectRoutes } from "@/lib/projects";
import { serviceRoutes } from "@/lib/services";
import { site } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/casos", priority: 0.8 },
  ...projectRoutes.map((route) => ({ path: `/casos/${route.slug}`, priority: 0.7 })),
  { path: "/empecemos", priority: 0.9 },
  { path: "/como-trabajamos", priority: 0.8 },
  ...serviceRoutes.map((route) => ({ path: `/${route.slug}`, priority: 0.85 })),
  { path: "/eventos", priority: 0.8 },
  { path: "/blog", priority: 0.7 },
  ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, priority: 0.6 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
