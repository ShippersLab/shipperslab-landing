import {
  boxCorners,
  fitProjection,
  iso,
  pathOf,
  type Flat,
  type Plan,
  type Point3,
} from "@/components/ui/iso/iso-kit";

export const WIDTH = 600;
export const HEIGHT = 360;
export const AZIMUTH = 62;

export const BASE: Plan = { x: -74, y: -40, w: 140, d: 84, r: 8 };
export const BASE_H = 6;
export const FOOT_H = 3;

export const CX = -14;
export const CY = 0;
export const PEDESTAL: Plan = { x: -41, y: -19, w: 54, d: 38, r: 4 };
export const PEDESTAL_H = 5;
export const TORSO: Plan = { x: -36, y: -14, w: 44, d: 28, r: 3 };
export const TORSO_Z = PEDESTAL_H;
export const TORSO_TOP = 40;
export const FRONT_Y = TORSO.y + TORSO.d;
export const SIDE_X = TORSO.x + TORSO.w;

export const HEAD_Z = 44;
export const HEAD_H = 26;
export const HEAD_TOP = HEAD_Z + HEAD_H;
export const HEAD_W = 40;
export const HEAD_D = 28;
export const ANTENNA_TOP = 92;

export const SLOT_Z = 22.6;
export const SLOT_H = 2.2;
export const SLIP_Z = 23.2;

export const ARM_Z = 29;
export const ARM_H = 5;
export const ARM_MID = ARM_Z + ARM_H / 2;
export const SHOULDER_L: Flat = [-37.5, 0];
export const SHOULDER_R: Flat = [9.5, 0];

export const STATION: Plan = { x: 26, y: -4, w: 36, d: 20, r: 2 };
export const STATION_H = 12;
export const STATION_FRONT = STATION.y + STATION.d;
export const PIVOT: Point3 = [44, 6, STATION_H];

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    [CX, CY, ANTENNA_TOP + 4],
    [-62, 32, 36],
    [60, 14, 44],
  ],
  WIDTH,
  HEIGHT,
  { pad: 22, azimuth: AZIMUTH },
);

export const at = (point: Point3): Flat => iso(point, P);
export const poly = (points: Point3[], closed = false) => pathOf(points.map(at), closed);

export const rectY = (y: number, x0: number, x1: number, z0: number, z1: number) =>
  poly(
    [
      [x0, y, z0],
      [x1, y, z0],
      [x1, y, z1],
      [x0, y, z1],
    ],
    true,
  );

export const rectX = (x: number, y0: number, y1: number, z0: number, z1: number) =>
  poly(
    [
      [x, y0, z0],
      [x, y1, z0],
      [x, y1, z1],
      [x, y0, z1],
    ],
    true,
  );

export const chamfered = (x0: number, x1: number, z0: number, z1: number, c: number): Flat[] => [
  [x0 + c, z0],
  [x1 - c, z0],
  [x1, z0 + c],
  [x1, z1 - c],
  [x1 - c, z1],
  [x0 + c, z1],
  [x0, z1 - c],
  [x0, z0 + c],
];

export function hullOf(points: Flat[]): Flat[] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Flat, a: Flat, b: Flat) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const build = (list: Flat[]) => {
    const out: Flat[] = [];
    for (const point of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], point) <= 0)
        out.pop();
      out.push(point);
    }
    out.pop();
    return out;
  };
  return [...build(sorted), ...build([...sorted].reverse())];
}

export const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const fine = (value: number) => Math.round(value * 10) / 10;
