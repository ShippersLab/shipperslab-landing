"use client";

import Link from "next/link";

import { ServiceBody } from "@/components/sections/service-page/service-body";
import { ServiceHero } from "@/components/sections/service-page/service-hero";
import { Reveal } from "@/components/ui/animation/reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import type { ServiceSlug } from "@/lib/services";
import { serviceRoutes } from "@/lib/services";

const CTA_DELAY = 0.2;

type ServicePageProps = {
  slug: ServiceSlug;
};

export function ServicePage({ slug }: ServicePageProps) {
  const { messages } = useI18n();
  const page = messages.servicePages[slug];
  const related = serviceRoutes.filter((route) => route.slug !== slug);

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <ServiceHero eyebrow={messages.servicePages.eyebrow} title={page.h1} lead={page.lead} />

      <Container className="w-full py-16 sm:py-20">
        <ServiceBody page={page} processLink={messages.servicePages.processLink} />

        <Reveal
          delay={CTA_DELAY * 1000}
          className="mt-16 flex w-full flex-col items-start gap-5 rounded-lg border border-border p-8 sm:mt-20 sm:p-10"
        >
          <h2 className="text-2xl text-ink">{page.ctaTitle}</h2>
          <p className="max-w-2xl text-base text-muted">{page.ctaDescription}</p>
          <TextureButton asChild variant="primary" size="pill" className="w-full sm:w-auto">
            <Link href="/empecemos">{page.ctaButton}</Link>
          </TextureButton>
        </Reveal>
      </Container>

      <Container className="border-t border-border py-16 sm:py-20">
        <Reveal>
          <h2 className="text-xl text-ink sm:text-2xl">{messages.servicePages.relatedTitle}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {related.map((route) => (
              <li key={route.slug}>
                <Link
                  href={`/${route.slug}`}
                  className="block rounded-lg border border-border px-4 py-3 text-sm text-ink transition-colors duration-200 ease-out hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-base"
                >
                  {messages.servicePages[route.slug].navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
