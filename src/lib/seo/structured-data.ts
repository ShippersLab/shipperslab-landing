import type {
  Blog,
  BlogPosting,
  BreadcrumbList,
  CollectionPage,
  FAQPage,
  Graph,
  Organization,
  Person,
  Service,
  SoftwareApplication,
  WebSite,
} from "schema-dts";

import es from "@/i18n/messages/es.json";
import { type BlogSlug, getBlogAuthor, getBlogPost, getPublishedBlogPosts } from "@/lib/blog";
import { eventopsImages } from "@/lib/projects/eventops";
import { DESCRIPTION } from "@/lib/seo/metadata";
import { plainText, singleLine } from "@/lib/seo/text";
import type { ServiceSlug } from "@/lib/services";
import { serviceRoutes } from "@/lib/services";
import { site, team } from "@/lib/site";

const ORGANIZATION_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

const founders: Person[] = team.map((member) => ({
  "@type": "Person",
  "@id": `${site.url}/#${member.id}`,
  name: member.name,
  jobTitle: es.team.members[member.id].role,
  ...(member.avatar ? { image: `${site.url}${member.avatar}` } : {}),
  worksFor: { "@id": ORGANIZATION_ID },
  sameAs: member.links.map((link) => link.url),
}));

const organization: Organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo/accent.svg`,
  image: `${site.url}/opengraph-image.jpg`,
  description: DESCRIPTION,
  slogan: "Software a medida para tu negocio.",
  email: site.emails.contact,
  areaServed: { "@type": "Country", name: "Argentina" },
  address: { "@type": "PostalAddress", addressCountry: "AR" },
  knowsAbout: [
    "Software a medida",
    "Sistemas de gestión",
    "Integraciones",
    "Bots con IA",
    "Agentes de IA",
    "Desarrollo web",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.emails.contact,
    areaServed: "AR",
  },
  sameAs: [site.social.instagram, site.social.x],
  founder: founders,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios",
    itemListElement: es.services.items.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: singleLine(service.title),
        description: plainText(service.description),
        audience: { "@type": "BusinessAudience", audienceType: service.audience },
        areaServed: "AR",
        provider: { "@id": ORGANIZATION_ID },
      },
    })),
  },
};

const website: WebSite = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  inLanguage: "es-AR",
  publisher: { "@id": ORGANIZATION_ID },
};

const faqPage: FAQPage = {
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  isPartOf: { "@id": WEBSITE_ID },
  inLanguage: "es-AR",
  mainEntity: es.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export const homeStructuredData: Graph = {
  "@context": "https://schema.org",
  "@graph": [organization, website, faqPage],
};

export function buildServiceStructuredData(slug: ServiceSlug): Graph {
  const page = es.servicePages[slug];
  const route = serviceRoutes.find((item) => item.slug === slug);
  const item = es.services.items.find((service) => service.id === route?.id);
  const url = `${site.url}/${slug}`;

  const service: Service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: item ? singleLine(item.title) : page.navLabel,
    description: page.metaDescription,
    serviceType: page.navLabel,
    url,
    areaServed: { "@type": "Country", name: "Argentina" },
    ...(item && { audience: { "@type": "BusinessAudience", audienceType: item.audience } }),
    provider: { "@type": "Organization", "@id": ORGANIZATION_ID, name: site.name, url: site.url },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: page.navLabel, item: url },
    ],
  };

  const faq: FAQPage = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "es-AR",
    mainEntity: page.faq.items.map((faqItem) => ({
      "@type": "Question",
      name: faqItem.question,
      acceptedAnswer: { "@type": "Answer", text: faqItem.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [service, breadcrumb, faq],
  };
}

const CASOS_URL = `${site.url}/casos`;
const EVENTOPS_CASE_URL = `${CASOS_URL}/eventops`;
const EVENTOPS_APP_ID = `${EVENTOPS_CASE_URL}#software`;

