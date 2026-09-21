"use client";

import { useI18n } from "@/i18n/provider";
import { Reveal } from "@/components/ui/reveal";

export function Trust() {
  const { messages } = useI18n();

  return (
    <section id="nosotros" className="border-t border-border py-16 sm:py-24 md:py-section">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">{messages.trust.title}</h2>
          <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
            {messages.trust.description}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {messages.trust.team.map((person, index) => (
            <Reveal
              key={`${person.name}-${index}`}
              as="li"
              delay={index * 80}
              className="flex flex-col gap-4 rounded-lg border border-border p-6"
            >
              <span
                aria-hidden
                className="flex size-12 items-center justify-center rounded-lg bg-ink font-heading text-lg text-paper"
              >
                {person.name.charAt(0)}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-base text-ink">{person.name}</span>
                <span className="text-sm text-muted">{person.role}</span>
                <p className="mt-2 text-sm text-muted">{person.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 rounded-lg bg-ink/3 p-8 sm:p-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {messages.trust.principles.map((principle) => (
              <li key={principle} className="text-sm text-ink sm:text-base">
                {principle}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-lg text-ink">{messages.trust.ctaTitle}</p>
          <a
            href="mailto:hola@shipperslab.tech"
            className="text-lg text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
          >
            {messages.trust.ctaButton}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
