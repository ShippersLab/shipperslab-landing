"use client";

import * as React from "react";

import { crtState } from "@/components/sections/services/figures/presence/crt";
import { pressKeys } from "@/components/sections/services/figures/presence/keys";
import {
  KEYS,
  MAX_CHARS,
  MODES,
  SHIFTED,
  ease,
  matches,
  nextMode,
  readoutOf,
  PRODUCTS,
} from "@/components/sections/services/figures/presence/model";
import { collect, type Nodes } from "@/components/sections/services/figures/presence/nodes";
import { buildScript, type Step } from "@/components/sections/services/figures/presence/script";
import { newWorld } from "@/components/sections/services/figures/presence/world";
import { asksForStillness, useInView, useLoop, useReadout } from "@/components/ui/iso/react/live";

interface Props {
  art: React.ReactNode;
  down: [number, number];
  crtMid: number;
  textX: number;
  label: string;
}

const HOLD = 0.09;
const IDLE_MS = 9000;

export function PresenceLive({ art, down, crtMid, textX, label }: Props) {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const svgRef = React.useRef<SVGSVGElement>(null);
  const status = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(anchor);
  const nodes = React.useRef<Nodes | null>(null);
  const world = React.useRef(newWorld());
  const kickRef = React.useRef<() => void>(() => undefined);

  const dom = () => {
    if (!nodes.current && svgRef.current) nodes.current = collect(svgRef.current);
    return nodes.current as Nodes;
  };

  const write = () => {
    const w = world.current;
    const n = dom();
    n.text.textContent = w.line;
    n.hint.style.display = w.line ? "none" : "";
    n.cursor.setAttribute("x", String(textX + (w.line ? n.text.getComputedTextLength() + 0.6 : 0)));
    n.products.forEach((el, index) => {
      el.style.opacity = matches(PRODUCTS[index], w.line) ? "1" : "0.16";
    });
    say(readoutOf(w.mode, w.line, w.power));
  };

  const setMode = (index: number) => {
    const w = world.current;
    const n = dom();
    if (index === w.mode) return;
    w.mode = index;
    w.modeClock = 0;
    n.modes.forEach((el, i) => {
      el.style.display = i === index ? "" : "none";
    });
    n.tabs.forEach((el, i) =>
      el.firstElementChild?.setAttribute("class", i === index ? "pf-acc" : "pf-ghost"),
    );
    if (status.current) status.current.textContent = `Pantalla: ${MODES[index].note}`;
    write();
    kickRef.current();
  };

  const setPower = (next: boolean) => {
    const w = world.current;
    const n = dom();
    if (next === w.power) return;
    w.power = next;
    w.powerClock = asksForStillness() ? 9 : 0;
    n.rockerOn.style.display = next ? "" : "none";
    n.rockerOff.style.display = next ? "none" : "";
    n.led.style.opacity = next ? "" : "0.15";
    if (status.current)
      status.current.textContent = next ? "Computadora encendida" : "Computadora apagada";
    write();
    kickRef.current();
  };

  const press = (code: string, hold = HOLD) => {
    const index = KEYS.indexOf(code);
    if (index < 0) return;
    world.current.held[index] = hold;
    world.current.active.add(index);
    kickRef.current();
  };

  const type = (char: string) => {
    const w = world.current;
    if (!w.power) return;
    const lower = char.toLowerCase();
    const code = SHIFTED[char] || lower;
    if (KEYS.indexOf(code) < 0) return;
    if (SHIFTED[char] || char !== lower) press("Shift", 0.14);
    press(code);
    if (w.line.length < MAX_CHARS) w.line += char;
    write();
  };

  const erase = () => {
    if (!world.current.power) return;
    press("Backspace");
    world.current.line = world.current.line.slice(0, -1);
    write();
  };

  const crtFrame = () => {
    const w = world.current;
    const n = dom();
    const { sx, sy, beamAt, dotAt, lit } = crtState(w.powerClock, w.power);
    n.crt.setAttribute(
      "transform",
      `translate(0 ${-crtMid}) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(0 ${crtMid})`,
    );
    n.beam.setAttribute(
      "transform",
      `translate(0 ${-crtMid}) scale(${Math.max(sx, 0.001).toFixed(3)} 1) translate(0 ${crtMid})`,
    );
    n.beam.style.opacity = beamAt.toFixed(2);
    n.dot.style.opacity = dotAt.toFixed(2);
    n.glass.toggleAttribute("data-on", lit);
    return w.powerClock > 0.8;
  };

  const tick = (dt: number, calm: boolean) => {
    const w = world.current;
    const n = dom();
    if (w.touring && !calm) {
      w.wait -= dt;
      if (w.wait <= 0) {
        if (!w.script.length) w.script = buildScript({ setMode, type, erase, setPower });
        const step = w.script.shift() as Step;
        step.fn?.();
        w.wait = step.wait;
      }
    }
    w.powerClock += dt;
    w.modeClock = calm ? 1 : Math.min(1, w.modeClock + dt / 0.28);
    const settledCrt = crtFrame();
    n.modes[w.mode].style.opacity = String(ease(w.modeClock));
    pressKeys(w, n.keys, dt, calm, down);
    return (w.touring && !calm) || w.active.size > 0 || !settledCrt || w.modeClock < 1;
  };

  kickRef.current = useLoop(tick, inView);

  const takeOver = () => {
    const w = world.current;
    if (w.touring) {
      w.touring = false;
      w.script = [];
      w.line = "";
      setPower(true);
      write();
    }
    window.clearTimeout(w.idle);
    w.idle = window.setTimeout(() => {
      if (asksForStillness()) return;
      w.line = "";
      w.touring = true;
      w.wait = 0.6;
      setPower(true);
      write();
      kickRef.current();
    }, IDLE_MS);
  };

  React.useEffect(() => {
    const w = world.current;
    write();
    crtFrame();
    if (!asksForStillness()) {
      w.touring = true;
      kickRef.current();
    }
    return () => window.clearTimeout(w.idle);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.key === "Tab") return;
    takeOver();
    const key = event.key;
    if (key === "Escape") return void (event.preventDefault(), setPower(!world.current.power));
    if (key === "ArrowRight" || key === "ArrowLeft") {
      event.preventDefault();
      return setMode(
        (world.current.mode + (key === "ArrowRight" ? 1 : MODES.length - 1)) % MODES.length,
      );
    }
    if (key === "Backspace") return void (event.preventDefault(), erase());
    if (key === "Enter")
      return void (event.preventDefault(), press("Enter"), setMode(nextMode(world.current.mode)));
    if (key === "Shift") return press(event.code === "ShiftRight" ? "ShiftRight" : "Shift", 0.14);
    if (key.length === 1) {
      event.preventDefault();
      type(key);
    }
  };

  const onClick = (event: React.MouseEvent) => {
    const target = event.target as Element;
    takeOver();
    anchor.current?.focus({ preventScroll: true });
    const tab = target.closest("[data-tab]");
    if (tab) return setMode(Number((tab as HTMLElement).dataset.tab));
    const key = target.closest("[data-key]");
    if (key) {
      const code = KEYS[Number((key as HTMLElement).dataset.key)];
      if (code.length === 1) return type(code);
      if (code === "Backspace") return erase();
      if (code === "Enter" || code === "NumpadEnter") return setMode(nextMode(world.current.mode));
      return press(code);
    }
    if (target.closest('[data-hit="rocker"]')) return setPower(!world.current.power);
    if (target.closest('[data-part="computer"]')) {
      if (!world.current.power) return setPower(true);
      setMode(nextMode(world.current.mode));
    }
  };

  return (
    <div
      ref={anchor}
      className="iso-stage outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      tabIndex={0}
      role="group"
      aria-label={label}
      data-inview={inView ? "" : undefined}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      <svg
        ref={svgRef}
        className="iso-svg"
        viewBox="0 0 600 440"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        {art}
      </svg>
      <span ref={status} className="pf-sr" role="status" aria-live="polite" />
    </div>
  );
}
