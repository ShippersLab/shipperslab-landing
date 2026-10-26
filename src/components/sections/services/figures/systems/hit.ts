import {
  FRONT,
  HOVER_OPEN,
  P,
  PANEL_D,
  PANEL_H,
  PANEL_W,
  SLOTS_OF,
} from "@/components/sections/services/figures/systems/view";
import { boxCorners, iso, type Flat, type Point3 } from "@/components/ui/iso/iso-kit";

const RING = 2.6;

function hullOf(points: Flat[]): Flat[] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Flat, a: Flat, b: Flat) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const build = (list: Flat[]) => {
    const out: Flat[] = [];
    for (const point of list) {
      while (out.length >= 2 && cross(out[out.length - 2]!, out[out.length - 1]!, point) <= 0)
        out.pop();
      out.push(point);
    }
    out.pop();
    return out;
  };
  return [...build(sorted), ...build([...sorted].reverse())];
}

const text = (points: Flat[]) =>
  points.map(([x, y]) => `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`).join(" ");

export const HITS = SLOTS_OF.map((slot) => {
  const reach = {
    x: slot.left - 1,
    y: FRONT,
    w: PANEL_W + 2,
    d: PANEL_D + HOVER_OPEN * 0.6,
    r: 0,
  };
  const face = {
    x: slot.left - RING,
    y: FRONT + PANEL_D,
    w: PANEL_W + RING * 2,
    d: 0,
    r: 0,
  };
  const project = (point: Point3) => iso(point, P);
  return {
    key: slot.key,
    reach: text(hullOf(boxCorners(reach, slot.z - 1, slot.z + PANEL_H + 1).map(project))),
    ring: text(hullOf(boxCorners(face, slot.z - RING, slot.z + PANEL_H + RING).map(project))),
  };
});
