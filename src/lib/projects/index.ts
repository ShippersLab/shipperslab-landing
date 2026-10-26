export const projectRoutes = [{ slug: "eventops" }, { slug: "estacionar" }] as const;

export type ProjectSlug = (typeof projectRoutes)[number]["slug"];
