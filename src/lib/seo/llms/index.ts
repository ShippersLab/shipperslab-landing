import { buildWhatsAppUrl } from "@/lib/contact/message";
import es from "@/i18n/messages/es.json";
import { getPublishedBlogPosts } from "@/lib/blog";
import { organizationSummary } from "@/lib/seo/shared/organization";
import { plainText, singleLine } from "@/lib/seo/shared/text";
import { getServiceHref, serviceRoutes } from "@/lib/services";
import { site, team } from "@/lib/site";

const SUMMARY =
  "ShippersLab es un estudio de software de Santa Fe, Argentina. Un equipo chico de ingenieros y diseñadores que construye sistemas de gestión a medida, integraciones, bots de WhatsApp con IA y webs para pymes y comercios. Alcance y precio por escrito antes de arrancar.";

const AUDIENCES = [
  "Pymes que hoy se manejan con Excel, WhatsApp, papel o sistemas viejos.",
  "Empresas de servicios que coordinan operaciones, como las empresas de eventos para las que nació EventOps.",
  "Comercios y emprendedores que necesitan que los encuentren, reserven o pidan online.",
];

const EXPERIENCE =
  "Ingenieros con experiencia en infraestructura, AWS, backend, frontend e IA, que trabajaron en empresas como Mercado Libre, Coderhouse, PUMA y NFTYDoor, y en productos para clientes del exterior. Hablás directamente con las personas que construyen tu proyecto.";

const EVENTOPS_CASE =
  "EventOps es un producto propio de ShippersLab, en producción, pensado para empresas de sonido, iluminación y eventos. Reemplaza las planillas: cada evento se carga una vez y de ahí salen el calendario, el presupuesto, los pagos y los gastos.";

function bullets(lines: string[]) {
  return lines.map((line) => `- ${line}`).join("\n");
}

function comoTrabajamosSteps() {
  const { call, scope, weekly, pricing } = es.comoTrabajamos.steps;
  return [
    `${call.title} ${call.body} ${call.topics.label}: ${call.topics.items.join(", ")}.`,
    `${scope.title} ${scope.body} ${scope.document.label}: ${scope.document.items.join(", ")}.`,
    `${weekly.title} ${weekly.body} ${weekly.cycle.items.map((item) => `${item.label}: ${item.body}`).join(" ")}`,
    `${pricing.title} ${pricing.body} ${pricing.fees.map((fee) => `${fee.label}${fee.tag ? ` (${fee.tag})` : ""}: ${fee.body}`).join(" ")}`,
  ];
}

function link(name: string, url: string, note?: string) {
  return `- [${name}](${url})${note ? `: ${note}` : ""}`;
}

export function buildLlmsTxt() {
  const whatsappUrl = buildWhatsAppUrl(site.whatsappNumber, es.contact.form.whatsappMessage);
  const faq = es.faq.items.map((item) => `- ${item.question} ${item.answer}`);
  const founders = team.map((member) => {
    const links = member.links.map((link) => `[${link.network}](${link.url})`).join(", ");
    return `- ${member.name}, ${es.team.members[member.id].role}. ${es.team.members[member.id].bio} ${links}`;
  });
  const services = es.services.items.map((service) =>
    link(
      singleLine(service.title),
      `${site.url}${getServiceHref(service.id) ?? `/#${service.id}`}`,
      plainText(service.description),
    ),
  );

  return [
    `# ${site.name}`,
    `> ${SUMMARY}`,
    link(
      "llms-full.txt",
      `${site.url}/llms-full.txt`,
      "texto completo en español de las páginas públicas y de los artículos publicados",
    ),
    `Versión en inglés: ${site.url}/en (mismas páginas bajo ${site.url}/en/...)`,
    organizationSummary,
    `Para quién:\n\n${bullets(AUDIENCES)}`,
    `Experiencia: ${EXPERIENCE}`,
    `Fundadores:\n\n${founders.join("\n")}`,
    `Preguntas frecuentes:\n\n${faq.join("\n")}`,
    `## Caso: EventOps\n\n${EVENTOPS_CASE}\n\nMódulos:\n\n${bullets(
      es.casos.eventops.features.map((feature) => `${feature.title}: ${feature.body}`),
    )}\n\n${[
      link("Caso EventOps", `${site.url}/casos/eventops`),
      link("EventOps", site.eventopsUrl),
    ].join("\n")}`,
    `## Cómo trabajamos\n\n${bullets(comoTrabajamosSteps())}\n\nPreguntas frecuentes:\n\n${es.comoTrabajamos.faq.items
      .map((item) => `- ${item.question} ${item.answer}`)
      .join("\n")}\n\n${link(es.comoTrabajamos.navLabel, `${site.url}/como-trabajamos`)}`,
    `## Servicios\n\n${services.join("\n")}`,
    ...serviceRoutes.map((route) => {
      const page = es.servicePages[route.slug];
      const items = page.faq.items.map((item) => `- ${item.question} ${item.answer}`);
      return `### ${page.navLabel}: preguntas frecuentes\n\n${items.join("\n")}`;
    }),
    `## Blog\n\n${getPublishedBlogPosts()
      .map((post) =>
        link(
          es.blog.posts[post.slug].title,
          `${site.url}/blog/${post.slug}`,
          `${es.blog.posts[post.slug].excerpt} (${post.datePublished})`,
        ),
      )
      .join("\n")}`,
    `## Contacto\n\n${[
      link("Contanos tu problema", `${site.url}/empecemos`, "formulario para empezar un proyecto"),
      link("Email", `mailto:${site.emails.contact}`, site.emails.contact),
      ...(whatsappUrl ? [link("WhatsApp", whatsappUrl, "escribinos directo")] : []),
      link("Agendar una llamada", site.calUrl),
    ].join("\n")}`,
    `## Optional\n\n${[
      link(
        "EventOps",
        site.eventopsUrl,
        "producto propio en producción, sistema para empresas de eventos",
      ),
      link(
        "Casos y experiencia",
        `${site.url}/casos`,
        "proyectos propios: EventOps en producción y Estacionar, aún sin publicar",
      ),
      link(
        "Eventos",
        `${site.url}/eventos`,
        "workshops, build nights, demo nights y hackatones que queremos organizar, empezando en Santa Fe. Todavía sin fechas",
      ),
      link("X", site.social.x),
      link("Instagram", site.social.instagram),
    ].join("\n")}`,
  ].join("\n\n");
}
