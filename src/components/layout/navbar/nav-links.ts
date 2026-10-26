export type NavLink = {
  key: "services" | "casos" | "events";
  href: string;
  kind: "anchor" | "page";
};

export const NAV_LINKS: readonly NavLink[] = [
  { key: "services", href: "/#servicios", kind: "anchor" },
  { key: "casos", href: "/casos", kind: "page" },
  { key: "events", href: "/eventos", kind: "page" },
];
