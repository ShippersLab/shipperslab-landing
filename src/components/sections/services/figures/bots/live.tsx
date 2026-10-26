"use client";

import * as React from "react";

import { YAW_RANGE, YAW_REST, yawSign } from "@/components/sections/services/figures/bots/head";
import {
  MESSAGES,
  HOLD,
  RESTING,
  SHOWN_FROM,
  SHOWN_UNTIL,
  TOUR_BACK,
  TOUR_EVERY,
  TOUR_FIRST,
  idleBlink,
  poseAt,
  readoutAt,
  type Pose,
} from "@/components/sections/services/figures/bots/model";
import {
  ArmLower,
  ArmUpper,
  Head,
  Lamp,
  Lever,
  Slip,
  Ticker,
  TipGlow,
} from "@/components/sections/services/figures/bots/parts";
import { applyFrame, type Nodes } from "@/components/sections/services/figures/bots/stage";
import { CX, CY, HEIGHT, WIDTH, at, clamp } from "@/components/sections/services/figures/bots/view";
import { IsoFigure } from "@/components/ui/iso/react/draw";
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from "@/components/ui/iso/react/live";

const LABEL =
  "Robot de atención al cliente sobre una base, con una palanca para pasar a una persona";
const ACTION = "Robot de atención al cliente: presioná Enter o Espacio para mandar un mensaje";
const SMOOTH = 0.07;
const GAZE = 0.14;
const HEAD_SPOT = at([CX, CY, 57]);

interface Props {
  base: React.ReactNode;
  body: React.ReactNode;
  shoulder: React.ReactNode;
  station: React.ReactNode;
  antenna: React.ReactNode;
}

interface Sim {
  clock: number;
  age: number;
  index: number;
  pose: Pose;
  gx: number;
  gy: number;
  aimX: number;
  aimY: number;
  hover: boolean;
  focus: boolean;
  touched: number;
  nextTour: number;
  shown: number;
}

const fresh = (): Sim => ({
  clock: 0,
  age: 99,
  index: -1,
  pose: { ...RESTING },
  gx: 0,
  gy: 0,
  aimX: 0,
  aimY: 0,
  hover: false,
  focus: false,
  touched: -99,
  nextTour: TOUR_FIRST,
  shown: -1,
});

