"use client";

import { useI18n } from "@/i18n/provider";
import { TextureButton } from "@/components/ui/texture-button";
import { Reveal } from "@/components/ui/reveal";

export function Events() {
  const { messages } = useI18n();

  return (
    <section className="flex w-full flex-1 flex-col pt-28 pb-16 sm:pt-32 md:pb-section">
      <div className="mx-auto w-full max-w-content px-4 md:px-8">
        <Reveal className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl">{messages.events.title}</h1>
          <p className="mt-6 text-base text-muted sm:text-lg">{messages.events.description}</p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-label tracking-label text-muted uppercase">
            {messages.events.formats.map((format) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={100}
          className="mt-16 flex flex-col gap-6 rounded-lg border border-border p-8 sm:p-10 lg:max-w-2xl"
        >
          <h2 className="text-2xl">{messages.events.sponsorTitle}</h2>
          <p className="max-w-md text-base text-muted">{messages.events.sponsorDescription}</p>
          <TextureButton asChild variant="primary" size="pill" className="w-auto">
            <a href="mailto:eventos@shipperslab.tech">{messages.events.cta}</a>
          </TextureButton>
        </Reveal>
      </div>
    </section>
  );
}
