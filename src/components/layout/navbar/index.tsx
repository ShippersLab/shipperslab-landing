"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { LanguageDropdown } from "@/components/layout/language-dropdown";
import { MobileMenu } from "@/components/layout/navbar/mobile-menu";
import { NAV_LINKS } from "@/components/layout/navbar/nav-links";
import { useNavbarAnimation } from "@/components/layout/navbar/navbar.animation";
import { TextureButton } from "@/components/ui/button/texture-button";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

export function Navbar() {
  const { messages } = useI18n();
  const ref = useRef<HTMLElement>(null);

  useNavbarAnimation(ref);

  return (
    <header
      ref={ref}
      className="invisible relative z-20 mx-auto flex w-full max-w-content items-center justify-between gap-6 bg-paper px-4 py-6 md:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:bg-transparent"
    >
      <Link
        href="/"
        aria-label={site.name}
        className="-m-2 rounded-md p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
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
        {NAV_LINKS.map((link) =>
          link.kind === "anchor" ? (
            <a
              key={link.key}
              href={link.href}
              className="-my-2 rounded-sm py-2 text-sm text-ink/70 transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {messages.nav[link.key]}
            </a>
          ) : (
            <Link
              key={link.key}
              href={link.href}
              className="-my-2 rounded-sm py-2 text-sm text-ink/70 transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {messages.nav[link.key]}
            </Link>
          ),
        )}
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        <LanguageDropdown />

        <TextureButton asChild variant="primary" size="lg" className="w-auto rounded-full">
          <Link href="/empecemos">{messages.nav.contact}</Link>
        </TextureButton>
      </div>

      <MobileMenu />
    </header>
  );
}
