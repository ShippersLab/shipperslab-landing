"use client";

import { useI18n } from "@/i18n/provider";
import { Reveal } from "@/components/ui/reveal";

export function Trust() {
  const { messages } = useI18n();

  return (
    <section id="nosotros" className="border-t border-border py-16 sm:py-24 md:py-section">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="max-w-md text-3xl sm:text-4xl">{messages.trust.title}</h2>
            <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
              {messages.trust.description}
            </p>
          </Reveal>

          <ul className="flex flex-col divide-y divide-border border-t border-border lg:border-t-0">
            {messages.trust.team.map((person, index) => (
              <Reveal
                key={`${person.name}-${index}`}
                as="li"
                delay={index * 80}
                className="flex items-center gap-4 py-5 first:pt-0 lg:first:pt-5"
              >
                <span
                  aria-hidden
                  className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-ink font-heading text-lg text-paper"
                >
                  {person.name.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="text-base text-ink">
                    {person.name}
                    <span className="text-muted"> · {person.role}</span>
                  </span>
                  <span className="text-sm text-muted">{person.detail}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <ul className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {messages.trust.principles.map((principle, index) => (
            <Reveal key={principle} as="li" delay={index * 80}>
              <p className="text-sm text-ink sm:text-base">{principle}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
