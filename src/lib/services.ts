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

export type ServiceSlug = (typeof serviceRoutes)[number]["slug"];

export const TIENDANUBE_PATH = "/integraciones/tiendanube";

function getServiceRouteById(id: string) {
  return serviceRoutes.find((route) => route.id === id);
}

export function getServiceHref(id: string) {
  const route = getServiceRouteById(id);
  return route ? `/${route.slug}` : undefined;
}
