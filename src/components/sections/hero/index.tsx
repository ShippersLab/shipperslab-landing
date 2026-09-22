"use client";

import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";
import { gsap, useGSAP } from "@/lib/gsap";

const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAHABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs4tURsedGyEdehzS3eqLF8sMbO3qcAUUVye1lY9H6vT5tj//Z";

export function Hero() {
  const { messages } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .fromTo(
            ".hero-image",
            { autoAlpha: 0, filter: "blur(24px)" },
            { autoAlpha: 1, filter: "blur(0px)", duration: 0.9 },
          )
          .fromTo(
            ".hero-reveal",
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-image, .hero-reveal", { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="top" ref={sectionRef} className="flex w-full flex-1 flex-col">
      <Image
        src="/images/hero-illustration.webp"
        alt={messages.hero.imageAlt}
        width={1920}
        height={822}
        priority
        quality={90}
        placeholder="blur"
        blurDataURL={HERO_BLUR_DATA_URL}
        className="hero-image invisible aspect-8/3 w-full object-cover object-top select-none"
        sizes="100vw"
      />

      <Container className="grid justify-between pt-12 pb-16 lg:grid-cols-[1.8fr_1.2fr] lg:items-start">
        <h1 className="hero-title hero-reveal invisible max-w-full font-pixel tracking-tighter text-6xl text-ink">
          {messages.hero.title}
        </h1>

        <div className="flex w-full max-w-fit flex-col gap-6 pt-1">
          <p className="hero-description hero-reveal invisible w-full font-sans text-base tracking-tight text-muted">
            {messages.hero.description}
          </p>

          <div className="hero-ctas hero-reveal invisible flex flex-wrap items-center gap-3">
            <TextureButton asChild variant="primary" size="pill" className="w-auto rounded-full">
              <a href="#contacto" className="text-base">
                {messages.hero.primaryCta}
              </a>
            </TextureButton>
            <a
              href="#servicios"
              className="group flex items-center gap-1 px-4 py-2.5 text-base text-muted transition-colors duration-200 hover:text-ink"
            >
              {messages.hero.secondaryCta}
              <ArrowRightIcon
                size={16}
                className="mt-px transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
