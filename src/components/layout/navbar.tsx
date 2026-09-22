"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { LocaleToggle } from "@/components/layout/locale-toggle";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";

const LINKS = [
  { key: "services", href: "/#servicios" },
  { key: "about", href: "/#nosotros" },
  { key: "events", href: "/eventos" },
] as const;

export function Navbar() {
  const { messages } = useI18n();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="invisible absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-content items-center justify-between gap-6 px-4 py-4 md:px-8"
    >
      <Link href="/" aria-label={site.name}>
        <Image
          src="/logo/accent.svg"
          alt="ShippersLab"
          width={44}
          height={24}
          unoptimized
          className="h-5 w-auto"
        />
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="text-sm text-ink/70 transition-colors duration-200 hover:text-ink"
          >
            {messages.nav[link.key]}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <LocaleToggle />
        <TextureButton asChild variant="primary" size="lg" className="w-auto rounded-full">
          <Link href="/#contacto">{messages.nav.contact}</Link>
        </TextureButton>
      </div>
    </header>
  );
}
