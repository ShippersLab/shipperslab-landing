"use client";

import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

export function EventOpsCard({ delay = 0 }: { delay?: number }) {
  const { messages } = useI18n();
  const { label, title, description, cta } = messages.trust.eventops;

  return (
    <Reveal
      delay={delay * 1000}
      className="mt-12 max-w-2xl rounded-lg border border-border bg-paper p-6 sm:p-8"
    >
      <p className="font-mono text-label tracking-label text-muted uppercase">{label}</p>
      <h3 className="mt-4 text-2xl sm:text-3xl">{title}</h3>
      <WordReveal
        text={description}
        delay={delay + 0.15}
        className="mt-3 text-base text-ink sm:text-lg"
      />
      <a
        href={site.eventopsUrl}
        target="_blank"
        rel="noreferrer"
        className="group mt-6 inline-flex items-center gap-2 text-base text-ink underline decoration-border underline-offset-4 transition-colors duration-200 hover:decoration-ink"
      >
        {cta}
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </Reveal>
  );
}
