"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { HugeiconsIconProps } from "@hugeicons/react";

import { useI18n } from "@/i18n/provider";
import type { Messages } from "@/i18n/get-messages";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import {
  ChatIcon,
  DashboardIcon,
  DatabaseIcon,
  DocumentIcon,
  GlobeIcon,
  PhoneIcon,
  RefreshIcon,
  RobotIcon,
  RocketIcon,
  TeamIcon,
  UploadIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import {
  AiInputIllustration,
  BrowserIllustration,
  DashboardIllustration,
  FlowIllustration,
} from "@/components/sections/service-illustrations";

type ServiceId = Messages["services"]["items"][number]["id"];
type IconComponent = (props: Omit<HugeiconsIconProps, "icon">) => ReactNode;

const ICONS: Record<ServiceId, IconComponent[]> = {
  software: [DashboardIcon, DatabaseIcon, TeamIcon],
  automation: [WorkflowIcon, UploadIcon, RefreshIcon],
  ai: [RobotIcon, DocumentIcon, ChatIcon],
  products: [GlobeIcon, PhoneIcon, RocketIcon],
};

const ILLUSTRATIONS: Record<ServiceId, () => ReactNode> = {
  software: DashboardIllustration,
  automation: FlowIllustration,
  ai: AiInputIllustration,
  products: BrowserIllustration,
};

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
    const panels = items
      .map((item) => panelRefs.current[item.id])
      .filter((panel): panel is HTMLDivElement => panel != null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.id as ServiceId | undefined;
        if (nextId) setActiveId(nextId);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55, 0.75] },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="servicios" className="border-t border-border py-16 sm:py-24 md:py-section">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <Reveal className="max-w-lg">
          <h2 className="text-3xl sm:text-4xl">{messages.services.title}</h2>
          <p className="mt-5 text-base text-muted sm:text-lg">{messages.services.description}</p>
        </Reveal>

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
              const Illustration = ILLUSTRATIONS[item.id];
              const icons = ICONS[item.id];

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
                      <h3 className="mb-3 text-sm text-muted">{item.title}</h3>
                      <p className="text-lg text-ink">
                        <span className="font-medium">{item.lead}</span> {item.description}
                      </p>
                    </div>

                    <ul className="flex flex-col divide-y divide-border text-muted">
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
      </div>
    </section>
  );
}