export function buildCasosStructuredData(): Graph {
  const page = es.casos;

  const collection: CollectionPage = {
    "@type": "CollectionPage",
    "@id": `${CASOS_URL}#webpage`,
    url: CASOS_URL,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: "es-AR",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    breadcrumb: { "@id": `${CASOS_URL}#breadcrumb` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: page.eventops.title,
          url: EVENTOPS_CASE_URL,
        },
      ],
    },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${CASOS_URL}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: "Casos", item: CASOS_URL },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [collection, breadcrumb],
  };
}

export function buildEventopsCaseStructuredData(): Graph {
  const page = es.casos.eventops;

  const app: SoftwareApplication = {
    "@type": "SoftwareApplication",
    "@id": EVENTOPS_APP_ID,
    name: page.title,
    description: page.metaDescription,
    url: site.eventopsUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "es-AR",
    audience: { "@type": "BusinessAudience", audienceType: page.facts[2].value },
    featureList: page.features.map((feature) => feature.title),
    image: `${site.url}${eventopsImages.hero.src}`,
    creator: { "@type": "Organization", "@id": ORGANIZATION_ID, name: site.name, url: site.url },
    publisher: { "@id": ORGANIZATION_ID },
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${EVENTOPS_CASE_URL}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: "Casos", item: CASOS_URL },
      { "@type": "ListItem", position: 3, name: page.title, item: EVENTOPS_CASE_URL },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [app, breadcrumb],
  };
}

type BreadcrumbParent = {
  name: string;
  path: string;
};

export function buildPageBreadcrumbStructuredData(
  path: string,
  name: string,
  parents: BreadcrumbParent[] = [],
): Graph {
  const url = `${site.url}${path}`;
  const trail = [
    { name: "Inicio", item: site.url },
    ...parents.map((parent) => ({ name: parent.name, item: `${site.url}${parent.path}` })),
    { name, item: url },
  ];

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumb],
  };
}

export function buildComoTrabajamosStructuredData(): Graph {
  const page = es.comoTrabajamos;
  const path = "/como-trabajamos";
  const url = `${site.url}${path}`;

  const faq: FAQPage = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "es-AR",
    mainEntity: page.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [...buildPageBreadcrumbStructuredData(path, page.navLabel)["@graph"], faq],
  };
}

const BLOG_PATH = "/blog";
const BLOG_URL = `${site.url}${BLOG_PATH}`;
const BLOG_ID = `${BLOG_URL}#blog`;

export function buildBlogIndexStructuredData(): Graph {
  const page = es.blog;

  const blog: Blog = {
    "@type": "Blog",
    "@id": BLOG_ID,
    url: BLOG_URL,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: "es-AR",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    blogPost: getPublishedBlogPosts().map((post) => ({
      "@type": "BlogPosting",
      "@id": `${BLOG_URL}/${post.slug}#article`,
      headline: page.posts[post.slug].title,
      url: `${BLOG_URL}/${post.slug}`,
      datePublished: post.datePublished,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [blog, ...buildPageBreadcrumbStructuredData(BLOG_PATH, page.navLabel)["@graph"]],
  };
}

export function buildBlogPostStructuredData(slug: BlogSlug): Graph {
  const post = es.blog.posts[slug];
  const meta = getBlogPost(slug);
  const path = `${BLOG_PATH}/${slug}`;
  const url = `${site.url}${path}`;
  const publisher = {
    "@type": "Organization" as const,
    "@id": ORGANIZATION_ID,
    name: site.name,
    url: site.url,
  };
  const member = getBlogAuthor(slug);
  const author = member
    ? {
        "@type": "Person" as const,
        "@id": `${site.url}/#${member.id}`,
        name: member.name,
        url: member.profileUrl,
      }
    : publisher;

  const article: BlogPosting = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    abstract: post.answer,
    url,
    mainEntityOfPage: url,
    inLanguage: "es-AR",
    image: `${site.url}/opengraph-image.jpg`,
    datePublished: meta?.datePublished,
    dateModified: meta?.datePublished,
    author,
    publisher,
    isPartOf: { "@id": BLOG_ID },
  };

  const faq: FAQPage = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "es-AR",
    mainEntity: post.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      article,
      ...buildPageBreadcrumbStructuredData(path, post.title, [
        { name: es.blog.navLabel, path: BLOG_PATH },
      ])["@graph"],
      faq,
    ],
  };
}
