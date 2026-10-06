import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/layout/motion-provider";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { I18nProvider } from "@/i18n/provider";

import { fontVariables } from "@/lib/fonts";

export { metadata } from "@/lib/seo/metadata";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fontVariables} antialiased`}>
      <head>
        <noscript>
          <style>{".invisible{visibility:visible !important}"}</style>
        </noscript>
      </head>
      <body className="bg-paper">
        <SmoothScroll />
        <I18nProvider>
          <MotionProvider>
            <div className="relative flex min-h-screen flex-col px-4 pt-4">
              <SkipLink />
              <Navbar />
              <main id="contenido" className="flex flex-1 flex-col">
                {children}
              </main>
              <Footer />
            </div>
          </MotionProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
