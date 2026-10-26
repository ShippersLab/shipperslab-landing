"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/layout/navbar/mobile-menu";
import { NAV_LINKS } from "@/components/layout/navbar/nav-links";
import { useNavbarAnimation } from "@/components/layout/navbar/navbar.animation";
import { TextureButton } from "@/components/ui/button/texture-button";
import { LocalizedLink } from "@/i18n/link";
import { localizePath, stripLocale } from "@/i18n/paths";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINK_CLASS =
  "-my-2 rounded-sm py-2 text-sm text-ink/70 transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const SCROLL_THRESHOLD = 24;

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrolled;
}

export function Navbar() {
  const { locale, messages } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isHome = stripLocale(usePathname()) === "/";
  const scrolled = useScrolled();

  useNavbarAnimation(ref, isHome);

  return (
    <>
      <header ref={ref} className="invisible fixed inset-x-4 top-4 z-50 flex justify-center">
        <div
          className={cn(
            "relative z-30 grid w-full max-w-xl grid-cols-[1fr_auto] items-center gap-4 rounded-md border py-2 pr-2 pl-4 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out md:grid-cols-[1fr_auto_1fr]",
            scrolled
              ? "border-border/80 bg-paper/70 backdrop-blur-md"
              : "border-transparent bg-transparent",
          )}
        >
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
                <a key={link.key} href={localizePath(link.href, locale)} className={LINK_CLASS}>
                  {messages.nav[link.key]}
                </a>
              ) : (
                <LocalizedLink key={link.key} href={link.href} className={LINK_CLASS}>
                  {messages.nav[link.key]}
                </LocalizedLink>
              ),
            )}
          </nav>

          <div className="flex items-center justify-self-end gap-3">
            <TextureButton
              asChild
              variant="primary"
              size="compact"
              className="hidden w-auto md:flex"
            >
              <LocalizedLink href="/empecemos">{messages.nav.contact}</LocalizedLink>
            </TextureButton>

            <MobileMenu onHome={false} />
          </div>
        </div>
      </header>
      {isHome ? null : (
        <div aria-hidden className="h-16 shrink-0 group-has-data-fullbleed/shell:hidden" />
      )}
    </>
  );
}
