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

export type TeamMemberId = "juani" | "franco";

export type TeamMember = {
  id: TeamMemberId;
  name: string;
  initials: string;
  cover: string;
  avatar?: string;
  profileUrl: string;
  links: { network: "Portfolio" | "LinkedIn" | "X"; url: string }[];
};

export const team: TeamMember[] = [
  {
    id: "juani",
    name: "Juan Ignacio De los Santos",
    initials: "JD",
    cover: "/images/team/cover-juani.webp",
    avatar: "/images/team/juani-avatar.webp",
    profileUrl: "https://juanidls.dev",
    links: [
      { network: "Portfolio", url: "https://juanidls.dev" },
      { network: "LinkedIn", url: "https://www.linkedin.com/in/juanidlsdev/" },
      { network: "X", url: "https://x.com/JuanDls01" },
    ],
  },
  {
    id: "franco",
    name: "Franco Galfré",
    initials: "FG",
    cover: "/images/team/cover-franco.webp",
    avatar: "/images/team/franco-avatar.webp",
    profileUrl: "https://www.francogalfre.site",
    links: [
      { network: "Portfolio", url: "https://www.francogalfre.site" },
      { network: "LinkedIn", url: "https://www.linkedin.com/in/francogalfre/" },
      { network: "X", url: "https://x.com/francogalfredev" },
    ],
  },
];
