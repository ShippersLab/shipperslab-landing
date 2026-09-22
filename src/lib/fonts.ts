import { Geist, Geist_Mono } from "next/font/google";
import {
  GeistPixelCircle,
  GeistPixelGrid,
  GeistPixelLine,
  GeistPixelSquare,
  GeistPixelTriangle,
} from "geist/font/pixel";

export const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const fontPixelSquare = GeistPixelSquare;
export const fontPixelCircle = GeistPixelCircle;
export const fontPixelGrid = GeistPixelGrid;
export const fontPixelTriangle = GeistPixelTriangle;
export const fontPixelLine = GeistPixelLine;
