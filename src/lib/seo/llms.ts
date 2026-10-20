import es from "@/i18n/messages/es.json";
import { getPublishedBlogPosts } from "@/lib/blog";
import { plainText, singleLine } from "@/lib/seo/text";
import { getServiceHref, serviceRoutes } from "@/lib/services";
import { site, team } from "@/lib/site";

const SUMMARY =
  "ShippersLab es un estudio de desarrollo de software de Argentina. Un equipo chico de ingenieros y diseñadores que diseña y construye software a medida para pymes, empresas, comercios y emprendedores. Lo que necesiten, lo podemos desarrollar. Alcance y precio por escrito antes de arrancar.";

const SCOPE =
  "Construimos cualquier producto digital que un negocio necesite: sistemas de gestión, integraciones, automatizaciones, bots e IA aplicada, apps web y mobile, webs y productos completos, de la idea al lanzamiento o sobre algo que ya existe. Si se puede construir con software, lo podemos resolver.";

const AUDIENCES = [
  "Pymes que hoy se manejan con Excel, WhatsApp, papel o sistemas viejos.",
  "Empresas que necesitan un sistema, una integración o más manos en su equipo de producto.",
  "Comercios que necesitan vender, recibir pedidos o turnos online.",
  "Emprendedores que quieren lanzar su producto.",
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
  const steps = es.process.steps.map(
    (step, index) => `${index + 1}. ${step.title}: ${step.description}`,
  );
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
    SCOPE,
    `Para quién:\n\n${bullets(AUDIENCES)}`,
    `Cómo trabajamos:\n\n${steps.join("\n")}`,
    `Más detalle: ${link(es.comoTrabajamos.navLabel, `${site.url}/como-trabajamos`)}`,
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
        "proyectos publicados: EventOps en producción",
      ),
      link("Eventos", `${site.url}/eventos`, "build nights, meetups y hackathons que organizamos"),
      link("X", site.social.x),
      link("Instagram", site.social.instagram),
    ].join("\n")}`,
  ].join("\n\n");
}
