export type Company = {
  name: string;
  logo?: string;
};

export const site = {
  name: "ShippersLab",
  url: "https://www.shipperslab.tech",
  emails: {
    contact: "hola@shipperslab.tech",
    events: "eventos@shipperslab.tech",
  },
  calUrl: "https://cal.com/shipperslab/hablemos",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  eventopsUrl: "https://eventops.digital",
  social: {
    instagram: "https://www.instagram.com/shipperslab/",
    instagramHandle: "@shipperslab",
    x: "https://x.com/theshipperslab",
    xHandle: "@theshipperslab",
  },
} as const;

export const companies: Company[] = [
  { name: "Mercado Libre", logo: "/logos/mercado-libre.svg" },
  { name: "PUMA", logo: "/logos/puma.svg" },
  { name: "Coderhouse", logo: "/logos/coderhouse.svg" },
  { name: "NFTYDoor", logo: "/logos/nftydoor.svg" },
];

export type TeamMemberId = "juani" | "franco";

export type TeamMember = {
  id: TeamMemberId;
  name: string;
  initials: string;
  cover: string;
  avatar?: string;
  links: { network: "Portfolio" | "LinkedIn" | "X"; url: string }[];
};

export const team: TeamMember[] = [
  {
    id: "juani",
    name: "Juan Ignacio De los Santos",
    initials: "JD",
    cover: "/images/team/cover-sky.webp",
    avatar: "/images/team/juani.webp",
    links: [
      { network: "Portfolio", url: "https://juanidls.dev" },
      { network: "LinkedIn", url: "https://www.linkedin.com/in/juanidlsdev/" },
      { network: "X", url: "https://x.com/JuanDls01" },
    ],
  },
  {
    id: "franco",
    name: "Franco Galfre",
    initials: "FG",
    cover: "/images/team/cover-orange.webp",
    links: [
      { network: "Portfolio", url: "https://www.francogalfre.site" },
      { network: "LinkedIn", url: "https://www.linkedin.com/in/francogalfre/" },
      { network: "X", url: "https://x.com/francogalfredev" },
    ],
  },
];
