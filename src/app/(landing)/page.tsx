import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Trust } from "@/components/sections/trust";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Trust />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
