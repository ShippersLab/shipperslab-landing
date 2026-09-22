"use client";

import Image from "next/image";
import Link from "next/link";

import { Wordmark } from "@/components/layout/wordmark";
import { Reveal } from "@/components/ui/animation/reveal";
import { Container } from "@/components/ui/container";
import { MailIcon, TwitterIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const YEAR = new Date().getFullYear();

export function Footer() {
  const { messages } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-content border-x border-border">
        <Container>
          <Reveal
            duration={0.8}
            className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="flex flex-col gap-4">
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
              <p className="max-w-sm text-sm text-muted">{messages.footer.tagline}</p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`mailto:${site.emails.contact}`}
                aria-label={site.emails.contact}
                className="text-muted transition-colors duration-200 hover:text-ink"
              >
                <MailIcon size={20} />
              </a>
              <a
                href={site.social.x}
                target="_blank"
                rel="noreferrer"
                aria-label={site.social.xHandle}
                className="text-muted transition-colors duration-200 hover:text-ink"
              >
                <TwitterIcon size={20} />
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={200}
            duration={0.8}
            className="flex flex-col gap-2 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
          >
            <span>© {YEAR} ShippersLab</span>
            <span>{messages.footer.legal}</span>
          </Reveal>
        </Container>

        <Wordmark />
      </div>
    </footer>
  );
}
