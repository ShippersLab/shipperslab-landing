import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { I18nProvider } from "@/i18n/provider";
import {
  fontMono,
  fontPixelCircle,
  fontPixelGrid,
  fontPixelLine,
  fontPixelSquare,
  fontPixelTriangle,
  fontSans,
} from "@/lib/fonts";

export { metadata } from "@/lib/metadata";

const pixelVariables = `${fontPixelSquare.variable} ${fontPixelCircle.variable} ${fontPixelGrid.variable} ${fontPixelTriangle.variable} ${fontPixelLine.variable}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fontSans.variable} ${fontMono.variable} ${pixelVariables} antialiased`}
    >
      <body className="bg-paper">
        <SmoothScroll />
        <I18nProvider>
          <div className="relative flex min-h-screen flex-col px-4 pt-4">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
