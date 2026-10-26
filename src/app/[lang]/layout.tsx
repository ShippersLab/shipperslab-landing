import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AnalyticsEvents } from "@/components/layout/providers/analytics-events";
import { MotionProvider } from "@/components/layout/providers/motion-provider";
import { SmoothScroll } from "@/components/layout/providers/smooth-scroll";
import { SkipLink } from "@/components/layout/skip-link";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { resolveLocale } from "@/i18n/params";
import { I18nProvider } from "@/i18n/provider";
import { fontVariables } from "@/lib/fonts";
import { buildRootMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  return buildRootMetadata(await resolveLocale(params));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await resolveLocale(params);

  return (
    <html lang={lang} className={`${fontVariables} antialiased`}>
      <head>
        <noscript>
          <style>{".invisible{visibility:visible !important}"}</style>
        </noscript>
      </head>
      <body className="bg-paper">
        <SmoothScroll />
        <I18nProvider locale={lang} messages={getMessages(lang)}>
          <MotionProvider>
            <div className="group/shell relative flex min-h-screen flex-col px-4 pt-4">
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
        <AnalyticsEvents />
      </body>
    </html>
  );
}
