import "@/styles/globals.css";

import { I18nProvider } from "@/i18n/provider";
import { fontMono, fontPixel, fontSans } from "@/lib/fonts";

export { metadata } from "@/lib/metadata";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fontSans.variable} ${fontMono.variable} ${fontPixel.variable} antialiased`}
    >
      <body className="relative flex min-h-screen flex-col bg-paper pb-4 px-4">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
