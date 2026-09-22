import "@/styles/globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
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
      <body className="relative flex min-h-screen flex-col bg-paper px-4 pb-4">
        <I18nProvider>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
