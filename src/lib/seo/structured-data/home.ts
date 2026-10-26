import type { Graph, Person, ProfessionalService, WebSite } from "schema-dts";

import { languageTags, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { localizedUrl } from "@/i18n/paths";
import { getOrganizationCopy, organizationIdentity } from "@/lib/seo/shared/organization";
import { plainText, singleLine } from "@/lib/seo/shared/text";
import { buildFaqPage } from "@/lib/seo/structured-data/pages";
import { ORGANIZATION_ID, websiteId } from "@/lib/seo/structured-data/shared";
import { site, team } from "@/lib/site";

export function buildHomeStructuredData(lang: Locale): Graph {
  const messages = getMessages(lang);
  const copy = getOrganizationCopy(lang);

  const founders: Person[] = team.map((member) => ({
    "@type": "Person",
    "@id": `${site.url}/#${member.id}`,
    name: member.name,
    jobTitle: messages.team.members[member.id].role,
    ...(member.avatar ? { image: `${site.url}${member.avatar}` } : {}),
    worksFor: { "@id": ORGANIZATION_ID },
    sameAs: member.links.map((link) => link.url),
  }));

  const organization: ProfessionalService = {
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: organizationIdentity.name,
    url: organizationIdentity.url,
    logo: organizationIdentity.logo,
    image: organizationIdentity.image,
    description: copy.description,
    slogan: copy.slogan,
    email: organizationIdentity.email,
    areaServed: [
      { "@type": "Country", name: copy.areaServed },
      { "@type": "AdministrativeArea", name: "Santa Fe" },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Santa Fe",
      addressCountry: organizationIdentity.addressCountry,
    },
    knowsAbout: copy.knowsAbout,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: organizationIdentity.contactType,
      email: organizationIdentity.email,
      areaServed: organizationIdentity.addressCountry,
      availableLanguage: ["es", "en"],
    },
    sameAs: [...organizationIdentity.sameAs],
    founder: founders,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: messages.footer.servicesTitle,
      itemListElement: messages.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: singleLine(service.title),
          description: plainText(service.description),
          audience: {
            "@type": "BusinessAudience",
            audienceType: service.audience,
          },
          areaServed: "AR",
          provider: { "@id": ORGANIZATION_ID },
        },
      })),
    },
  };

  const website: WebSite = {
    "@type": "WebSite",
    "@id": websiteId(lang),
    url: localizedUrl("/", lang),
    name: site.name,
    inLanguage: languageTags[lang],
    publisher: { "@id": ORGANIZATION_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      buildFaqPage(`${localizedUrl("/", lang)}/`, messages.faq.items, lang),
    ],
  };
}
