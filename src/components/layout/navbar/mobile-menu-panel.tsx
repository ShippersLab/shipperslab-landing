"use client";

import Link from "next/link";

import { LanguageToggle } from "@/components/layout/navbar/language-toggle";
import type { NavLink } from "@/components/layout/navbar/nav-links";
import { TextureButton } from "@/components/ui/button/texture-button";
import { useI18n } from "@/i18n/provider";

type MobileMenuPanelProps = {
  links: readonly NavLink[];
  onNavigate: () => void;
};

export function MobileMenuPanel({ links, onNavigate }: MobileMenuPanelProps) {
  const { messages } = useI18n();

  const linkClassName =
    "border-b border-border py-4 text-base text-ink transition-colors duration-200 ease-out first:border-t focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <div className="flex flex-col gap-8 px-4 py-6 md:px-8">
      <nav className="flex flex-col">
        {links.map((link) =>
          link.kind === "anchor" ? (
            <a key={link.key} href={link.href} onClick={onNavigate} className={linkClassName}>
              {messages.nav[link.key]}
            </a>
          ) : (
            <Link key={link.key} href={link.href} onClick={onNavigate} className={linkClassName}>
              {messages.nav[link.key]}
            </Link>
          ),
        )}
      </nav>

      <div className="flex flex-col gap-4">
        <TextureButton asChild variant="primary" size="lg" className="w-full rounded-full">
          <Link href="/empecemos" onClick={onNavigate}>
            {messages.nav.contact}
          </Link>
        </TextureButton>

        <LanguageToggle />
      </div>
    </div>
  );
}
