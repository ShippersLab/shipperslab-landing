import { Geist, Geist_Mono } from "next/font/google";
import {
  GeistPixelCircle,
  GeistPixelGrid,
  GeistPixelLine,
  GeistPixelSquare,
  GeistPixelTriangle,
} from "geist/font/pixel";

const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const fontVariables = [
  fontSans,
  fontMono,
  GeistPixelSquare,
  GeistPixelCircle,
  GeistPixelGrid,
  GeistPixelTriangle,
  GeistPixelLine,
]
  .map((font) => font.variable)
  .join(" ");
