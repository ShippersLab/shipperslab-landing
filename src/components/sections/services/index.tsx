"use client";

import { useEffect, useRef, useState } from "react";

import {
  SERVICE_ICONS,
  SERVICE_ILLUSTRATIONS,
  type ServiceId,
} from "@/components/sections/services/data";
import { Reveal } from "@/components/ui/animation/reveal";
import { WordReveal } from "@/components/ui/animation/word-reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.45;
const LABEL_DELAY = 0;
const LEAD_DELAY = 0.08;
const SERVICE_DESCRIPTION_DELAY = 0.16;
const HIGHLIGHT_DELAY = 0.24;
const HIGHLIGHT_STAGGER = 0.06;
const ILLUSTRATION_DELAY = 0.2;

export function Services() {
  const { messages } = useI18n();
  const items = messages.services.items;
  const [activeId, setActiveId] = useState<ServiceId>(items[0].id);
  const panelRefs = useRef<Partial<Record<ServiceId, HTMLDivElement | null>>>({});
  const navRefs = useRef<Partial<Record<ServiceId, HTMLButtonElement | null>>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  function scrollToService(id: ServiceId) {
    panelRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    navRefs.current[activeId]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId]);

  useEffect(() => {
    const panels = items.flatMap((item) => {
      const panel = panelRefs.current[item.id];
      return panel ? [panel] : [];
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.id;
        if (nextId) {
          setActiveId(nextId);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55, 0.75] },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [items]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 96px",
          end: "bottom bottom",
          pin: sidebarRef.current,
          pinSpacing: false,
        });

        return () => pin.kill();
      });

      return () => mm.revert();
    },
    { scope: gridRef },
  );

  return (
    <Section id="servicios" bordered>
      <SectionHeading
        title={messages.services.title}
        description={messages.services.description}
        className="max-w-lg"
        titleDelay={TITLE_DELAY}
        descriptionDelay={DESCRIPTION_DELAY}
      />

      <div className="sticky top-0 z-10 -mx-4 mt-8 flex gap-2 overflow-x-auto border-b border-border bg-paper/90 px-4 py-3 backdrop-blur-sm md:-mx-8 lg:hidden">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            ref={(element) => {
              navRefs.current[item.id] = element;
            }}
            onClick={() => scrollToService(item.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-200",
              activeId === item.id
                ? "border-ink bg-ink text-paper"
                : "border-border text-muted hover:text-ink",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="mt-8 grid gap-6 lg:mt-16 lg:grid-cols-[auto_1fr]">
        <div className="hidden lg:block">
          <div
            ref={sidebarRef}
            className="flex w-56 flex-col gap-1 motion-reduce:sticky motion-reduce:top-24"
          >
            {items.map((item, index) => (
              <Reveal key={item.id} delay={index * 60}>
                <button
                  type="button"
                  onClick={() => scrollToService(item.id)}
                  className={cn(
                    "w-full border-l-2 px-4 py-2 text-left text-sm transition duration-200 active:scale-95",
                    activeId === item.id
                      ? "border-ink text-ink"
                      : "border-transparent text-muted hover:text-ink",
                  )}
                >
                  {item.title}
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {items.map((item) => {
            const Illustration = SERVICE_ILLUSTRATIONS[item.id];
            const icons = SERVICE_ICONS[item.id];

            return (
              <div
                key={item.id}
                id={item.id}
                ref={(element) => {
                  panelRefs.current[item.id] = element;
                }}
                className="grid scroll-mt-32 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:gap-12"
              >
                <div className="flex flex-col justify-between gap-8 pb-4 md:col-span-2">
                  <div>
                    <Reveal delay={LABEL_DELAY * 1000}>
                      <span className="block text-sm text-muted">{item.title}</span>
                    </Reveal>
                    <Reveal delay={LEAD_DELAY * 1000}>
                      <h3 className="mt-3 text-3xl">{item.lead}</h3>
                    </Reveal>
                    <WordReveal
                      text={item.description}
                      delay={SERVICE_DESCRIPTION_DELAY}
                      className="mt-3 text-base text-ink"
                    />
                  </div>

                  <ul className="flex flex-col divide-y divide-border text-base text-muted">
                    {item.highlights.map((highlight, index) => {
                      const Icon = icons[index];

                      return (
                        <Reveal
                          key={highlight}
                          as="li"
                          delay={(HIGHLIGHT_DELAY + index * HIGHLIGHT_STAGGER) * 1000}
                          className="flex items-center gap-3 py-3"
                        >
                          <Icon className="size-4 shrink-0" />
                          {highlight}
                        </Reveal>
                      );
                    })}
                  </ul>
                </div>

                <Reveal
                  delay={ILLUSTRATION_DELAY * 1000}
                  className="relative flex aspect-4/3 rounded-lg border border-border bg-ink/2 p-3 md:col-span-3"
                >
                  <Illustration />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
