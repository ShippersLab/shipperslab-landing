"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/provider";
import Link from "next/link";

import { TextureButton } from "@/components/ui/texture-button";

const LINKS = [
  { key: "services", href: "/#servicios" },
  { key: "about", href: "/#nosotros" },
  { key: "events", href: "/eventos" },
] as const;

export function Navbar() {
  const { messages } = useI18n();

  return (
    <header className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-content items-center justify-between gap-6 px-4 py-4 md:px-8">
      <Link href="/" aria-label={messages.site.name}>
        <Image
          src="/logo/accent.svg"
          alt="ShippersLab accent logo color"
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

      <TextureButton asChild variant="primary" size="lg" className="w-auto">
        <Link href="/#contacto">{messages.nav.contact}</Link>
      </TextureButton>
    </header>
  );
}
