import { DM_Mono, Geist, Hanken_Grotesk } from "next/font/google";

const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
});

const fontHeading = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const fontVariables = [fontSans, fontMono, fontHeading]
  .map((font) => font.variable)
  .join(" ");
