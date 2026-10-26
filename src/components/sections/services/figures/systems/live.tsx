"use client";

import * as React from "react";

import {
  createEngine,
  prime,
  request,
  step,
  type Engine,
  type Hooks,
} from "@/components/sections/services/figures/systems/engine";
import { HITS } from "@/components/sections/services/figures/systems/hit";
import {
  DRAWERS,
  LABELS,
  START,
  spokenOf,
} from "@/components/sections/services/figures/systems/model";
import { collect, type Nodes } from "@/components/sections/services/figures/systems/nodes";
import { HEIGHT, WIDTH } from "@/components/sections/services/figures/systems/view";
import {
  Stage,
  asksForStillness,
  useInView,
  useLoop,
  useReadout,
} from "@/components/ui/iso/react/live";

const LABEL =
  "Un archivador de cuatro cajones (Stock, Pedidos, Caja y Turnos) sobre una base, con una caja registradora de libro mayor encima. Al agregar una entrada cae una ficha en el cajón y el contador mecánico rueda hasta el nuevo valor.";

const RING_CLASS =
  "pointer-events-none fill-transparent stroke-transparent outline-none focus-visible:stroke-ink focus-visible:stroke-2";
const REACH_CLASS = "cursor-pointer fill-transparent stroke-none";

export function SystemsLive({ art }: { art: React.ReactNode }) {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const status = React.useRef<HTMLSpanElement | null>(null);
  const engine = React.useRef<Engine | null>(null);
  const nodes = React.useRef<Nodes | null>(null);
  const visible = useInView(anchor);

  const hooks = React.useMemo<Hooks>(
    () => ({
      say,
      speak: (text) => {
        if (status.current) status.current.textContent = text;
      },
    }),
    [say],
  );

  const tick = React.useCallback(
    (dt: number, calm: boolean) => {
      if (!engine.current || !nodes.current) return false;
      return step(engine.current, nodes.current, hooks, dt, calm);
    },
    [hooks],
  );

  const kick = useLoop(tick, visible);

  React.useEffect(() => {
    const root = anchor.current;
    if (!root) return;
    engine.current = createEngine();
    nodes.current = collect(root);
    prime(engine.current, nodes.current);
  }, [anchor]);

  const touch = (change: (current: Engine) => void) => {
    if (!engine.current) return;
    change(engine.current);
    kick();
  };

  const add = (index: number) =>
    touch((current) => {
      if (nodes.current) request(current, index, nodes.current, hooks, asksForStillness());
      current.idle = 0;
      current.need = 3.6;
    });

  return (
    <div ref={anchor} className="sys-stage">
      <Stage className="iso-stage">
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="group"
          aria-label={LABEL}
          focusable="false"
        >
          {art}
          {HITS.map((hit, index) => (
            <polygon
              key={`${hit.key}-ring`}
              className={RING_CLASS}
              data-ring={index}
              points={hit.ring}
              role="button"
              tabIndex={0}
              aria-label={`Cajón ${LABELS[hit.key]}. Enter agrega una entrada.`}
              onFocus={() =>
                touch((current) => {
                  current.focus = index;
                })
              }
              onBlur={() =>
                touch((current) => {
                  if (current.focus === index) current.focus = -1;
                })
              }
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                add(index);
              }}
            />
          ))}
          {HITS.map((hit, index) => (
            <polygon
              key={`${hit.key}-reach`}
              className={REACH_CLASS}
              points={hit.reach}
              aria-hidden="true"
              onPointerEnter={() =>
                touch((current) => {
                  current.hover = index;
                })
              }
              onPointerLeave={() =>
                touch((current) => {
                  if (current.hover === index) current.hover = -1;
                })
              }
              onClick={() => add(index)}
            />
          ))}
        </svg>
      </Stage>
      <span ref={status} className="sr-only" role="status" aria-live="polite">
        {spokenOf(START, DRAWERS[0]!)}
      </span>
    </div>
  );
}
