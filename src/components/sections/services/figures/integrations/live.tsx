"use client";

import * as React from "react";

import { frameOf, type FrameDraw } from "@/components/sections/services/figures/integrations/frame";
import {
  labelOf,
  linkText,
  pickText,
  refuseText,
  repatch,
  restText,
  type Cable,
  type Jack,
} from "@/components/sections/services/figures/integrations/model";
import {
  makeSim,
  moving,
  plugIndex,
  step,
} from "@/components/sections/services/figures/integrations/sim";
import {
  HEIGHT,
  JACK_TOP,
  JACK_X,
  JACK_Y,
  WIDTH,
  at,
} from "@/components/sections/services/figures/integrations/view";
import { IsoFigure } from "@/components/ui/iso/react/draw";
import { useInView, useLoop, useReadout } from "@/components/ui/iso/react/live";

const TOUR_EVERY = 2600;
const TOUR_WAIT = 4200;
const HIT = 26;
const ALL: Jack[] = [0, 1, 2, 3];

interface Props {
  label: string;
  base: React.ReactNode;
  traces: React.ReactNode;
  relay: React.ReactNode;
  plate: React.ReactNode;
  lamp: React.ReactNode;
  lampRing: string;
  plug: React.ReactNode;
  focusRings: string[];
}

interface Nodes {
  plugs: (SVGGElement | null)[];
  plugRoot: SVGGElement | null;
  edge: (SVGPathElement | null)[];
  core: (SVGPathElement | null)[];
  shine: (SVGPathElement | null)[];
  trail: (SVGPathElement | null)[];
  head: (SVGCircleElement | null)[];
  lamp: SVGGElement | null;
  lampRing: SVGPathElement | null;
}

const REST = frameOf(makeSim());

