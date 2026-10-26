"use client";

import { motion, useReducedMotion } from "motion/react";

import { DescriptionWithLink } from "@/components/sections/services/description-with-link";
import { SERVICE_FIGURES } from "@/components/sections/services/figures";
import { ArcBandsBackground } from "@/components/ui/background/arc-bands-background";
import { TextureButton } from "@/components/ui/button/texture-button";
import { CheckIcon, DashboardIcon, GlobeIcon, PlugIcon, RobotIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { BLUR_EASE } from "@/lib/animation/motion";
import { getServiceHref } from "@/lib/services";
import { cn } from "@/lib/utils";

const SERVICE_ICONS = {
  systems: DashboardIcon,
  presence: GlobeIcon,
  bots: RobotIcon,
  integrations: PlugIcon,
} as const;

const SECOND_COLUMN_DELAY = 0.35;
const ITEM_STEP = 0.1;

type ServiceRowProps = {
  index: number;
  service: {
    id: string;
    title: string;
    description: string;
    includes: string[];
  };
};

function blurIn(blur: number, delay: number, instant: boolean) {
  return {
    initial: instant ? false : { opacity: 0, filter: `blur(${blur}px)` },
    whileInView: { opacity: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: BLUR_EASE, delay },
  } as const;
}

export function ServiceRow({ index, service }: ServiceRowProps) {
  const { messages } = useI18n();
  const instant = Boolean(useReducedMotion());
  const Figure = SERVICE_FIGURES[service.id];
  const ServiceIcon = SERVICE_ICONS[service.id as keyof typeof SERVICE_ICONS];
  const figureRight = index % 2 === 1;
  const figureDelay = figureRight ? SECOND_COLUMN_DELAY : 0;
  const textDelay = figureRight ? 0 : SECOND_COLUMN_DELAY;
  const text = (step: number) => blurIn(8, textDelay + step * ITEM_STEP, instant);

  return (
    <li
      id={service.id}
      className="grid items-center gap-8 border-t border-border py-12 first:border-t-0 first:pt-0 sm:py-16 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div
        {...blurIn(12, figureDelay, instant)}
        className={cn(
          "relative isolate mx-auto flex aspect-5/4 w-full items-center justify-center overflow-hidden rounded-lg bg-border/30 p-6 sm:p-10 [&>*:not([data-slot])]:max-h-full [&>*:not([data-slot])]:w-full [&_svg]:max-h-full",
          figureRight && "lg:order-2",
        )}
      >
        <ArcBandsBackground
          aria-hidden
          className="absolute inset-0 -z-10 bg-transparent opacity-90"
        />
        {Figure ? <Figure /> : null}
      </motion.div>

      <div className="flex max-w-lg flex-col items-start lg:px-4">
        <motion.span
          {...text(0)}
          className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-paper"
        >
          {ServiceIcon ? <ServiceIcon className="size-5" /> : null}
        </motion.span>
        <motion.h3 {...text(1)} className="mt-6 text-3xl sm:text-4xl">
          {service.title}
        </motion.h3>
        <motion.p {...text(2)} className="mt-4 text-base text-muted">
          <DescriptionWithLink
            text={service.description}
            opensNewTab={messages.common.opensNewTab}
            previewAlt={messages.services.eventopsPreviewAlt}
          />
        </motion.p>
        <motion.ul
          {...text(3)}
          className="mt-6 flex w-full flex-col gap-3 border-t border-border pt-6"
        >
          {service.includes.map((item) => (
            <li key={item} className="flex items-center gap-3 text-base text-ink">
              <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <CheckIcon className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </motion.ul>
        <motion.div {...text(4)} className="mt-8">
          <TextureButton asChild variant="secondary" size="square" className="w-auto">
            <LocalizedLink href={getServiceHref(service.id) ?? `/#${service.id}`}>
              {messages.services.moreCta}
            </LocalizedLink>
          </TextureButton>
        </motion.div>
      </div>
    </li>
  );
}
