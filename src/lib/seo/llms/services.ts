import es from "@/i18n/messages/es.json";
import {
  absoluteUrl,
  bullets,
  canonical,
  heading,
  joinBlocks,
  labeled,
  numbered,
  page,
  renderCopy,
} from "@/lib/seo/llms/copy";
import {
  MERCADO_PAGO_PATH,
  PEDIDOS_PATH,
  serviceRoutes,
  TIENDANUBE_PATH,
  type ServiceSlug,
} from "@/lib/services";

type ServicePage =
  | (typeof es.servicePages)[ServiceSlug]
  | typeof es.tiendanube
  | typeof es.mercadoPago
  | typeof es.pedidos;

type ToolGroup = {
  title: string;
  intro?: string;
  closing?: string;
  items: readonly { title: string; body: string }[];
};

function renderTools(group: ToolGroup) {
  return joinBlocks([
    heading(3, group.title),
    group.intro ? renderCopy(group.intro) : undefined,
    ...group.items.map((item) => joinBlocks([heading(4, item.title), renderCopy(item.body)])),
    group.closing ? renderCopy(group.closing) : undefined,
  ]);
}

const PROCESS_STEPS = ["call", "scope", "weekly", "pricing"] as const;

function buildServiceExtras(servicePage: ServicePage) {
  return joinBlocks([
    "covers" in servicePage
      ? joinBlocks([
          heading(3, servicePage.covers.title),
          renderCopy(servicePage.covers.body),
          bullets(servicePage.covers.items.map((item) => item.label)),
        ])
      : undefined,
    "example" in servicePage
      ? joinBlocks([
          heading(3, servicePage.example.title),
          servicePage.example.body,
          `[${servicePage.example.link.label}](${absoluteUrl(servicePage.example.link.href)})`,
          bullets(servicePage.example.tabs),
          servicePage.example.alt,
        ])
      : undefined,
    "sections" in servicePage
      ? servicePage.sections
          .map((section) => joinBlocks([heading(3, section.title), renderCopy(section.body)]))
          .join("\n\n")
      : undefined,
    "tools" in servicePage ? renderTools(servicePage.tools) : undefined,
    "connections" in servicePage ? renderTools(servicePage.connections) : undefined,
    "audience" in servicePage
      ? joinBlocks([
          heading(3, servicePage.audience.title),
          servicePage.audience.intro,
          ...servicePage.audience.items.map((item) =>
            joinBlocks([heading(4, item.title), item.body]),
          ),
        ])
      : undefined,
    "examples" in servicePage
      ? joinBlocks([
          heading(3, servicePage.examples.title),
          servicePage.examples.tabsLabel,
          ...servicePage.examples.items.map((item) =>
            joinBlocks([heading(4, item.title), item.body]),
          ),
        ])
      : undefined,
    "flow" in servicePage
      ? joinBlocks([
          heading(3, servicePage.flow.title),
          renderCopy(servicePage.flow.intro),
          numbered(servicePage.flow.steps.map((step) => labeled(step.title, step.body))),
        ])
      : undefined,
    "comparison" in servicePage
      ? joinBlocks([
          heading(3, servicePage.comparison.title),
          ...servicePage.comparison.paragraphs.map((paragraph) => renderCopy(paragraph)),
        ])
      : undefined,
  ]);
}

function buildServicePageCopy(path: string, servicePage: ServicePage) {
  const related = serviceRoutes
    .filter((route) => `/${route.slug}` !== path)
    .map((route) => `[${es.servicePages[route.slug].navLabel}](${canonical(`/${route.slug}`)})`);

  return page(path, [
    servicePage.navLabel,
    servicePage.metaTitle,
    servicePage.metaDescription,
    heading(3, servicePage.h1),
    renderCopy(servicePage.lead),
    buildServiceExtras(servicePage),
    heading(3, servicePage.process.title),
    numbered(servicePage.process.steps.map((step) => labeled(step.title, step.body))),
    `[${es.servicePages.processLink}](${canonical("/como-trabajamos")})`,
    labeled(servicePage.process.pricing.label, servicePage.process.pricing.body),
    heading(3, servicePage.faq.title),
    ...servicePage.faq.items.map((item) => joinBlocks([heading(4, item.question), item.answer])),
    servicePage.afterDelivery.map((item) => labeled(item.label, item.body)).join("\n\n"),
    heading(3, servicePage.ctaTitle),
    servicePage.ctaDescription,
    `[${servicePage.ctaButton}](${canonical("/empecemos")})`,
    heading(3, es.servicePages.relatedTitle),
    bullets(related),
  ]);
}

export function buildServicePage(slug: ServiceSlug) {
  return buildServicePageCopy(`/${slug}`, es.servicePages[slug]);
}

export function buildTiendanubePage() {
  return buildServicePageCopy(TIENDANUBE_PATH, es.tiendanube);
}

export function buildMercadoPagoPage() {
  return buildServicePageCopy(MERCADO_PAGO_PATH, es.mercadoPago);
}

export function buildPedidosPage() {
  return buildServicePageCopy(PEDIDOS_PATH, es.pedidos);
}

function buildProcessStep(id: (typeof PROCESS_STEPS)[number]) {
  const steps = es.comoTrabajamos.steps;

  if (id === "call") {
    return joinBlocks([steps.call.topics.label, bullets(steps.call.topics.items)]);
  }

  if (id === "scope") {
    return joinBlocks([steps.scope.document.label, bullets(steps.scope.document.items)]);
  }

  if (id === "weekly") {
    return joinBlocks([
      steps.weekly.cycle.label,
      ...steps.weekly.cycle.items.map((item) => labeled(item.label, item.body)),
    ]);
  }

  return steps.pricing.fees
    .map((fee) => labeled(fee.tag ? `${fee.label} (${fee.tag})` : fee.label, fee.body))
    .join("\n\n");
}

export function buildComoTrabajamos() {
  const copy = es.comoTrabajamos;
  const steps = PROCESS_STEPS.map((id, index) => {
    const step = copy.steps[id];
    return joinBlocks([
      heading(3, `${copy.stepLabel} ${String(index + 1).padStart(2, "0")}. ${step.title}`),
      labeled(step.short, step.summary),
      step.body,
      buildProcessStep(id),
    ]);
  });
  const services = serviceRoutes.map(
    (route) => `[${es.servicePages[route.slug].navLabel}](${canonical(`/${route.slug}`)})`,
  );

  return page("/como-trabajamos", [
    copy.navLabel,
    copy.metaTitle,
    copy.metaDescription,
    heading(3, copy.h1),
    copy.lead,
    copy.overviewLabel,
    numbered(PROCESS_STEPS.map((id) => labeled(copy.steps[id].short, copy.steps[id].summary))),
    ...steps,
    heading(3, copy.faq.title),
    ...copy.faq.items.map((item) => joinBlocks([heading(4, item.question), item.answer])),
    heading(3, copy.ctaTitle),
    copy.ctaDescription,
    `[${copy.ctaButton}](${canonical("/empecemos")})`,
    heading(3, copy.servicesTitle),
    bullets(services),
  ]);
}
