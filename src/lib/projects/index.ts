export const projectRoutes = [{ slug: "eventops" }] as const;

export type ProjectSlug = (typeof projectRoutes)[number]["slug"];
