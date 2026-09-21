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
  social: {
    x: "https://x.com/theshipperslab",
    xHandle: "@theshipperslab",
    github: "https://github.com/ShippersLab",
  },
} as const;

export const companies: Company[] = [
  { name: "Mercado Libre", logo: "/logos/mercado-libre.svg" },
  { name: "PUMA", logo: "logos/puma.svg" },
  { name: "NFTYDoor", logo: "logos/nftydoor.svg" },
];
