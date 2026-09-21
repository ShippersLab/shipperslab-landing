import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Problems } from "@/components/sections/problems";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Trust } from "@/components/sections/trust";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problems />
      <Services />
      <Process />
      <Trust />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
