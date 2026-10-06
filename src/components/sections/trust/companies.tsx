"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/ui/animation/reveal";
import { useI18n } from "@/i18n/provider";
import { companies } from "@/lib/site";

function logoMask(src: string): CSSProperties {
  return {
    maskImage: `url(${src})`,
    maskRepeat: "no-repeat",
    maskSize: "contain",
    WebkitMaskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
  };
}

export function Companies({
  delay = 0,
  showTitle = true,
}: {
  delay?: number;
  showTitle?: boolean;
}) {
  const { messages } = useI18n();

  return (
    <>
      {showTitle ? (
        <Reveal delay={delay * 1000} className="mt-16 sm:mt-20">
          <p className="text-sm text-muted sm:text-base">{messages.trust.companiesTitle}:</p>
        </Reveal>
      ) : null}

      <ul
        className={`${showTitle ? "mt-6" : "mt-0"} grid grid-cols-2 items-center gap-x-6 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-12`}
      >
        {companies.map((company, index) => (
          <Reveal key={company.name} as="li" delay={(0.05 + index * 0.05) * 1000}>
            {company.logo ? (
              <div className="group relative h-10 w-full max-w-40 transition-transform duration-300 ease-out hover:-translate-y-1 sm:h-12 sm:w-40">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  sizes="160px"
                  className="object-contain object-left opacity-40 transition-opacity duration-300 ease-out group-hover:opacity-0 sm:object-center"
                />
                <span
                  aria-hidden
                  style={logoMask(company.logo)}
                  className="mask-left absolute inset-0 bg-accent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:mask-center"
                />
              </div>
            ) : (
              <span className="font-heading text-lg text-ink/40 transition-[color,transform] duration-300 ease-out hover:-translate-y-1 hover:text-accent sm:text-xl">
                {company.name}
              </span>
            )}
          </Reveal>
        ))}
      </ul>
    </>
  );
}
