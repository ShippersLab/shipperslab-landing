import es from "@/i18n/messages/es.json";
import { plainText, singleLine } from "@/lib/seo/text";
import { getServiceHref } from "@/lib/services";
import { site } from "@/lib/site";

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

function bullets(lines: string[]) {
  return lines.map((line) => `- ${line}`).join("\n");
}

function link(name: string, url: string, note?: string) {
  return `- [${name}](${url})${note ? `: ${note}` : ""}`;
}

export function buildLlmsTxt() {
  const steps = es.process.steps.map(
    (step, index) => `${index + 1}. ${step.title}: ${step.description}`,
  );
  const faq = es.faq.items.map((item) => `- ${item.question} ${item.answer}`);
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
    `Experiencia: ${EXPERIENCE}`,
    `Preguntas frecuentes:\n\n${faq.join("\n")}`,
    `## Servicios\n\n${services.join("\n")}`,
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
