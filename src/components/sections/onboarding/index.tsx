"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { OnboardingForm } from "@/components/sections/onboarding/form";
import { DiaTextReveal } from "@/components/ui/animation/dia-text-reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";
import { BLUR_EASE, blurItem } from "@/lib/animation/motion";
import { PUERTO_BLUR_DATA_URL } from "@/lib/images/blur-data";
import { site } from "@/lib/site";

const BACKGROUND = "/images/puerto-accent.webp";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.25;
const FORM_DELAY = 0.45;
const ALTERNATIVE_DELAY = 0.6;

export function Onboarding() {
  const { messages } = useI18n();
  const reducedMotion = useReducedMotion();
  const copy = messages.onboarding;
  const initial = reducedMotion ? "visible" : "hidden";

  return (
    <div className="selection-paper relative isolate mx-auto w-full max-w-content flex-1 overflow-hidden border-x border-border">
      <motion.div
        aria-hidden
        initial={reducedMotion ? false : { opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: BLUR_EASE }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={BACKGROUND}
          alt=""
          fill
          preload
          fetchPriority="high"
          quality={90}
          placeholder="blur"
          blurDataURL={PUERTO_BLUR_DATA_URL}
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="object-cover object-bottom"
        />
      </motion.div>

      <Container className="flex flex-col items-center py-20 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="font-heading text-4xl tracking-heading text-paper sm:text-5xl">
            <DiaTextReveal
              text={copy.title}
              colors={["var(--paper)"]}
              textColor="var(--paper)"
              delay={TITLE_DELAY}
            />
          </h1>
          <WordReveal
            text={copy.description}
            delay={DESCRIPTION_DELAY}
            className="mt-5 max-w-md text-base text-paper/85 sm:text-lg"
          />
        </div>

        <motion.div
          variants={blurItem}
          initial={initial}
          animate="visible"
          transition={{ delay: FORM_DELAY }}
          className="mt-10 w-full max-w-2xl sm:mt-12"
        >
          <OnboardingForm />
        </motion.div>

        <motion.p
          variants={blurItem}
          initial={initial}
          animate="visible"
          transition={{ delay: ALTERNATIVE_DELAY }}
          className="mt-8 rounded-md bg-paper px-4 py-2 text-center text-sm text-ink/80"
        >
          {copy.alternative}{" "}
          <a
            href={`mailto:${site.emails.contact}`}
            className="font-medium text-ink underline decoration-accent underline-offset-4 transition-colors duration-200 hover:decoration-ink"
          >
            {site.emails.contact}
          </a>
        </motion.p>
      </Container>
    </div>
  );
}
