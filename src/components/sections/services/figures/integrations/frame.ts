import {
  endOf,
  ease,
  plugAt,
  type Sim,
} from "@/components/sections/services/figures/integrations/sim";
import { P } from "@/components/sections/services/figures/integrations/view";
import {
  depthOf,
  iso,
  pathOf,
  translateAlong,
  type Flat,
  type Point3,
} from "@/components/ui/iso/iso-kit";

const SAMPLES = 40;
const TRAIL = 7;
const OFFSET = [-2, 16];
const RISE = [18, 10];
const SPREAD = 0.14;
const SHINE: Flat = [-0.8, -0.8];

interface CableDraw {
  edge: string;
  shine: string;
  trail: string;
  head: Flat | null;
}

export interface FrameDraw {
  plugs: string[];
  order: number[];
  cables: CableDraw[];
  lamp: number;
}

function routeOf(a: Point3, b: Point3, cable: number): Point3[] {
  const rise = RISE[cable] + SPREAD * Math.abs(b[0] - a[0]);
  const out: Point3[] = [];
  for (let index = 0; index <= SAMPLES; index++) {
    const u = index / SAMPLES;
    const arc = Math.pow(Math.sin(Math.PI * u), 0.62);
    const bow = Math.sin(Math.PI * u);
    out.push([
      a[0] + (b[0] - a[0]) * u,
      a[1] + (b[1] - a[1]) * u + OFFSET[cable] * bow,
      a[2] + (b[2] - a[2]) * u + rise * arc,
    ]);
  }
  return out;
}

const shifted = (points: Flat[]): Flat[] => points.map(([x, y]) => [x + SHINE[0], y + SHINE[1]]);

export function frameOf(sim: Sim): FrameDraw {
  const plugs = sim.plugs.map((plug) => translateAlong(P, plugAt(plug)));
  const order = sim.plugs
    .map((plug, index) => ({ index, depth: depthOf(plugAt(plug), P) }))
    .sort((a, b) => a.depth - b.depth)
    .map((item) => item.index);
  const cables = ([0, 1] as const).map((cable): CableDraw => {
    const route = routeOf(endOf(sim.plugs[cable * 2]), endOf(sim.plugs[cable * 2 + 1]), cable);
    const flat = route.map((point) => iso(point, P));
    const pulse = sim.pulses.find((item) => item.cable === cable);
    let trail = "";
    let head: Flat | null = null;
    if (pulse) {
      const at = ease(pulse.t) * SAMPLES;
      const last = Math.floor(at);
      const frac = at - last;
      const next = flat[Math.min(last + 1, SAMPLES)];
      head = [
        flat[last][0] + (next[0] - flat[last][0]) * frac,
        flat[last][1] + (next[1] - flat[last][1]) * frac,
      ];
      trail = pathOf([...flat.slice(Math.max(0, last - TRAIL), last + 1), head]);
    }
    return { edge: pathOf(flat), shine: pathOf(shifted(flat)), trail, head };
  });
  return { plugs, order, cables, lamp: sim.lamp };
}
