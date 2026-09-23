"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { TextureButton } from "@/components/ui/texture-button";
import { useHeroAnimation } from "@/components/sections/hero/hero.animation";
import { useI18n } from "@/i18n/provider";

const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAHABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs4tURsedGyEdehzS3eqLF8sMbO3qcAUUVye1lY9H6vT5tj//Z";

export function Hero() {
  const { messages } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useHeroAnimation(sectionRef);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="flex min-h-[calc(100svh-68px)] w-full flex-1 flex-col bg-[#EDEFF3] lg:min-h-svh lg:bg-transparent"
    >
      <Image
        src="/images/hero-illustration.webp"
        alt={messages.hero.imageAlt}
        width={1920}
        height={822}
        priority
        quality={90}
        placeholder="blur"
        blurDataURL={HERO_BLUR_DATA_URL}
        className="hero-image invisible mt-10 aspect-4/3 sm:aspect-8/3 w-full object-cover object-center sm:object-top select-none lg:mt-0"
        sizes="100vw"
      />

      <div className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center border-x border-border lg:justify-start">
        <Container className="grid gap-8 py-10 lg:grid-cols-[1.8fr_1.2fr] lg:items-start lg:gap-0 lg:pt-10   lg:pb-16">
          <h1 className="hero-title invisible max-w-full font-pixel text-4xl leading-[0.95] tracking-tighter text-ink sm:text-5xl lg:text-6xl lg:leading-none">
            {messages.hero.title}
          </h1>

          <div className="flex w-full max-w-fit flex-col gap-6 pt-1">
            <p className="hero-description invisible w-full font-sans text-sm leading-relaxed tracking-tight text-muted sm:text-base">
              {messages.hero.description}
            </p>

            <div className="hero-ctas invisible flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <TextureButton
                asChild
                variant="primary"
                size="pill"
                className="w-full rounded-full sm:w-auto"
              >
                <Link href="/empecemos" className="text-sm sm:text-base">
                  {messages.hero.primaryCta}
                </Link>
              </TextureButton>
              <a
                href="#servicios"
                className="group flex items-center justify-center gap-1 px-4 py-2.5 text-sm text-muted transition-colors duration-200 hover:text-ink sm:justify-start sm:text-base"
              >
                {messages.hero.secondaryCta}
                <ArrowRightIcon
                  size={16}
                  className="mt-px transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