export function BotsLive({ base, body, shoulder, station, antenna }: Props) {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const visible = useInView(anchor);
  const sim = React.useRef<Sim>(fresh());
  const nodes = React.useRef<Nodes>({});
  const speech = React.useRef<HTMLSpanElement | null>(null);
  const clipId = `bots-clip-${React.useId().replace(/:/g, "")}`;

  const binders = React.useRef(new Map<string, (node: SVGElement | null) => void>());
  const bind = React.useCallback((key: string) => {
    let known = binders.current.get(key);
    if (!known) {
      known = (node) => {
        nodes.current[key] = node;
      };
      binders.current.set(key, known);
    }
    return known;
  }, []);

  const words = React.useCallback((index: number, age: number) => {
    const shown = index >= 0 && age >= SHOWN_FROM && age <= SHOWN_UNTIL;
    const message = MESSAGES[Math.max(index, 0)];
    if (nodes.current.ticker)
      nodes.current.ticker.textContent = shown ? message.ticker : "En línea";
    if (index >= 0 && sim.current.shown !== index) {
      sim.current.shown = index;
      if (nodes.current.slipTitle) nodes.current.slipTitle.textContent = message.slip;
      if (nodes.current.slipTime) nodes.current.slipTime.textContent = message.time;
    }
  }, []);

  const tick = React.useCallback(
    (dt: number, calm: boolean) => {
      const s = sim.current;
      s.clock += dt;
      s.age += dt;
      const engaged = s.hover || s.focus;
      const touring = !calm && !engaged && s.clock - s.touched > TOUR_BACK;
      if (touring && s.clock >= s.nextTour) {
        s.index = (s.index + 1) % MESSAGES.length;
        s.age = 0;
        s.nextTour = s.clock + TOUR_EVERY;
      }
      if (calm) {
        s.pose = s.index >= 0 ? poseAt(s.age, MESSAGES[s.index].handoff) : { ...RESTING };
      } else {
        const goal = s.index >= 0 ? poseAt(s.age, MESSAGES[s.index].handoff) : RESTING;
        for (const key of Object.keys(goal) as (keyof Pose)[])
          s.pose[key] = follow(s.pose[key], goal[key], dt, SMOOTH);
      }
      const wandering = !calm && !s.hover;
      const aimX = wandering ? 0.55 * Math.sin(s.clock * 0.55) : s.aimX;
      const aimY = wandering ? 0.25 * Math.sin(s.clock * 0.8 + 1) : s.aimY;
      s.gx = follow(s.gx, aimX, dt, GAZE, calm);
      s.gy = follow(s.gy, aimY, dt, GAZE, calm);
      const idleGlow = calm ? 0 : 0.14 + 0.1 * Math.sin(s.clock * 1.6);
      applyFrame(nodes.current, {
        pose: s.pose,
        clock: s.clock,
        yaw: YAW_REST + yawSign * s.gx * YAW_RANGE,
        gx: s.gx,
        gy: s.gy,
        blink: calm ? s.pose.blink : Math.max(s.pose.blink, idleBlink(s.clock)),
        idleTip: idleGlow,
      });
      words(s.index, s.age);
      say(readoutAt(s.index, s.age));
      return !calm;
    },
    [say, words],
  );

  const kick = useLoop(tick, visible);

  const send = React.useCallback(() => {
    const s = sim.current;
    s.index = (s.index + 1) % MESSAGES.length;
    s.age = asksForStillness() ? HOLD : 0;
    s.touched = s.clock;
    s.nextTour = s.clock + TOUR_EVERY + TOUR_BACK;
    const message = MESSAGES[s.index];
    if (speech.current) speech.current.textContent = `${message.title} · ${message.time}`;
    kick();
  }, [kick]);

  const aim = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.querySelector("svg")?.getBoundingClientRect();
    if (!box || !box.width) return;
    const s = sim.current;
    s.aimX = clamp(((event.clientX - box.left) / box.width - HEAD_SPOT[0] / WIDTH) / 0.35, -1, 1);
    s.aimY = clamp(-((event.clientY - box.top) / box.height - HEAD_SPOT[1] / HEIGHT) / 0.4, -1, 1);
  };

  const leave = () => {
    const s = sim.current;
    s.hover = false;
    s.touched = s.clock;
    s.nextTour = Math.max(s.nextTour, s.clock + TOUR_BACK);
  };

  return (
    <div
      ref={anchor}
      role="button"
      tabIndex={0}
      aria-label={ACTION}
      className="bots-stage rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      onClick={send}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        sim.current.hover = true;
        aim(event);
      }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        sim.current.hover = true;
        aim(event);
        if (asksForStillness()) kick();
      }}
      onPointerLeave={leave}
      onFocus={() => {
        sim.current.focus = true;
      }}
      onBlur={() => {
        sim.current.focus = false;
        sim.current.touched = sim.current.clock;
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (!event.repeat) send();
      }}
    >
      <IsoFigure width={WIDTH} height={HEIGHT} label={LABEL}>
        {base}
        <ArmUpper bind={bind} side="l" />
        {shoulder}
        {body}
        <Ticker bind={bind} />
        <ArmLower bind={bind} side="l" />
        <Slip bind={bind} clipId={clipId} />
        {station}
        <Lamp bind={bind} />
        <ArmUpper bind={bind} side="r" />
        <ArmLower bind={bind} side="r" />
        <Lever bind={bind} />
        <Head bind={bind} />
        {antenna}
        <TipGlow bind={bind} />
      </IsoFigure>
      <span ref={speech} className="sr-only" aria-live="polite" />
    </div>
  );
}
