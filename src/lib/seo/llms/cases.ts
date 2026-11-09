import es from "@/i18n/messages/es.json";
import { type ProjectSlug } from "@/lib/projects";
import {
  bullets,
  canonical,
  heading,
  joinBlocks,
  labeled,
  page,
  renderCopy,
} from "@/lib/seo/llms/copy";
import { site } from "@/lib/site";

export function buildCasos() {
  const copy = es.casos;

  return page("/casos", [
    copy.metaTitle,
    copy.metaDescription,
    heading(3, copy.title),
    copy.description,
    heading(3, copy.tuturnero.title),
    copy.tuturnero.summary,
    bullets(copy.tuturnero.tags),
    `[${copy.tuturnero.title}](${canonical("/casos/tuturnero")})`,
    labeled(copy.tuturnero.category, copy.tuturnero.summary),
    heading(3, copy.eventops.title),
    copy.eventops.summary,
    bullets(copy.eventops.tags),
    `[${copy.eventops.title}](${canonical("/casos/eventops")})`,
    labeled(copy.eventops.category, copy.eventops.summary),
    heading(3, copy.estacionar.title),
    copy.estacionar.summary,
    labeled(copy.estacionar.category, copy.estacionar.heroAlt),
    bullets(copy.estacionar.tags),
    `[${copy.estacionar.title}](${canonical("/casos/estacionar")})`,
    heading(3, copy.soon.title),
    copy.soon.description,
    heading(3, copy.ctaTitle),
    copy.ctaDescription,
    `[${copy.ctaButton}](${canonical("/empecemos")})`,
  ]);
}

function buildTuturnero() {
  const copy = es.casos.tuturnero;

  return page("/casos/tuturnero", [
    copy.metaTitle,
    copy.metaDescription,
    `[${copy.backLabel}](${canonical("/casos")})`,
    copy.eyebrow,
    heading(3, copy.title),
    copy.lead,
    `[${copy.visitLabel}](${site.tuturneroUrl})`,
    copy.heroAlt,
    copy.factsLabel,
    ...copy.facts.map((fact) => labeled(fact.label, fact.value)),
    bullets(copy.features),
    ...copy.sections.map((section) =>
      joinBlocks([heading(3, section.title), ...section.body.map(renderCopy)]),
    ),
    heading(3, copy.productTitle),
    copy.productDescription,
    `[${copy.productCta}](${site.tuturneroUrl})`,
    heading(3, copy.galleryTitle),
    bullets(copy.galleryAlts),
  ]);
}

function buildEventops() {
  const copy = es.casos.eventops;

  return page("/casos/eventops", [
    copy.metaTitle,
    copy.metaDescription,
    `[${copy.backLabel}](${canonical("/casos")})`,
    copy.eyebrow,
    heading(3, copy.title),
    copy.lead,
    `[${copy.visitLabel}](${site.eventopsUrl})`,
    copy.heroAlt,
    copy.factsLabel,
    ...copy.facts.map((fact) => labeled(fact.label, fact.value)),
    ...copy.sections.map((section) =>
      joinBlocks([heading(3, section.title), ...section.body.map(renderCopy)]),
    ),
    heading(3, copy.productTitle),
    copy.productDescription,
    `[${copy.productCta}](${site.eventopsUrl})`,
    heading(3, copy.galleryTitle),
    bullets(copy.galleryAlts),
  ]);
}

function buildEstacionar() {
  const copy = es.casos.estacionar;

  return page("/casos/estacionar", [
    copy.metaTitle,
    copy.metaDescription,
    `[${copy.backLabel}](${canonical("/casos")})`,
    copy.eyebrow,
    heading(3, copy.title),
    copy.lead,
    bullets(copy.tags),
    copy.status,
    ...copy.images.map((image) => image.alt),
    ...copy.sections.map((section) => joinBlocks([heading(3, section.title), ...section.body])),
    copy.factsLabel,
    ...copy.facts.map((fact) => labeled(fact.label, fact.value)),
  ]);
}

export function buildProject(slug: ProjectSlug) {
  switch (slug) {
    case "eventops":
      return buildEventops();
    case "estacionar":
      return buildEstacionar();
    case "tuturnero":
      return buildTuturnero();
    default: {
      const pending: never = slug;
      throw new Error(`llms-full is missing project page: ${pending}`);
    }
  }
}
