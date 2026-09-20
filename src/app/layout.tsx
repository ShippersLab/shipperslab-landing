import "@/styles/globals.css";

import { fontHeading, fontMono, fontSans } from "@/lib/fonts";

export { metadata } from "@/lib/metadata";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-paper p-2 md:p-4 lg:p-4">{children}</body>
    </html>
  );
}
