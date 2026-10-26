"use client";

import Image from "next/image";

import { HERO_TITLE_DELAY, HERO_TITLE_DURATION } from "@/components/sections/hero/hero.animation";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { buildWhatsAppUrl } from "@/lib/contact/message";
import { site } from "@/lib/site";

const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAHRAAAgIDAAMAAAAAAAAAAAAAAQIAAwUREgQhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAYH/8QAGREAAgMBAAAAAAAAAAAAAAAAAAECAxEE/9oADAMBAAIRAxEAPwDXuw7r4W6XSxxad+uTzyNSWjF3WaLFEBP0xEKOqOlRj1WY0f/Z";

export function Hero() {
  const { messages } = useI18n();
  const whatsappUrl = buildWhatsAppUrl(site.whatsappNumber, messages.hero.whatsappMessage);

  return (
    <section id="top" className="flex w-full flex-col lg:h-[calc(100svh-1rem)] lg:min-h-160">
      <div className="px-4 pt-4 sm:px-6 lg:min-h-0 lg:flex-1 lg:px-8">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-accent sm:aspect-auto sm:h-[64svh] lg:h-full">
          <div className="absolute inset-x-0 top-16 bottom-0 sm:top-0">
            <Image
              src="/images/obelisco-accent.webp"
              alt={messages.hero.imageAlt}
              fill
              preload
              fetchPriority="high"
              quality={100}
              placeholder="blur"
              blurDataURL={HERO_BLUR_DATA_URL}
              className="animate-hero-image object-cover object-[25%_bottom] sm:object-[30%_center] select-none"
              sizes="(min-width: 1200px) 1200px, 100vw"
            />
          </div>
        </div>
      </div>

      <Container className="grid shrink-0 gap-8 py-10 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-16 lg:pt-10 lg:pb-8">
        <h1 className="-mt-[0.12em] text-hero tracking-hero text-ink">
          <DiaTextReveal
            text={messages.hero.title}
            colors={["var(--accent)"]}
            textColor="var(--ink)"
            delay={HERO_TITLE_DELAY}
            duration={HERO_TITLE_DURATION}
            className="pb-[0.12em]"
            startOnView={false}
          />
        </h1>

        <div className="flex flex-col gap-6">
          <p className="mt-2 animate-hero-text text-base text-muted [animation-delay:0.75s] sm:text-lg">
            {messages.hero.description}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <TextureButton
              asChild
              variant="primary"
              size="square"
              className="w-full animate-hero-text [animation-delay:0.9s] sm:w-auto"
            >
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {messages.hero.primaryCta}
                </a>
              ) : (
                <LocalizedLink href="/empecemos">{messages.hero.primaryCta}</LocalizedLink>
              )}
            </TextureButton>
            <TextureButton
              asChild
              variant="secondary"
              size="square"
              className="w-full animate-hero-text [animation-delay:1.02s] sm:w-auto"
            >
              <LocalizedLink href="/casos">{messages.hero.secondaryCta}</LocalizedLink>
            </TextureButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
