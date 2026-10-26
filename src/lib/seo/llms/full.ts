import es from "@/i18n/messages/es.json";
import { getPublishedBlogPosts } from "@/lib/blog";
import { projectRoutes } from "@/lib/projects";
import { blogCopy, buildBlogPost } from "@/lib/seo/llms/blog";
import { buildCasos, buildProject } from "@/lib/seo/llms/cases";
import { assertSourceCopy, joinBlocks } from "@/lib/seo/llms/copy";
import { buildHome, buildIdentity } from "@/lib/seo/llms/home";
import { buildEventos } from "@/lib/seo/llms/events";
import { buildComoTrabajamos, buildServicePage } from "@/lib/seo/llms/services";
import { organizationIdentity, organizationSummary } from "@/lib/seo/shared/organization";
import { serviceRoutes, type ServiceSlug } from "@/lib/services";

const SERVICE_PAGE_ORDER = [
  "webs-y-catalogos",
  "sistemas-de-gestion",
  "integraciones",
  "bots-con-ia",
] as const satisfies readonly ServiceSlug[];

function assertServicePages() {
  const missing = serviceRoutes
    .map((route) => route.slug)
    .filter((slug) => !SERVICE_PAGE_ORDER.some((item) => item === slug));

  if (missing.length > 0 || SERVICE_PAGE_ORDER.length !== serviceRoutes.length) {
    throw new Error(`llms-full is missing a service page: ${missing.join(", ")}`);
  }
}

export function buildLlmsFullTxt() {
  assertServicePages();

  const published = getPublishedBlogPosts().filter((post) => post.published);
  const document = joinBlocks([
    buildIdentity(),
    organizationSummary,
    `Versión en inglés: ${organizationIdentity.url}/en (mismas páginas bajo ${organizationIdentity.url}/en/...)`,
    buildHome(),
    ...SERVICE_PAGE_ORDER.map((slug) => buildServicePage(slug)),
    buildComoTrabajamos(),
    buildCasos(),
    ...projectRoutes.map((route) => buildProject(route.slug)),
    buildEventos(),
    ...published.map((post) => buildBlogPost(post.slug)),
  ]);

  assertSourceCopy(organizationIdentity, document);
  assertSourceCopy(es.hero, document);
  assertSourceCopy(es.services, document);
  assertSourceCopy(es.team, document);
  assertSourceCopy(es.faq, document);
  assertSourceCopy(es.contact, document);
  assertSourceCopy(es.servicePages, document);
  assertSourceCopy(es.comoTrabajamos, document);
  assertSourceCopy(es.casos, document);
  assertSourceCopy(es.events, document);
  for (const post of published) {
    assertSourceCopy(blogCopy(post.slug), document);
  }

  return `${document}\n`;
}
