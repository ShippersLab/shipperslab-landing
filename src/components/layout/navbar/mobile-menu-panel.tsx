"use client";

import { motion } from "motion/react";

import { LanguageToggle } from "@/components/layout/language-toggle";
import type { NavLink } from "@/components/layout/navbar/nav-links";
import { TextureButton } from "@/components/ui/button/texture-button";
import { LocalizedLink } from "@/i18n/link";
import { localizePath } from "@/i18n/paths";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

const linkClassName =
  "block rounded-md px-3 py-3 text-base text-ink transition-colors duration-200 ease-out hover:bg-border/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

type MobileMenuPanelProps = {
  links: readonly NavLink[];
  onNavigate: () => void;
};

export function MobileMenuPanel({ links, onNavigate }: MobileMenuPanelProps) {
  const { locale, messages } = useI18n();

  return (
    <div className="flex flex-col gap-2 p-4">
      <nav className="flex flex-col gap-1">
        {links.map((link) =>
          link.kind === "anchor" ? (
            <motion.a
              key={link.key}
              href={localizePath(link.href, locale)}
              onClick={onNavigate}
              variants={itemVariants}
              className={linkClassName}
            >
              {messages.nav[link.key]}
            </motion.a>
          ) : (
            <motion.div key={link.key} variants={itemVariants}>
              <LocalizedLink href={link.href} onClick={onNavigate} className={cn(linkClassName)}>
                {messages.nav[link.key]}
              </LocalizedLink>
            </motion.div>
          ),
        )}
      </nav>

      <motion.div variants={itemVariants} className="flex items-center gap-3 pt-3">
        <LanguageToggle />

        <TextureButton asChild variant="primary" size="square" className="flex-1">
          <LocalizedLink href="/empecemos" onClick={onNavigate}>
            {messages.nav.contact}
          </LocalizedLink>
        </TextureButton>
      </motion.div>
    </div>
  );
}
