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
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAHABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDuINVLNiWBgeh2kfn1qS61PywRDC7t2JwB/OiiudTlY7nShzbH/9k=";

export function Hero() {
  const { messages } = useI18n();
  const whatsappUrl =
    buildWhatsAppUrl(site.whatsappNumber, messages.hero.whatsappMessage) ??
    `https://wa.me/?text=${encodeURIComponent(messages.hero.whatsappMessage)}`;

  return (
    <section id="top" className="flex w-full flex-col lg:h-[calc(100svh-1rem)] lg:min-h-160">
      <div className="px-4 sm:px-6 lg:min-h-0 lg:flex-1 lg:px-8">
        <div className="relative aspect-square overflow-hidden rounded-b-lg bg-paper sm:aspect-auto sm:h-[64svh] lg:h-full">
          <div className="absolute inset-x-0 top-24 bottom-0 sm:top-0">
            <Image
              src="/images/obelisco-white.webp"
              alt={messages.hero.imageAlt}
              fill
              preload
              fetchPriority="high"
              quality={100}
              unoptimized
              placeholder="blur"
              blurDataURL={HERO_BLUR_DATA_URL}
              className="animate-hero-image object-cover object-[22%_top] sm:object-top select-none"
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
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {messages.hero.primaryCta}
              </a>
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
