"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";

import { MobileMenuPanel } from "@/components/layout/navbar/mobile-menu-panel";
import { NAV_LINKS } from "@/components/layout/navbar/nav-links";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/provider";

const EASE = [0.23, 1, 0.32, 1] as const;

export function MobileMenu() {
  const { messages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    document.documentElement.classList.add("overflow-hidden");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? messages.nav.menuClose : messages.nav.menuOpen}
        onClick={() => setIsOpen((value) => !value)}
        className="relative z-40 -m-2 flex items-center justify-center rounded-md p-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "menu"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="flex"
          >
            {isOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-20 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="panel"
              id={panelId}
              className="absolute inset-x-0 top-full z-30 border-b border-border bg-paper"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <MobileMenuPanel links={NAV_LINKS} onNavigate={() => setIsOpen(false)} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
