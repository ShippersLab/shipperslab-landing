export const serviceRoutes = [
  {
    id: "systems",
    slug: "sistemas-de-gestion",
  },
  {
    id: "presence",
    slug: "webs-y-catalogos",
  },
  {
    id: "bots",
    slug: "bots-con-ia",
  },
  {
    id: "integrations",
    slug: "integraciones",
  },
] as const;

export type ServiceId = (typeof serviceRoutes)[number]["id"];
export type ServiceSlug = (typeof serviceRoutes)[number]["slug"];

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceRoutes.some((route) => route.slug === value);
}

export function getServiceRouteById(id: string) {
  return serviceRoutes.find((route) => route.id === id);
}

export function getServiceHref(id: string) {
  const route = getServiceRouteById(id);
  return route ? `/${route.slug}` : undefined;
}
