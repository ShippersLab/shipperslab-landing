"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useNavbarAnimation } from "@/components/layout/navbar/navbar.animation";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const SECTION_LINKS = [
  { key: "services", href: "/#servicios" },
  { key: "about", href: "/#nosotros" },
] as const;

export function Navbar() {
  const { messages } = useI18n();
  const ref = useRef<HTMLElement>(null);

  useNavbarAnimation(ref);

  return (
    <header
      ref={ref}
      className="invisible relative z-20 mx-auto flex w-full max-w-content items-center justify-between gap-6 bg-[#EDEFF3] px-4 py-4 md:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:bg-transparent"
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
        {SECTION_LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="text-sm text-ink/70 transition-colors duration-200 hover:text-ink"
          >
            {messages.nav[link.key]}
          </a>
        ))}

        <Link
          href="/eventos"
          className="text-sm text-ink/70 transition-colors duration-200 hover:text-ink"
        >
          {messages.nav.events}
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/eventos"
          className="text-sm text-ink/70 transition-colors duration-200 hover:text-ink md:hidden"
        >
          {messages.nav.events}
        </Link>

        <TextureButton asChild variant="primary" size="lg" className="w-auto rounded-full">
          <Link href="/empecemos">{messages.nav.contact}</Link>
        </TextureButton>
      </div>
    </header>
  );
}
