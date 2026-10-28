"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { Wordmark } from "@/components/layout/footer/wordmark";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { Container } from "@/components/ui/section/container";
import { buildWhatsAppUrl } from "@/lib/contact/message";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { serviceRoutes, TIENDANUBE_PATH } from "@/lib/services";
import { site } from "@/lib/site";

const YEAR = new Date().getFullYear();

const LINK_CLASS =
  "rounded-sm text-sm text-muted transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const EXPLORE_LINKS = [
  { key: "empecemos", href: "/empecemos" },
  { key: "como-trabajamos", href: "/como-trabajamos" },
  { key: "casos", href: "/casos" },
  { key: "eventos", href: "/eventos" },
  { key: "blog", href: "/blog" },
] as const;

export function Footer() {
  const { messages } = useI18n();
  const { footer } = messages;
  const whatsappUrl = buildWhatsAppUrl(site.whatsappNumber, messages.contact.form.whatsappMessage);

  return (
    <footer className="overflow-hidden border-t border-border">
      <Container>
        <div className="flex flex-col gap-10 py-12 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-4">
            <LocalizedLink href="/" aria-label={site.name} className="w-fit">
              <Image
                src="/logo/black.svg"
                alt="ShippersLab logo"
                width={44}
                height={24}
                unoptimized
                className="h-5 w-auto"
              />
            </LocalizedLink>
            <p className="max-w-sm text-sm text-muted">{footer.tagline}</p>
          </div>

          <FooterColumn title={footer.servicesTitle}>
            {serviceRoutes.map((route) => (
              <li key={route.slug}>
                <LocalizedLink href={`/${route.slug}`} className={LINK_CLASS}>
                  {footer.links[route.slug]}
                </LocalizedLink>
              </li>
            ))}
            <li>
              <LocalizedLink href={TIENDANUBE_PATH} className={LINK_CLASS}>
                {footer.links.tiendanube}
              </LocalizedLink>
            </li>
          </FooterColumn>

          <FooterColumn title={footer.exploreTitle}>
            {EXPLORE_LINKS.map((link) => (
              <li key={link.key}>
                <LocalizedLink href={link.href} className={LINK_CLASS}>
                  {footer.links[link.key]}
                </LocalizedLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={site.name}>
            <li>
              <a href={`mailto:${site.emails.contact}`} className={LINK_CLASS}>
                {site.emails.contact}
              </a>
            </li>
            {whatsappUrl ? (
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  {messages.contact.links.whatsapp}
                  <span className="sr-only">({messages.common.opensNewTab})</span>
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                X
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {YEAR} {site.name}. {footer.legal}
          </span>
          <LanguageToggle />
        </div>

        <Wordmark />
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-ink">{title}</p>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}
