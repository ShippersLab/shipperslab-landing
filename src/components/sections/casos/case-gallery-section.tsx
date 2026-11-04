"use client";

import type { StaticImageData } from "next/image";

import { GalleryMarquee } from "@/components/sections/casos/gallery-marquee";
import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Container } from "@/components/ui/section/container";

type CaseGallerySectionProps = {
  title: string;
  images: readonly StaticImageData[];
  alts: readonly string[];
};

export function CaseGallerySection({ title, images, alts }: CaseGallerySectionProps) {
  return (
    <section className="border-t border-border py-16 sm:py-24">
      <Container>
        <h2 className="text-2xl sm:text-3xl">
          <DiaTextReveal text={title} colors={["var(--accent)"]} textColor="var(--ink)" />
        </h2>
      </Container>
      <BlurReveal delay={0.1} className="mt-8">
        <GalleryMarquee images={images} alts={alts} />
      </BlurReveal>
    </section>
  );
}
