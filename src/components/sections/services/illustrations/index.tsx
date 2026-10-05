"use client";

import { useRef } from "react";

import { useBuildIn } from "@/components/sections/services/illustrations/illustrations.animation";
import {
  CalendarIcon,
  CashierIcon,
  InvoiceIcon,
  OrdersIcon,
  RobotIcon,
  SpreadsheetIcon,
  StockIcon,
  WhatsAppIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const DOTS = ["a", "b", "c"];

const TABLE_ROWS = [
  { Icon: StockIcon, bar: "w-2/3", highlighted: false },
  { Icon: OrdersIcon, bar: "w-5/6", highlighted: true },
  { Icon: CashierIcon, bar: "w-1/2", highlighted: false },
  { Icon: StockIcon, bar: "w-3/4", highlighted: false },
];

const CHAT_BUBBLES = [
  { id: "in-1", own: false, bars: ["w-32", "w-20"] },
  { id: "out-1", own: true, bars: ["w-28"] },
  { id: "in-2", own: false, bars: ["w-24"] },
];

export function SystemsIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  useBuildIn(ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-8 z-1 m-auto flex h-fit max-w-sm flex-col gap-3 rounded-lg border border-border bg-paper p-4"
    >
      <div className="flex items-center gap-1.5">
        {DOTS.map((dot) => (
          <span key={dot} className="invisible build-dot size-2 rounded-full bg-accent/40" />
        ))}
      </div>
      <div className="flex flex-col gap-2 pt-1">
        {TABLE_ROWS.map(({ Icon, bar, highlighted }, index) => (
          <div
            key={index}
            className={cn(
              "invisible build-pop flex items-center gap-3 rounded-md border px-2.5 py-2",
              highlighted ? "border-accent/50 bg-accent/5" : "border-border",
            )}
          >
            <Icon className={cn("size-4 shrink-0", highlighted ? "text-accent" : "text-muted")} />
            <span className={cn("h-2 rounded-full bg-accent/20", bar)} />
            <span className="ml-auto h-2 w-6 shrink-0 rounded-full bg-border" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntegrationsIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  useBuildIn(ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-8 z-1 m-auto flex h-fit max-w-sm items-center justify-between gap-2"
    >
      <div className="flex shrink-0 flex-col gap-3">
        <span className="invisible build-pop flex size-14 items-center justify-center rounded-lg border border-border bg-paper text-muted">
          <WhatsAppIcon className="size-5" />
        </span>
        <span className="invisible build-pop flex size-14 items-center justify-center rounded-lg border border-border bg-paper text-muted">
          <SpreadsheetIcon className="size-5" />
        </span>
      </div>
      <span className="invisible build-bar h-px flex-1 bg-border" />
      <div className="invisible build-pop flex size-14 shrink-0 items-center justify-center rounded-lg border border-accent bg-accent text-paper">
        <WorkflowIcon className="size-5" />
      </div>
      <span className="invisible build-bar h-px flex-1 bg-border" />
      <span className="invisible build-pop flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-paper text-muted">
        <InvoiceIcon className="size-5" />
      </span>
    </div>
  );
}

export function BotsIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  useBuildIn(ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-8 z-1 m-auto flex h-fit max-w-sm flex-col gap-2.5 rounded-lg border border-border bg-paper p-4"
    >
      {CHAT_BUBBLES.map(({ id, own, bars }) => (
        <div
          key={id}
          className={cn(
            "invisible build-pop flex items-end gap-2",
            own ? "flex-row-reverse" : "flex-row",
          )}
        >
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full",
              own ? "bg-accent text-paper" : "bg-ink/5 text-muted",
            )}
          >
            {own ? <RobotIcon className="size-3.5" /> : <WhatsAppIcon className="size-3.5" />}
          </span>
          <div
            className={cn(
              "flex flex-col gap-1.5 rounded-lg border px-3 py-2.5",
              own ? "border-accent/40 bg-accent/5" : "border-border",
            )}
          >
            {bars.map((width) => (
              <span
                key={width}
                className={cn("h-2 rounded-full", width, own ? "bg-accent/30" : "bg-border")}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PresenceIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  useBuildIn(ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-8 z-1 m-auto flex h-fit max-w-sm flex-col overflow-hidden rounded-lg border border-border bg-paper"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        {DOTS.map((dot) => (
          <span key={dot} className="invisible build-dot size-2 rounded-full bg-border" />
        ))}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <span className="invisible build-bar h-3 w-2/3 rounded-full bg-accent/30" />
        <span className="invisible build-bar h-2 w-full rounded-full bg-accent/15" />
        <span className="invisible build-bar h-2 w-5/6 rounded-full bg-accent/15" />
        <div className="invisible build-pop mt-2 flex h-16 w-full items-center gap-3 rounded-md border border-accent/30 px-3">
          <CalendarIcon className="size-5 shrink-0 text-accent" />
          <div className="flex flex-1 flex-col gap-1.5">
            <span className="h-2 w-2/3 rounded-full bg-accent/20" />
            <span className="h-2 w-1/3 rounded-full bg-accent/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
