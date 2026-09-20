import "@/styles/globals.css";

import type { Metadata } from "next";

import { fontHeading, fontMono, fontSans } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "ShippersLab",
  description: "ShippersLab",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
