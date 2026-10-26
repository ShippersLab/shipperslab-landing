import es from "@/i18n/messages/es.json";
import {
  bullets,
  canonical,
  heading,
  joinBlocks,
  labeled,
  page,
  renderCopy,
} from "@/lib/seo/llms-copy";
import { type ProjectSlug } from "@/lib/projects";
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
    heading(3, copy.soon.title),
    labeled(copy.soon.label, copy.soon.description),
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
    heading(3, copy.galleryTitle),
    bullets(copy.galleryAlts),
  ]);
}

export function buildProject(slug: ProjectSlug) {
  switch (slug) {
    case "eventops":
      return buildEventops();
    default: {
      const pending: never = slug;
      throw new Error(`llms-full is missing project page: ${pending}`);
    }
  }
}