export function IntegrationsLive(props: Props) {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const root = React.useRef<HTMLDivElement | null>(null);
  const status = React.useRef<HTMLParagraphElement | null>(null);
  const nodes = React.useRef<Nodes>({
    plugs: [],
    plugRoot: null,
    edge: [],
    core: [],
    shine: [],
    trail: [],
    head: [],
    lamp: null,
    lampRing: null,
  });
  const sim = React.useRef(makeSim());
  const order = React.useRef("");
  const touched = React.useRef(0);
  const drag = React.useRef<Jack | null>(null);
  const tourStep = React.useRef(0);
  const [ui, setUi] = React.useState({
    patch: sim.current.patch,
    selected: null as Jack | null,
  });
  const visible = useInView(root);

  const speak = React.useCallback(
    (text: string) => {
      say(text);
      if (status.current) status.current.textContent = text;
    },
    [say],
  );

  const paint = React.useCallback(() => {
    const frame: FrameDraw = frameOf(sim.current);
    const n = nodes.current;
    frame.plugs.forEach((transform, index) => n.plugs[index]?.setAttribute("transform", transform));
    const key = frame.order.join("");
    if (key !== order.current && n.plugRoot) {
      order.current = key;
      for (const index of frame.order) {
        const node = n.plugs[index];
        if (node) n.plugRoot.appendChild(node);
      }
    }
    frame.cables.forEach((cable, index) => {
      n.edge[index]?.setAttribute("d", cable.edge);
      n.core[index]?.setAttribute("d", cable.edge);
      n.shine[index]?.setAttribute("d", cable.shine);
      n.trail[index]?.setAttribute("d", cable.trail);
      const head = n.head[index];
      if (head) {
        head.style.opacity = cable.head ? "1" : "0";
        if (cable.head) {
          head.setAttribute("cx", `${cable.head[0]}`);
          head.setAttribute("cy", `${cable.head[1]}`);
        }
      }
    });
    if (n.lamp) {
      if (frame.lamp > 0.4) n.lamp.dataset.lit = "";
      else delete n.lamp.dataset.lit;
    }
    if (n.lampRing) n.lampRing.style.opacity = `${frame.lamp}`;
  }, []);

  const kick = useLoop((dt, calm) => {
    const active = step(sim.current, dt, calm);
    paint();
    return active;
  }, visible);

  const select = (jack: Jack | null) => {
    sim.current.selected = jack;
    setUi({ patch: sim.current.patch, selected: jack });
    kick();
  };

  const attempt = (from: Jack, to: Jack) => {
    const result = repatch(sim.current.patch, from, to);
    if (!result) {
      speak(refuseText(to));
      select(null);
      return;
    }
    const { lead, other } = result;
    sim.current.patch = result.patch;
    sim.current.plugs[plugIndex(lead.cable, lead.end)].to = lead.to;
    sim.current.plugs[plugIndex(lead.cable, lead.end)].t = 0;
    sim.current.plugs[plugIndex(lead.cable, lead.end)].side = 1;
    sim.current.plugs[plugIndex(other.cable, other.end)].to = other.to;
    sim.current.plugs[plugIndex(other.cable, other.end)].t = 0;
    sim.current.plugs[plugIndex(other.cable, other.end)].side = -1;
    sim.current.pending = [lead.cable, other.cable];
    sim.current.selected = null;
    setUi({ patch: result.patch, selected: null });
    speak(linkText(result.patch[lead.cable]));
    kick();
  };

  const choose = (jack: Jack) => {
    touched.current = performance.now();
    if (moving(sim.current)) return;
    const held = sim.current.selected;
    if (held === null) {
      select(jack);
      speak(pickText(jack));
    } else if (held === jack) {
      select(null);
      speak(restText(sim.current.patch));
    } else attempt(held, jack);
  };

  React.useEffect(() => {
    paint();
    speak(restText(sim.current.patch));
  }, [paint, speak]);

  React.useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const s = sim.current;
      const idle = performance.now() - touched.current > TOUR_WAIT;
      if (!idle || s.selected !== null || moving(s) || s.pulses.length) return;
      const cable = (tourStep.current++ % 2) as Cable;
      s.pending = [cable];
      speak(linkText(s.patch[cable]));
      kick();
    }, TOUR_EVERY);
    return () => window.clearInterval(timer);
  }, [visible, kick, speak]);

  const jackFrom = (event: React.PointerEvent) => {
    const hit = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-jack]");
    return hit ? (Number(hit.getAttribute("data-jack")) as Jack) : null;
  };

  const bindAt =
    <K extends "edge" | "core" | "shine" | "trail" | "head" | "plugs">(key: K, index: number) =>
    (node: Nodes[K][number]) => {
      (nodes.current[key] as Array<typeof node>)[index] = node;
    };

  return (
    <div
      ref={(node) => {
        root.current = node;
        anchor.current = node;
      }}
      className="ig-live"
    >
      <p ref={status} className="sr-only" role="status" aria-live="polite" />
      <IsoFigure
        width={WIDTH}
        height={HEIGHT}
        label="Tablero de conexiones con cuatro entradas: WhatsApp, Planilla, Facturación y Sistema, unidas de a pares por dos cables, y un relé central."
        className="ig-stage"
      >
        {props.base}
        {props.traces}
        {props.relay}
        {props.plate}
        <g
          className="ig-lamp"
          ref={(node) => {
            nodes.current.lamp = node;
          }}
        >
          {props.lamp}
        </g>
        <path
          ref={(node) => {
            nodes.current.lampRing = node;
          }}
          className="iso-line"
          data-tone="lit"
          d={props.lampRing}
          style={{ opacity: 0 }}
        />
        <g
          ref={(node) => {
            nodes.current.plugRoot = node;
          }}
        >
          {[0, 1, 2, 3].map((index) => (
            <g key={index} ref={bindAt("plugs", index)} transform={REST.plugs[index]}>
              {props.plug}
            </g>
          ))}
        </g>
        {[0, 1].map((cable) => (
          <g key={cable}>
            <path ref={bindAt("edge", cable)} className="ig-edge" d={REST.cables[cable].edge} />
            <path ref={bindAt("core", cable)} className="ig-core" d={REST.cables[cable].edge} />
            <path ref={bindAt("shine", cable)} className="ig-shine" d={REST.cables[cable].shine} />
            <path ref={bindAt("trail", cable)} className="iso-line ig-trail" data-tone="lit" d="" />
            <circle
              ref={bindAt("head", cable)}
              className="ig-head"
              r={2.6}
              style={{ opacity: 0 }}
            />
          </g>
        ))}
        {ALL.map((jack) => {
          const [cx, cy] = at([JACK_X[jack], JACK_Y, JACK_TOP + 8]);
          return (
            <g
              key={jack}
              data-jack={jack}
              data-on={ui.selected === jack ? "" : undefined}
              role="button"
              tabIndex={0}
              aria-pressed={ui.selected === jack}
              aria-label={labelOf(ui.patch, jack, ui.selected)}
              className="ig-jack outline-ink focus-visible:outline-2 focus-visible:outline-offset-2"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                if (sim.current.selected === null) drag.current = jack;
                choose(jack);
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  event.currentTarget.releasePointerCapture(event.pointerId);
                const from = drag.current;
                drag.current = null;
                if (from === null || sim.current.selected !== from) return;
                const target = jackFrom(event);
                if (target !== null && target !== from) choose(target);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  choose(jack);
                } else if (event.key === "Escape" && sim.current.selected !== null) {
                  select(null);
                  speak(restText(sim.current.patch));
                } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const next = (jack + (event.key === "ArrowRight" ? 1 : 3)) % 4;
                  root.current?.querySelector<SVGGElement>(`[data-jack="${next}"]`)?.focus();
                }
              }}
            >
              <path className="ig-focus" d={props.focusRings[jack]} />
              <circle cx={cx} cy={cy} r={HIT} className="ig-hit" />
            </g>
          );
        })}
      </IsoFigure>
    </div>
  );
}
