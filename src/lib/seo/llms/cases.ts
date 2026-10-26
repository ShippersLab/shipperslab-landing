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
    heading(3, copy.overviewTitle),
    renderCopy(copy.overview),
    heading(3, copy.approachTitle),
    copy.approach,
    heading(3, copy.flowTitle),
    copy.flowDescription,
    ...copy.flow.map((step) => joinBlocks([heading(4, step.title), step.body])),
    heading(3, copy.featuresTitle),
    ...copy.features.map((feature) => joinBlocks([heading(4, feature.title), feature.body])),
    heading(3, copy.doneTitle),
    bullets(copy.done),
    heading(3, copy.whyTitle),
    copy.why,
    heading(3, copy.customersTitle),
    copy.customers,
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
    heading(3, copy.ideaTitle),
    copy.idea,
    heading(3, copy.whyTitle),
    copy.why,
    heading(3, copy.howTitle),
    copy.howIntro,
    ...copy.how.map((item) => joinBlocks([heading(4, item.title), item.body])),
    copy.factsLabel,
    ...copy.facts.map((fact) => labeled(fact.label, fact.value)),
    heading(3, copy.doneTitle),
    bullets(copy.done),
    heading(3, copy.brandTitle),
    copy.brand,
    heading(3, copy.stageTitle),
    copy.stage,
  ]);
}

export function buildProject(slug: ProjectSlug) {
  switch (slug) {
    case "eventops":
      return buildEventops();
    case "estacionar":
      return buildEstacionar();
    default: {
      const pending: never = slug;
      throw new Error(`llms-full is missing project page: ${pending}`);
    }
  }
}
