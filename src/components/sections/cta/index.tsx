"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Section } from "@/components/ui/section/section";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { BLUR_EASE, blurItem, staggerGroup } from "@/lib/animation/motion";
import { SALTO_BLUR_DATA_URL } from "@/lib/images/blur-data";

const textGroup = staggerGroup(0.3);

export function Cta() {
  const { messages } = useI18n();
  const reducedMotion = useReducedMotion();
  const copy = messages.cta;

  return (
    <Section bordered>
      <div className="selection-paper relative isolate flex min-h-120 items-start justify-center overflow-hidden rounded-lg px-6 pt-20 sm:min-h-128 sm:pt-24 lg:aspect-video lg:min-h-0 lg:pt-24">
        <motion.div
          aria-hidden
          initial={reducedMotion ? false : { opacity: 0, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: BLUR_EASE }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src="/images/salto-accent.webp"
            alt=""
            fill
            quality={90}
            loading="lazy"
            placeholder="blur"
            blurDataURL={SALTO_BLUR_DATA_URL}
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover object-bottom"
          />
        </motion.div>

        <motion.div
          variants={textGroup}
          initial={reducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex max-w-md flex-col items-center text-center"
        >
          <h2 className="text-5xl text-paper sm:text-6xl lg:text-7xl">
            <DiaTextReveal text={copy.title} colors={["var(--ink)"]} textColor="var(--paper)" />
          </h2>
          <WordReveal
            text={copy.description}
            delay={0.25}
            className="mt-4 text-base text-paper/85 sm:text-lg"
          />
          <motion.div variants={blurItem} className="mt-8">
            <TextureButton asChild variant="paper" size="square" className="w-fit">
              <LocalizedLink href="/empecemos">{copy.button}</LocalizedLink>
            </TextureButton>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
