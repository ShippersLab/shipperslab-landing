"use client";

import { Reveal } from "@/components/ui/animation/reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";

export function CaseCta() {
  const { messages } = useI18n();
  const page = messages.casos;

  return (
    <Reveal className="mx-auto mt-28 flex w-full max-w-2xl flex-col items-center gap-5 text-center sm:mt-32">
      <h2 className="text-2xl text-ink sm:text-3xl">{page.ctaTitle}</h2>
      <p className="text-base text-muted sm:text-lg">{page.ctaDescription}</p>
      <TextureButton asChild variant="primary" size="square" className="w-full sm:w-auto">
        <LocalizedLink href="/empecemos">{page.ctaButton}</LocalizedLink>
      </TextureButton>
    </Reveal>
  );
}
