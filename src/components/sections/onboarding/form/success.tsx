"use client";

import Link from "next/link";

import { Reveal } from "@/components/ui/animation/reveal";
import { CheckIcon } from "@/components/ui/icons";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";

const ITEM_STAGGER = 80;

export function Success() {
  const { messages } = useI18n();
  const copy = messages.onboarding.success;

  return (
    <div role="status" className="flex flex-col items-center gap-5 py-6 text-center">
      <Reveal>
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-paper">
          <CheckIcon size={22} aria-hidden="true" />
        </span>
      </Reveal>
      <Reveal delay={ITEM_STAGGER}>
        <h2 className="text-4xl">{copy.title}</h2>
      </Reveal>
      <Reveal delay={ITEM_STAGGER * 2}>
        <p className="max-w-sm text-sm text-muted sm:text-base">{copy.description}</p>
      </Reveal>
      <Reveal delay={ITEM_STAGGER * 3}>
        <TextureButton asChild variant="secondary" size="pill" className="w-auto rounded-full">
          <Link href="/" className="text-sm sm:text-base">
            {copy.cta}
          </Link>
        </TextureButton>
      </Reveal>
    </div>
  );
}
