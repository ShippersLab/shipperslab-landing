import { meta as comoOrganizarUnaEmpresaDeEventos } from "@/content/blog/como-organizar-una-empresa-de-eventos/meta";
import { meta as comoPagarleAlPersonalDeEventos } from "@/content/blog/como-pagarle-al-personal-de-eventos/meta";
import { meta as comoSaberSiTuNegocioNecesitaPaginaWeb } from "@/content/blog/como-saber-si-tu-negocio-necesita-pagina-web/meta";
import { meta as cuantoCuestaUnSistemaDeGestionAMedida } from "@/content/blog/cuanto-cuesta-un-sistema-de-gestion-a-medida/meta";
import type { BlogPostEntry } from "@/content/blog/types";

export const blogPosts = [
  comoPagarleAlPersonalDeEventos,
  cuantoCuestaUnSistemaDeGestionAMedida,
  comoOrganizarUnaEmpresaDeEventos,
  comoSaberSiTuNegocioNecesitaPaginaWeb,
] as const satisfies readonly BlogPostEntry[];

export type BlogPostMeta = (typeof blogPosts)[number];

export type BlogSlug = BlogPostMeta["slug"];
