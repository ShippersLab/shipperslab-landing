import {
  START,
  seatOf,
  type Cable,
  type Jack,
  type Patch,
} from "@/components/sections/services/figures/integrations/model";
import { END_Z, JACK_X, JACK_Y } from "@/components/sections/services/figures/integrations/view";

const TRANSIT = 0.85;
const PULSE = 1.1;
const HOP_LIFT = 36;
const HOP_SIDE = 13;
const HELD_LIFT = 9;

export interface PlugState {
  jack: Jack;
  to: Jack;
  t: number;
  side: number;
  raise: number;
}

interface PulseState {
  cable: Cable;
  t: number;
}

export interface Sim {
  patch: Patch;
  plugs: PlugState[];
  pulses: PulseState[];
  pending: Cable[];
  selected: Jack | null;
  lamp: number;
}

export const ease = (t: number) => t * t * (3 - 2 * t);

export function makeSim(): Sim {
  const plugs: PlugState[] = [];
  for (const cable of [0, 1] as const) {
    for (const end of [0, 1] as const)
      plugs.push({
        jack: START[cable][end],
        to: START[cable][end],
        t: 1,
        side: 0,
        raise: 0,
      });
  }
  return {
    patch: START,
    plugs,
    pulses: [],
    pending: [],
    selected: null,
    lamp: 0,
  };
}

export const plugIndex = (cable: Cable, end: 0 | 1) => cable * 2 + end;

export const moving = (sim: Sim) => sim.plugs.some((plug) => plug.t < 1);

export function plugAt(plug: PlugState): [number, number, number] {
  if (plug.t >= 1) return [JACK_X[plug.to], JACK_Y, plug.raise];
  const p = ease(plug.t);
  const arc = Math.sin(Math.PI * p);
  return [
    JACK_X[plug.jack] + (JACK_X[plug.to] - JACK_X[plug.jack]) * p,
    JACK_Y + plug.side * HOP_SIDE * arc,
    HOP_LIFT * arc + plug.raise,
  ];
}

export const endOf = (plug: PlugState): [number, number, number] => {
  const [x, y, z] = plugAt(plug);
  return [x, y, END_Z + z];
};

const approach = (value: number, goal: number, dt: number, seconds: number, calm: boolean) => {
  if (calm) return goal;
  const next = value + (goal - value) * (1 - Math.exp(-dt / seconds));
  return Math.abs(goal - next) < 1e-3 ? goal : next;
};

export function step(sim: Sim, dt: number, calm: boolean) {
  let active = false;
  for (const plug of sim.plugs) {
    if (plug.t < 1) {
      plug.t = calm ? 1 : Math.min(1, plug.t + dt / TRANSIT);
      if (plug.t >= 1) {
        plug.jack = plug.to;
        plug.side = 0;
      }
      active = true;
    }
  }
  const held = sim.selected === null ? -1 : seatIndex(sim, sim.selected);
  sim.plugs.forEach((plug, index) => {
    const goal = index === held && plug.t >= 1 ? HELD_LIFT : 0;
    if (plug.raise !== goal) {
      plug.raise = approach(plug.raise, goal, dt, 0.08, calm);
      active = true;
    }
  });
  if (!moving(sim) && sim.pending.length) {
    if (!calm) for (const cable of sim.pending) sim.pulses.push({ cable, t: 0 });
    sim.pending = [];
    active = true;
  }
  for (const pulse of sim.pulses) pulse.t += dt / PULSE;
  sim.pulses = sim.pulses.filter((pulse) => pulse.t < 1);
  if (sim.pulses.length) active = true;
  const lampGoal = sim.pulses.length ? 1 : 0;
  if (sim.lamp !== lampGoal) {
    sim.lamp = approach(sim.lamp, lampGoal, dt, 0.12, calm);
    active = true;
  }
  return active;
}

function seatIndex(sim: Sim, jack: Jack) {
  const { cable, end } = seatOf(sim.patch, jack);
  return plugIndex(cable, end);
}
