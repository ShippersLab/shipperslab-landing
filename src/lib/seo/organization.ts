import es from "@/i18n/messages/es.json";
import { DESCRIPTION } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const organizationIdentity = {
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo/accent.svg`,
  image: `${site.url}/opengraph-image.jpg`,
  description: DESCRIPTION,
  slogan: es.hero.title,
  email: site.emails.contact,
  areaServed: "Argentina",
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
  sameAs: [site.social.instagram, site.social.x],
} as const;
