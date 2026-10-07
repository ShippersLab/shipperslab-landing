import type { Metadata } from "next";

import { NotFoundContent } from "@/components/sections/not-found";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
