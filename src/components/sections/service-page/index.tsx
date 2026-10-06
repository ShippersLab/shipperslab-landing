"use client";

import Link from "next/link";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import type { ServiceSlug } from "@/lib/services";
import { serviceRoutes } from "@/lib/services";

const TITLE_DELAY = 0;
const LEAD_DELAY = 0.25;
const BODY_DELAY = 0.4;
const CTA_DELAY = 0.55;

type ServicePageProps = {
  slug: ServiceSlug;
};

export function ServicePage({ slug }: ServicePageProps) {
  const { messages } = useI18n();
  const page = messages.servicePages[slug];
  const related = serviceRoutes.filter((route) => route.slug !== slug);

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-sm text-muted">{messages.servicePages.eyebrow}</p>
          <h1 className="mt-4 font-pixel text-4xl font-medium tracking-tighter text-ink sm:text-5xl">
            <DiaTextReveal
              text={page.h1}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={TITLE_DELAY}
            />
          </h1>
          <WordReveal text={page.lead} delay={LEAD_DELAY} className="mt-5 text-lg text-muted" />
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 sm:gap-12">
          {page.sections.map((section, index) => (
            <Reveal key={section.title} delay={(BODY_DELAY + index * 0.08) * 1000}>
              <div className="max-w-2xl border-t border-border pt-8">
                <h2 className="text-2xl text-ink sm:text-3xl">{section.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  {section.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={CTA_DELAY * 1000}
          className="mt-16 flex w-full max-w-2xl flex-col items-start gap-5 rounded-lg border border-border p-8 sm:mt-20 sm:p-10"
        >
          <h2 className="text-2xl text-ink">{page.ctaTitle}</h2>
          <p className="text-base text-muted">{page.ctaDescription}</p>
          <TextureButton asChild variant="primary" size="pill" className="w-full sm:w-auto">
            <Link href="/empecemos">{page.ctaButton}</Link>
          </TextureButton>
        </Reveal>
      </Container>

      <Container className="border-t border-border py-16 sm:py-20">
        <Reveal>
          <h2 className="text-xl text-ink sm:text-2xl">{messages.servicePages.relatedTitle}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
