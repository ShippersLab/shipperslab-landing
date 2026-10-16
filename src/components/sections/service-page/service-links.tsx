"use client";

import Link from "next/link";

import { Reveal } from "@/components/ui/animation/reveal";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import type { ServiceSlug } from "@/lib/services";
import { cn } from "@/lib/utils";

type ServiceLinksProps = {
  title: string;
  slugs: readonly ServiceSlug[];
};

export function ServiceLinks({ title, slugs }: ServiceLinksProps) {
  const { messages } = useI18n();

  return (
    <Container className="border-t border-border py-16 sm:py-20">
      <Reveal>
        <h2 className="text-xl text-ink sm:text-2xl">{title}</h2>
        <ul
          className={cn(
            "mt-6 grid gap-3 sm:grid-cols-3",
            slugs.length === 4 && "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {slugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="block rounded-lg border border-border px-4 py-3 text-sm text-ink transition-colors duration-200 ease-out hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-base"
              >
                {messages.servicePages[slug].navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}
