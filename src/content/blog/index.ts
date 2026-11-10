import { meta as comoMigrarDeWoocommerceATiendanube } from "@/content/blog/como-migrar-de-woocommerce-a-tiendanube/meta";
import { meta as comoOrganizarUnaEmpresaDeEventos } from "@/content/blog/como-organizar-una-empresa-de-eventos/meta";
import { meta as comoPagarleAlPersonalDeEventos } from "@/content/blog/como-pagarle-al-personal-de-eventos/meta";
import { meta as comoSaberSiTuNegocioNecesitaPaginaWeb } from "@/content/blog/como-saber-si-tu-negocio-necesita-pagina-web/meta";
import { meta as cuantoCuestaUnSistemaDeGestionAMedida } from "@/content/blog/cuanto-cuesta-un-sistema-de-gestion-a-medida/meta";
import { meta as excelOSistemaDeGestion } from "@/content/blog/excel-o-sistema-de-gestion/meta";
import { meta as queCambiaEnLaFacturaElectronicaDeArca } from "@/content/blog/que-cambia-en-la-factura-electronica-de-arca/meta";
import type { BlogPostEntry } from "@/content/blog/types";

export const blogPosts = [
  excelOSistemaDeGestion,
  comoMigrarDeWoocommerceATiendanube,
  comoPagarleAlPersonalDeEventos,
  cuantoCuestaUnSistemaDeGestionAMedida,
  comoOrganizarUnaEmpresaDeEventos,
  comoSaberSiTuNegocioNecesitaPaginaWeb,
  queCambiaEnLaFacturaElectronicaDeArca,
] as const satisfies readonly BlogPostEntry[];

export type BlogPostMeta = (typeof blogPosts)[number];

export type BlogSlug = BlogPostMeta["slug"];
