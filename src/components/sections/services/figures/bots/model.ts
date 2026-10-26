import { smooth } from "@/components/sections/services/figures/bots/view";

export interface Message {
  title: string;
  time: string;
  ticker: string;
  slip: string;
  handoff: boolean;
}

export const MESSAGES: Message[] = [
  {
    title: "Pedido tomado",
    time: "02:14",
    ticker: "Pedido tomado",
    slip: "Pedido",
    handoff: false,
  },
  {
    title: "Turno agendado",
    time: "05:40",
    ticker: "Turno agendado",
    slip: "Turno",
    handoff: false,
  },
  {
    title: "Consulta respondida",
    time: "13:05",
    ticker: "Consulta resuelta",
    slip: "Respuesta",
    handoff: false,
  },
  {
    title: "Pasado a una persona",
    time: "23:52",
    ticker: "A una persona",
    slip: "Persona",
    handoff: true,
  },
];

export const IDLE_TEXT = "En línea · 24/7";
export const SHOWN_UNTIL = 4.6;
export const SHOWN_FROM = 0.35;
export const HOLD = 1.8;
export const TOUR_FIRST = 1.4;
export const TOUR_EVERY = 6.6;
export const TOUR_BACK = 3.6;

export interface Pose {
  slip: number;
  tip: number;
  blink: number;
  smile: number;
  wave: number;
  reach: number;
  pull: number;
  leds: number;
  lamp: number;
}

export const RESTING: Pose = {
  slip: 0,
  tip: 0,
  blink: 0,
  smile: 0,
  wave: 0,
  reach: 0,
  pull: 0,
  leds: 0,
  lamp: 0,
};

const fade = (from: number, to: number, age: number) => 1 - smooth(from, to, age);

export function poseAt(age: number, handoff: boolean): Pose {
  return {
    slip: smooth(0.35, 0.95, age) * fade(3.0, 3.6, age),
    tip: smooth(0, 0.12, age) * fade(2.4, 4.4, age),
    blink: smooth(0.05, 0.14, age) * fade(0.16, 0.28, age),
    smile: smooth(0.3, 0.8, age) * fade(3, 3.8, age),
    wave: smooth(0.15, 0.6, age) * fade(2.8, 3.5, age),
    reach: handoff ? smooth(0.5, 1.1, age) * fade(3.4, 4.0, age) : 0,
    pull: handoff ? smooth(1.1, 1.8, age) * fade(2.9, 3.5, age) : 0,
    leds: smooth(0.3, 1.6, age) * fade(3, 3.6, age),
    lamp: handoff ? smooth(1.4, 1.8, age) * fade(3.2, 3.8, age) : 0,
  };
}

export const idleBlink = (clock: number) => {
  const phase = clock % 4.3;
  return smooth(0, 0.07, phase) * fade(0.09, 0.2, phase);
};

export const readoutAt = (index: number, age: number) => {
  if (age < SHOWN_FROM || age > SHOWN_UNTIL) return IDLE_TEXT;
  const message = MESSAGES[index];
  return `${message.title} · ${message.time}`;
};
