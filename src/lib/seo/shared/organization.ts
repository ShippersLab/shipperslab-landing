import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import es from "@/i18n/messages/es.json";
import { site } from "@/lib/site";

export const organizationIdentity = {
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo/accent.svg`,
  image: `${site.url}/opengraph-image.jpg`,
  description: es.seo.home.description,
  slogan: es.hero.title,
  email: site.emails.contact,
  areaServed: "Argentina",
  region: "Santa Fe",
  addressCountry: "AR",
  contactType: "sales",
  knowsAbout: [
    "Software a medida",
    "Sistemas de gestión",
    "Integraciones",
    "Bots con IA",
    "Agentes de IA",
    "Desarrollo web",
  ],
  sameAs: [site.social.instagram, site.social.x, site.social.github],
} as const;

export const organizationSummary = [
  "Qué hacemos: sistemas de gestión a medida, integraciones con las herramientas que ya usás, bots de WhatsApp y agentes de IA, y webs, turneros y catálogos.",
  "Para quién: pymes, comercios y emprendedores de Santa Fe y de toda Argentina.",
  `Cómo trabajamos: charla gratis de 30 minutos, alcance y precio por escrito, avances cada semana.`,
  `Cómo contactarnos: ${site.emails.contact}, WhatsApp, el formulario de ${site.url}/empecemos o una llamada en ${site.calUrl}.`,
].join(" ");

const knowsAboutEn = [
  "Custom software",
  "Management systems",
  "Integrations",
  "AI bots",
  "AI agents",
  "Web development",
];

export function getOrganizationCopy(lang: Locale) {
  const messages = getMessages(lang);

  return {
    description: messages.seo.home.description,
    slogan: messages.hero.title,
    knowsAbout: lang === "es" ? [...organizationIdentity.knowsAbout] : knowsAboutEn,
    areaServed: lang === "es" ? organizationIdentity.areaServed : "Argentina",
  };
}
