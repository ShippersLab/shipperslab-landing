export const projectRoutes = [
  { slug: "eventops" },
  { slug: "estacionar" },
  { slug: "tuturnero" },
] as const;

export type ProjectSlug = (typeof projectRoutes)[number]["slug"];
