import "server-only";

import comoMigrarDeWoocommerceATiendanubeEn from "@/content/blog/como-migrar-de-woocommerce-a-tiendanube/en.json";
import comoMigrarDeWoocommerceATiendanubeEs from "@/content/blog/como-migrar-de-woocommerce-a-tiendanube/es.json";
import comoOrganizarUnaEmpresaDeEventosEn from "@/content/blog/como-organizar-una-empresa-de-eventos/en.json";
import comoOrganizarUnaEmpresaDeEventosEs from "@/content/blog/como-organizar-una-empresa-de-eventos/es.json";
import comoPagarleAlPersonalDeEventosEn from "@/content/blog/como-pagarle-al-personal-de-eventos/en.json";
import comoPagarleAlPersonalDeEventosEs from "@/content/blog/como-pagarle-al-personal-de-eventos/es.json";
import comoSaberSiTuNegocioNecesitaPaginaWebEn from "@/content/blog/como-saber-si-tu-negocio-necesita-pagina-web/en.json";
import comoSaberSiTuNegocioNecesitaPaginaWebEs from "@/content/blog/como-saber-si-tu-negocio-necesita-pagina-web/es.json";
import cuantoCuestaUnSistemaDeGestionAMedidaEn from "@/content/blog/cuanto-cuesta-un-sistema-de-gestion-a-medida/en.json";
import cuantoCuestaUnSistemaDeGestionAMedidaEs from "@/content/blog/cuanto-cuesta-un-sistema-de-gestion-a-medida/es.json";
import type { BlogSlug } from "@/content/blog";
import type { BlogPostContent, BlogPostSummary } from "@/content/blog/types";
import type { Locale } from "@/i18n/config";
import { getReadingMinutes } from "@/lib/blog";

const blogPostContent = {
  "como-migrar-de-woocommerce-a-tiendanube": {
    es: comoMigrarDeWoocommerceATiendanubeEs,
    en: comoMigrarDeWoocommerceATiendanubeEn,
  },
  "como-pagarle-al-personal-de-eventos": {
    es: comoPagarleAlPersonalDeEventosEs,
    en: comoPagarleAlPersonalDeEventosEn,
  },
  "cuanto-cuesta-un-sistema-de-gestion-a-medida": {
    es: cuantoCuestaUnSistemaDeGestionAMedidaEs,
    en: cuantoCuestaUnSistemaDeGestionAMedidaEn,
  },
  "como-organizar-una-empresa-de-eventos": {
    es: comoOrganizarUnaEmpresaDeEventosEs,
    en: comoOrganizarUnaEmpresaDeEventosEn,
  },
  "como-saber-si-tu-negocio-necesita-pagina-web": {
    es: comoSaberSiTuNegocioNecesitaPaginaWebEs,
    en: comoSaberSiTuNegocioNecesitaPaginaWebEn,
  },
} satisfies Record<BlogSlug, Record<Locale, BlogPostContent>>;

export function getBlogPostContent(slug: BlogSlug, locale: Locale): BlogPostContent {
  return blogPostContent[slug][locale];
}

export function getBlogPostSummary(slug: BlogSlug, locale: Locale): BlogPostSummary {
  const content = getBlogPostContent(slug, locale);
  return {
    title: content.title,
    excerpt: content.excerpt,
    readingMinutes: getReadingMinutes(content),
  };
}
