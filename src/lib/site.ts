export type Company = {
  name: string;
  logo?: string;
};

export const site = {
  name: "ShippersLab",
  url: "https://shipperslab.tech",
  emails: {
    contact: "hola@shipperslab.tech",
    events: "eventos@shipperslab.tech",
  },
  calUrl: "https://cal.com/shipperslab/hablemos",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  social: {
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
