"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { PlusIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Faq() {
  const { messages } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          imageRef.current,
          { autoAlpha: 0, filter: "blur(20px)" },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: imageRef.current, start: "top 85%", once: true },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(imageRef.current, { autoAlpha: 1, filter: "blur(0px)" });
      });

      return () => mm.revert();
    },
    { scope: imageRef },
  );

  return (
    <Section bordered>
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            ref={imageRef}
            className="relative aspect-square overflow-hidden rounded-lg border border-border"
          >
            <Image
              src="/images/bridge-illustration.webp"
              alt={messages.faq.imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <SectionHeading title={messages.faq.title} />

          <ul className="mt-8 divide-y divide-border border-t border-border">
            {messages.faq.items.map((item, index) => {
              const open = openIndex === index;

              return (
                <Reveal key={item.question} as="li" delay={index * 60}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-lg text-ink">{item.question}</span>
                    <PlusIcon
                      className={cn(
                        "size-4 shrink-0 text-muted transition-transform duration-200",
                        open && "rotate-45",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-base text-muted">{item.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
