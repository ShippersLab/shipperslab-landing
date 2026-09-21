"use client";

import Image from "next/image";
import Link from "next/link";

import { Wordmark } from "@/components/layout/wordmark";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const YEAR = new Date().getFullYear();

export function Footer() {
  const { messages } = useI18n();

  return (
    <footer className="border-t border-border pt-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="flex flex-col gap-3 lg:col-span-2">
            <Link href="/" aria-label={site.name} className="w-fit">
              <Image
                src="/logo/black.svg"
                alt="ShippersLab logo"
                width={44}
                height={24}
                unoptimized
                className="h-5 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm text-muted">{messages.footer.tagline}</p>
          </Reveal>

          <Reveal delay={80} className="flex flex-col gap-3">
            <span className="font-mono text-label tracking-label text-muted uppercase">
              {messages.footer.servicesTitle}
            </span>
            <ul className="flex flex-col gap-2">
              {messages.services.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="text-sm text-ink/70 transition-colors duration-200 hover:text-ink"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160} className="flex flex-col gap-3">
            <span className="font-mono text-label tracking-label text-muted uppercase">
              {messages.footer.contactTitle}
            </span>
            <ul className="flex flex-col gap-2 text-sm text-ink/70">
              <li>
                <a
                  href={`mailto:${site.emails.contact}`}
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {site.emails.contact}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.emails.events}`}
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {site.emails.events}
                </a>
              </li>
              <li>
                <a
                  href={site.social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {site.social.xHandle}
                </a>
              </li>
              <li>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-ink"
                >
                  GitHub
                </a>
              </li>
              <li className="pt-1 text-muted">{messages.footer.location}</li>
            </ul>
          </Reveal>
        </div>

        <Reveal
          delay={240}
          className="mt-12 flex flex-col gap-2 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
        >
          <span>© {YEAR} ShippersLab</span>
          <span>{messages.footer.legal}</span>
        </Reveal>
      </Container>

      <Wordmark />
    </footer>
  );
}
