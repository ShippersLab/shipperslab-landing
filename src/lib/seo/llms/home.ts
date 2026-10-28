import es from "@/i18n/messages/es.json";
import { buildWhatsAppUrl } from "@/lib/contact/message";
import { bullets, canonical, heading, joinBlocks, page, renderCopy } from "@/lib/seo/llms/copy";
import { organizationIdentity } from "@/lib/seo/shared/organization";
import { getServiceHref } from "@/lib/services";
import { site, team } from "@/lib/site";

export function buildIdentity() {
  const founders = team.map((member) => {
    const links = member.links.map((item) => item.url).join(" ");
    return `- ${member.name}, ${es.team.members[member.id].role}. ${links}`;
  });

  const identity = [
    `url: ${organizationIdentity.url}`,
    `email: ${organizationIdentity.email}`,
    `areaServed: ${organizationIdentity.areaServed}`,
    `region: ${organizationIdentity.region}`,
    `addressCountry: ${organizationIdentity.addressCountry}`,
    `contactType: ${organizationIdentity.contactType}`,
    `logo: ${organizationIdentity.logo}`,
    `image: ${organizationIdentity.image}`,
  ].join("\n");

  return joinBlocks([
    `# ${organizationIdentity.name}`,
    `> ${organizationIdentity.description}`,
    organizationIdentity.slogan,
    identity,
    bullets(organizationIdentity.knowsAbout),
    bullets(organizationIdentity.sameAs),
    founders.join("\n"),
  ]);
}

function buildHomeServices() {
  const items = es.services.items.map((service) => {
    const href = getServiceHref(service.id) ?? `/#${service.id}`;
    const preview = service.description.includes("{EventOps}")
      ? es.services.eventopsPreviewAlt
      : undefined;

    return joinBlocks([
      heading(4, `[${service.title}](${canonical(href)})`),
      renderCopy(service.description),
      preview,
      bullets(service.includes.map(renderCopy)),
      service.audience,
    ]);
  });

  return joinBlocks([
    heading(3, es.services.title),
    es.services.description,
    ...items,
    `[${es.services.casesCta}](${canonical("/casos")})`,
  ]);
}

function buildHomeTeam() {
  const members = team.map((member) => {
    const copy = es.team.members[member.id];
    const links = member.links.map((item) => `[${item.network}](${item.url})`).join(", ");

    return joinBlocks([
      heading(4, member.name),
      copy.role,
      copy.bio,
      es.team.coverAlt.replace(/\{name\}/g, member.name),
      `[${es.team.profileLink}](${member.profileUrl})`,
      es.team.profileLabel.replace(/\{name\}/g, member.name),
      links,
    ]);
  });

  return joinBlocks([
    heading(3, es.team.title),
    es.team.description,
    ...members,
    es.team.employersLine,
    "Mercado Libre, Coderhouse, PUMA, NFTYDoor",
  ]);
}

function buildHomeContact() {
  const form = es.contact.form;

  return joinBlocks([
    heading(3, es.contact.title),
    es.contact.description,
    bullets([
      `${form.name}: ${form.namePlaceholder}`,
      `${form.company}: ${form.companyPlaceholder}`,
      `${form.contactMethod}: ${form.contactMethodPlaceholder}`,
      `${form.message}: ${form.messagePlaceholder}`,
      form.submit,
      form.sending,
      form.sent,
      form.retry,
    ]),
    form.success,
    form.error,
    form.whatsappMessage,
    `${form.alternative} [${site.emails.contact}](mailto:${site.emails.contact})`,
  ]);
}

export function buildHome() {
  return page("/", [
    heading(3, es.hero.title),
    es.hero.description,
    es.hero.imageAlt,
    `[${es.hero.primaryCta}](${buildWhatsAppUrl(site.whatsappNumber, es.hero.whatsappMessage) ?? canonical("/empecemos")})`,
    es.hero.whatsappMessage,
    `[${es.hero.secondaryCta}](${canonical("/casos")})`,
    buildHomeServices(),
    buildHomeTeam(),
    heading(3, es.faq.label),
    heading(4, es.faq.title),
    `${es.faq.description} [${site.emails.contact}](mailto:${site.emails.contact}).`,
    ...es.faq.items.map((item) => joinBlocks([heading(4, item.question), item.answer])),
    heading(4, es.faq.help.title),
    es.faq.help.description,
    `[${es.faq.help.cta}](${canonical("/empecemos")})`,
    heading(3, es.cta.title),
    es.cta.description,
    `[${es.cta.button}](${canonical("/empecemos")})`,
    buildHomeContact(),
  ]);
}
