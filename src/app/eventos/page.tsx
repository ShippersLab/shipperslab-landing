import type { Metadata } from "next";

import { Navbar } from "@/components/sections/navbar";
import { Events } from "@/components/sections/events";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "ShippersLab | Eventos",
  description:
    "Estamos armando las primeras build nights, meetups y hackathons para gente que construye en Argentina. Escribinos a eventos@shipperslab.tech.",
};

export default function EventosPage() {
  return (
    <>
      <Navbar />
      <Events />
      <Footer />
    </>
  );
}
