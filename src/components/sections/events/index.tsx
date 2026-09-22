"use client";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/animation/reveal";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

export function Events() {
  const { messages } = useI18n();

  return (
    <section className="flex min-h-dvh w-full flex-col justify-center py-28">
      <Container>
        <Reveal className="max-w-xl">
          <h1 className="font-pixel-circle font-medium tracking-tighter text-4xl sm:text-5xl">
            {messages.events.title}
          </h1>
          <p className="mt-5 text-lg text-muted">{messages.events.description}</p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {messages.events.formats.map((format) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={100}
          className="mt-14 flex w-full max-w-xl flex-col items-start gap-5 rounded-lg border border-border p-8 sm:p-10"
        >
          <h2 className="text-2xl">{messages.events.sponsorTitle}</h2>
          <p className="text-base text-muted">{messages.events.sponsorDescription}</p>
          <TextureButton asChild variant="primary" size="pill" className="w-auto">
            <a href={`mailto:${site.emails.events}`}>{messages.events.cta}</a>
          </TextureButton>
        </Reveal>
      </Container>
    </section>
  );
}
