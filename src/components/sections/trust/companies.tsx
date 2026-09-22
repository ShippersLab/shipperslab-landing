"use client";

import type { CSSProperties } from "react";

import { Reveal } from "@/components/ui/animation/reveal";
import { useI18n } from "@/i18n/provider";
import { companies } from "@/lib/site";

const LOGO_STAGGER = 0.08;

function logoMask(src: string): CSSProperties {
  return {
    maskImage: `url(${src})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
    WebkitMaskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
  };
}

export function Companies({ delay = 0 }: { delay?: number }) {
  const { messages } = useI18n();

  return (
    <>
      <Reveal delay={delay * 1000} className="mt-10">
        <p className="text-base text-muted sm:text-lg">{messages.trust.companiesTitle}</p>
      </Reveal>

      <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
        {companies.map((company, index) => (
          <Reveal key={company.name} as="li" delay={(delay + 0.15 + index * LOGO_STAGGER) * 1000}>
            {company.logo ? (
              <span
                role="img"
                aria-label={company.name}
                style={logoMask(company.logo)}
                className="block h-8 w-32 bg-ink/40 transition duration-300 ease-out hover:scale-105 hover:bg-accent"
              />
            ) : (
              <span className="font-heading text-base text-ink/40 transition-colors duration-300 hover:text-accent sm:text-lg">
                {company.name}
              </span>
            )}
          </Reveal>
        ))}
      </ul>
    </>
  );
}
