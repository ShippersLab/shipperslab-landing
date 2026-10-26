"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { MobileMenu } from "@/components/layout/navbar/mobile-menu";
import { NAV_LINKS } from "@/components/layout/navbar/nav-links";
import { useNavbarAnimation } from "@/components/layout/navbar/navbar.animation";
import { TextureButton } from "@/components/ui/button/texture-button";
import { LocalizedLink } from "@/i18n/link";
import { localizePath, stripLocale } from "@/i18n/paths";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { locale, messages } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isHome = stripLocale(usePathname()) === "/";

  useNavbarAnimation(ref, isHome);

  return (
    <header
      ref={ref}
      className={cn(
        "invisible z-20 flex justify-center",
        isHome
          ? "absolute inset-x-11 top-11 sm:inset-x-14 sm:top-12"
          : "relative pb-4 group-has-data-fullbleed/shell:absolute group-has-data-fullbleed/shell:inset-x-4 group-has-data-fullbleed/shell:top-4 group-has-data-fullbleed/shell:pb-0",
      )}
    >
      <div className="relative z-30 grid w-full max-w-xl grid-cols-[1fr_auto] items-center gap-4 rounded-md bg-paper py-2 pr-2 pl-4 md:grid-cols-[1fr_auto_1fr]">
        <LocalizedLink
          href="/"
          aria-label={site.name}
          className="-m-2 justify-self-start rounded-md p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <Image
            src="/logo/accent.svg"
            alt="ShippersLab"
            width={44}
            height={24}
            unoptimized
            className="h-5 w-auto"
          />
        </LocalizedLink>

        <nav className="hidden items-center justify-center justify-self-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.kind === "anchor" ? (
              <a
                key={link.key}
                href={localizePath(link.href, locale)}
                className="-my-2 rounded-sm py-2 text-sm text-ink/70 transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {messages.nav[link.key]}
              </a>
            ) : (
              <LocalizedLink
                key={link.key}
                href={link.href}
                className="-my-2 rounded-sm py-2 text-sm text-ink/70 transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {messages.nav[link.key]}
              </LocalizedLink>
            ),
          )}
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <TextureButton asChild variant="primary" size="compact" className="hidden w-auto md:flex">
            <LocalizedLink href="/empecemos">{messages.nav.contact}</LocalizedLink>
          </TextureButton>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
