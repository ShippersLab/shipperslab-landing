"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Container } from "@/components/ui/section/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { TextureButton } from "@/components/ui/button/texture-button";
import { HERO_TITLE_DELAY, useHeroAnimation } from "@/components/sections/hero/hero.animation";
import { useI18n } from "@/i18n/provider";

export function Hero() {
  const { messages } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  useHeroAnimation(sectionRef);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="flex min-h-[calc(100svh-68px)] w-full flex-1 flex-col bg-paper lg:min-h-svh lg:bg-transparent"
    >
      <div className="relative mt-10 lg:mt-0">
        <video
          ref={videoRef}
          src="/ascii-animation.mp4"
          poster="/images/hero-illustration.webp"
          aria-label={messages.hero.imageAlt}
          role="img"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          className="pointer-events-none aspect-4/3 w-full object-cover object-center select-none sm:aspect-8/3 sm:object-top lg:max-h-[calc(100svh-15rem)]"
        />
        <div
          aria-hidden
          className="animate-hero-veil pointer-events-none absolute inset-0 bg-paper"
        />
      </div>

      <div className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center border-x border-border lg:justify-start">
        <Container className="grid gap-8 py-10 lg:grid-cols-[1.8fr_1.2fr] lg:items-start lg:gap-0 lg:pt-6 lg:pb-16">
          <h1 className="max-w-full font-pixel text-hero tracking-hero text-ink">
            <DiaTextReveal
              text={messages.hero.title}
              colors={["var(--accent)"]}
              textColor="var(--ink)"
              delay={HERO_TITLE_DELAY}
              startOnView={false}
            />
          </h1>

          <div className="flex w-full max-w-fit flex-col gap-4 pt-1">
            <p className="hero-description invisible w-full font-sans text-sm leading-relaxed text-muted sm:text-lg">
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
