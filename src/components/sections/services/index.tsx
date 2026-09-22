"use client";

import { useEffect, useRef, useState } from "react";

import {
  SERVICE_ICONS,
  SERVICE_ILLUSTRATIONS,
  type ServiceId,
} from "@/components/sections/services/data";
import { Reveal } from "@/components/ui/animation/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function Services() {
  const { messages } = useI18n();
  const items = messages.services.items;
  const [activeId, setActiveId] = useState<ServiceId>(items[0].id);
  const panelRefs = useRef<Partial<Record<ServiceId, HTMLDivElement | null>>>({});

  function scrollToService(id: ServiceId) {
    panelRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

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

  return (
    <Section id="servicios" bordered>
      <SectionHeading
        title={messages.services.title}
        description={messages.services.description}
        className="max-w-lg"
      />

      <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[auto_1fr]">
        <div className="sticky top-24 hidden h-fit w-56 shrink-0 flex-col gap-1 lg:flex">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToService(item.id)}
              className={cn(
                "border-l-2 px-4 py-2 text-left text-sm transition duration-200 active:scale-95",
                activeId === item.id
                  ? "border-ink text-ink"
                  : "border-transparent text-muted hover:text-ink",
              )}
            >
              {item.title}
            </button>
          ))}
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
                <Reveal className="flex flex-col justify-between gap-8 pb-4 md:col-span-2">
                  <div>
                    <span className="mb-3 block text-sm text-muted">{item.title}</span>
                    <h3 className="text-2xl">{item.lead}</h3>
                    <p className="mt-3 text-lg text-ink">{item.description}</p>
                  </div>

                  <ul className="flex flex-col divide-y divide-border text-base text-muted">
                    {item.highlights.map((highlight, index) => {
                      const Icon = icons[index];

                      return (
                        <li key={highlight} className="flex items-center gap-3 py-3">
                          <Icon className="size-4 shrink-0" />
                          {highlight}
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>

                <Reveal
                  delay={100}
                  className="relative flex aspect-square rounded-lg border border-border bg-ink/2 p-3 md:col-span-3"
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
