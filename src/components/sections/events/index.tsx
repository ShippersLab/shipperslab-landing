"use client";

import { BuildingIllustration } from "@/components/sections/events/building-illustration";
import { PolaroidGallery } from "@/components/sections/events/polaroid-gallery";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Container } from "@/components/ui/container";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.3;
const ILLUSTRATION_DELAY = 0.5;
const GALLERY_TITLE_DELAY = 0.7;
const GALLERY_DELAY = 0.9;
const SPONSOR_DELAY = 0;

export function Events() {
  const { messages } = useI18n();

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="w-full py-20 sm:py-28">
        <div className="grid gap-8 sm:grid-cols-[1fr_1fr] sm:items-center sm:gap-6">
          <div className="max-w-xl">
            <h1 className="font-pixel text-4xl font-medium tracking-tighter sm:text-5xl">
              <DiaTextReveal
                text={messages.events.title}
                colors={["var(--accent)"]}
                textColor="var(--ink)"
                delay={TITLE_DELAY}
              />
            </h1>
            <WordReveal
              text={messages.events.description}
              delay={DESCRIPTION_DELAY}
              className="mt-5 text-lg text-muted"
            />
          </div>

          <Reveal delay={ILLUSTRATION_DELAY * 1000} className="w-full">
            <BuildingIllustration items={messages.events.formats} />
          </Reveal>
        </div>

        <div className="mt-20 sm:mt-28">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl">
              <DiaTextReveal
                text={messages.events.gallery.title}
                colors={["var(--accent)"]}
                textColor="var(--ink)"
                delay={GALLERY_TITLE_DELAY}
              />
            </h2>
            <WordReveal
              text={messages.events.gallery.description}
              delay={GALLERY_TITLE_DELAY + 0.15}
              className="mt-3 text-base text-muted"
            />
          </div>

          <div className="mt-12">
            <PolaroidGallery items={messages.events.gallery.items} delay={GALLERY_DELAY} />
          </div>
        </div>
      </Container>

      <Container className="border-t border-border py-20 sm:py-28">
        <Reveal
          delay={SPONSOR_DELAY * 1000}
          className="flex w-full flex-col items-start gap-5 rounded-lg border border-border p-8 sm:p-10"
        >
          <h2 className="text-2xl">{messages.events.sponsorTitle}</h2>
          <p className="text-base text-muted">{messages.events.sponsorDescription}</p>
          <TextureButton asChild variant="primary" size="pill" className="w-full sm:w-auto">
            <a href={`mailto:${site.emails.events}`}>{messages.events.cta}</a>
          </TextureButton>
        </Reveal>
      </Container>
    </div>
  );
}
