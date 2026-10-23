import es from "@/i18n/messages/es.json";
import { getPublishedBlogPosts } from "@/lib/blog";
import { blogCopy, buildBlogPost } from "@/lib/seo/llms-full-blog";
import { buildCasos, buildProject } from "@/lib/seo/llms-full-cases";
import { buildHome, buildIdentity } from "@/lib/seo/llms-full-home";
import { buildComoTrabajamos, buildServicePage } from "@/lib/seo/llms-full-services";
import { assertSourceCopy, joinBlocks } from "@/lib/seo/llms-copy";
import { organizationIdentity } from "@/lib/seo/organization";
import { projectRoutes } from "@/lib/projects";
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
    buildHome(),
    ...SERVICE_PAGE_ORDER.map((slug) => buildServicePage(slug)),
    buildComoTrabajamos(),
    buildCasos(),
    ...projectRoutes.map((route) => buildProject(route.slug)),
    ...published.map((post) => buildBlogPost(post.slug)),
  ]);

  assertSourceCopy(organizationIdentity, document);
  assertSourceCopy(es.hero, document);
  assertSourceCopy(es.services, document);
  assertSourceCopy(es.process, document);
  assertSourceCopy(es.team, document);
  assertSourceCopy(es.faq, document);
  assertSourceCopy(es.contact, document);
  assertSourceCopy(es.servicePages, document);
  assertSourceCopy(es.comoTrabajamos, document);
  assertSourceCopy(es.casos, document);
  for (const post of published) {
    assertSourceCopy(blogCopy(post.slug), document);
  }

  return `${document}\n`;
}
