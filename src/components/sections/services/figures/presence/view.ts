import {
  axisVector,
  boxCorners,
  fitProjection,
  iso,
  type Plan,
  type Point3,
} from "@/components/ui/iso/iso-kit";

const WIDTH = 600;
const HEIGHT = 440;

export const PLATE: Plan = { x: -100, y: -84, w: 210, d: 242, r: 10 };
export const PLATE_H = 10;
export const FOOT_H = 5;

export const CASE: Plan = { x: -62, y: -62, w: 124, d: 118, r: 8 };
export const FRONT = CASE.y + CASE.d;
export const SIDE = CASE.x + CASE.w;
export const PLINTH_H = 5;
export const TOP = 170;
export const SEAM = FRONT - 12;

export const BEZEL = { x0: -48, x1: 48, z0: 68, z1: 158, r: 6, depth: 1.6 };
export const CRT = { x0: -40, x1: 40, z0: 77, z1: 150, r: 8, depth: 5 };
export const CRT_MID = (CRT.z0 + CRT.z1) / 2;
export const SLOT = { x0: 8, x1: 46, z0: 45, z1: 50.5, r: 2.4, depth: 4 };

export const KB: Plan = { x: -76, y: 84, w: 152, d: 58, r: 4 };
export const KB_Z = 1.6;
export const KB_TOP = 8.6;
export const U = 9.2;
export const KEYS_X = -U * 7.5;
export const KEYS_Y = 88.5;
export const ROW_H = [5.6, 5.2, 4.8, 4.4, 4];

export const PORT = { y: 28, z: 9 };
export const COIL = { x: 80, z: 3.6, r: 3.2, from: 44, to: 84, turns: 17 };

export const P = fitProjection(
  [...boxCorners(PLATE, -PLATE_H - FOOT_H, 0), ...boxCorners(CASE, 0, TOP)],
  WIDTH,
  HEIGHT,
  { pad: 30, azimuth: 56 },
);

export const at = (point: Point3) => iso(point, P);
export const DOWN_VECTOR = axisVector(P, [0, 0, -1]);
