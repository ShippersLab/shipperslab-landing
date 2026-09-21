"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/i18n/provider";
import { companies } from "@/lib/site";

export function Companies() {
  const { messages } = useI18n();

  return (
    <Reveal className="mt-10">
      <p className="text-sm text-muted">{messages.trust.companiesTitle}</p>

      <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
        {companies.map((company) => (
          <li key={company.name}>
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                width={140}
                height={36}
                className="h-8 w-fit opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="font-heading text-xl text-ink/40 transition-colors duration-200 hover:text-ink/70">
                {company.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
