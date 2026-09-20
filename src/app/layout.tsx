import "@/styles/globals.css";

import { fontHeading, fontMono, fontSans } from "@/lib/fonts";

export { metadata } from "@/lib/metadata";

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
