"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { buildWhatsAppUrl } from "@/lib/contact/message";
import { site } from "@/lib/site";

const HeroAscii = dynamic(
  () => import("@/components/sections/hero/hero-ascii").then((module) => module.HeroAscii),
  { ssr: false },
);

const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDABAQEBAREBIUFBIZGxgbGSUiHx8iJTgoKygrKDhVNT41NT41VUtbSkVKW0uHal5eaoecg3yDnL2pqb3u4u7/////2wBDARAQEBAREBIUFBIZGxgbGSUiHx8iJTgoKygrKDhVNT41NT41VUtbSkVKW0uHal5eaoecg3yDnL2pqb3u4u7/////wgARCAAHABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMG/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/2gAMAwEAAhADEAAAANXUNQ//xAAbEAACAgMBAAAAAAAAAAAAAAABAgADBCJhkf/aAAgBAQABPwCrOYtunktzgBohPZ//xAAYEQACAwAAAAAAAAAAAAAAAAAAAhESMf/aAAgBAgEBPwC7Rp//xAAYEQACAwAAAAAAAAAAAAAAAAAAAwESMv/aAAgBAwEBPwCUrvk//9k=";

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
              src="/images/hero-illustration.webp"
              alt={messages.hero.imageAlt}
              fill
              preload
              fetchPriority="high"
              quality={100}
              placeholder="blur"
              blurDataURL={HERO_BLUR_DATA_URL}
              className="animate-hero-image object-cover object-[22%_top] sm:object-top select-none"
              sizes="100vw"
            />
            <HeroAscii />
          </div>
        </div>
      </div>

      <Container className="grid shrink-0 gap-8 py-10 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-16 lg:pt-10 lg:pb-8">
        <h1 className="-mt-[0.12em] text-hero tracking-hero text-ink">
          <span className="inline-block animate-hero-title pb-[0.12em]">{messages.hero.title}</span>
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
