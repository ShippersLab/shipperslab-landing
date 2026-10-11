"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { LanguageDropdown } from "@/components/layout/navbar/language-dropdown";
import type { NavLink } from "@/components/layout/navbar/nav-links";
import { TextureButton } from "@/components/ui/button/texture-button";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
};

const linkClassName =
  "block rounded-md px-3 py-3 text-base text-ink transition-colors duration-200 ease-out hover:bg-border/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

type MobileMenuPanelProps = {
  links: readonly NavLink[];
  onNavigate: () => void;
};

export function MobileMenuPanel({ links, onNavigate }: MobileMenuPanelProps) {
  const { messages } = useI18n();

  return (
    <div className="flex flex-col gap-2 p-4">
      <nav className="flex flex-col gap-1">
        {links.map((link) =>
          link.kind === "anchor" ? (
            <motion.a
              key={link.key}
              href={link.href}
              onClick={onNavigate}
              variants={itemVariants}
              className={linkClassName}
            >
              {messages.nav[link.key]}
            </motion.a>
          ) : (
            <motion.div key={link.key} variants={itemVariants}>
              <Link href={link.href} onClick={onNavigate} className={cn(linkClassName)}>
                {messages.nav[link.key]}
              </Link>
            </motion.div>
          ),
        )}
      </nav>

      <motion.div variants={itemVariants} className="flex items-center justify-between gap-3 pt-3">
        <LanguageDropdown />

        <TextureButton asChild variant="primary" size="lg" className="w-auto rounded-full py-3">
          <Link href="/empecemos" onClick={onNavigate}>
            {messages.nav.contact}
          </Link>
        </TextureButton>
      </motion.div>
    </div>
  );
}
