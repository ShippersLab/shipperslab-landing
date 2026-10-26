import {
  BED_Z,
  DESK,
  DESK_H,
  DESK_Z,
  FACE_Y,
  HOUSING,
  HOUSING_TOP,
  HOUSING_Z,
  P,
  WINDOW_W,
  WINDOW_X,
  WINDOW_Z0,
  WINDOW_Z1,
} from "@/components/sections/services/figures/systems/view";
import * as k from "@/components/ui/iso/iso-kit";

const DEPT_X = [-33, -11, 11, 33];
const DEPT_Y = 18;
const PAD_X = [-30, -18, -6, 6, 18, 30];
const PAD_Y = 8.5;
const CRANK_X = HOUSING.x + HOUSING.w;
const CRANK_Y = HOUSING.y + HOUSING.d / 2;
const CRANK_Z = HOUSING_Z + 11;
const CRANK_R = 6.4;
const CRANK_OFF = 3.6;
export const CELLS = 6;
export const CELL_W = 9.2;
const WINDOW_PAD = 1.4;
const GLASS_Y = FACE_Y + 0.8;
const GLASS_X = WINDOW_X + WINDOW_PAD;
export const GLASS_W = WINDOW_W - WINDOW_PAD * 2;
export const GLASS_H = WINDOW_Z1 - WINDOW_Z0 - WINDOW_PAD * 2;
export const LINE_H = GLASS_H;
export const LAMPS = [-24, -8, 8, 24];
const LAMP_Z = WINDOW_Z1 + 3.4;

const byDepth = <T extends [number, number]>(points: T[]) =>
  [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

export const KEYS_PAD = byDepth(PAD_X.map((x) => [x, PAD_Y] as [number, number])).map(([x, y]) => ({
  x,
  y,
  solid: k.cylinder(x, y, 2.1, BED_Z + 0.7, 1.4, P, 14, 0.2),
  ring: k.ring(x, y, 1.1, BED_Z + 2.1, P, 12),
}));
export const KEYS_DEPT = DEPT_X.map((x, index) => ({
  index,
  x,
  solid: k.cylinder(x, DEPT_Y, 3.5, BED_Z + 0.7, 2.2, P, 18, 0.3),
  ring: k.ring(x, DEPT_Y, 2, BED_Z + 2.9, P, 14),
}));

const faceFront = HOUSING.y + HOUSING.d;
const slotPlan = { x: -26, y: DESK.y + DESK.d, w: 52, d: 0.6, r: 0 };
function sideSlot(x: number, y: number, z0: number, z1: number) {
  const corners: k.Point3[] = [
    [x, y - 0.8, z0],
    [x, y + 0.8, z0],
    [x, y + 0.8, z1],
    [x, y - 0.8, z1],
  ];
  return k.pathOf(
    corners.map((point) => k.iso(point, P)),
    true,
  );
}

const bellAt: [number, number] = [-24, -14];

export const REGISTER_ART = {
  halo: k.haloOf(DESK, DESK_Z, DESK_H, P),
  desk: k.slabOf(DESK, DESK_Z, DESK_H, P, 5, 0.8),
  deskSeam: k.sideSeam(DESK, DESK_Z + 3, P, 5),
  deskScrews: k.pointsAt(
    [-1, 1].map((sx) => [sx * 48, DESK.y + DESK.d, DESK_Z + 5] as k.Point3),
    P,
  ),
  slot: k.slabOf(slotPlan, DESK_Z + 3.2, 3.6, P, 1),
  plate: k.slabOf({ x: -48, y: DESK.y + DESK.d, w: 14, d: 0.6, r: 0.4 }, DESK_Z + 2.4, 5.2, P, 2),
  plateRules: [DESK_Z + 3.6, DESK_Z + 5.2, DESK_Z + 6.8]
    .map((z, index) =>
      k.segment(
        [-46, DESK.y + DESK.d + 0.6, z],
        [-46 + 10 - index * 2.4, DESK.y + DESK.d + 0.6, z],
        P,
      ),
    )
    .join(""),
  bed: k.slabOf({ x: -50, y: 1.5, w: 100, d: 23, r: 2 }, BED_Z, 0.7, P, 4),
  bedLine: k.planOutline(
    k.insetPlan({ x: -50, y: 1.5, w: 100, d: 23, r: 2 }, 1.6),
    BED_Z + 0.7,
    P,
    4,
  ),
  housing: k.slabOf(HOUSING, HOUSING_Z, HOUSING_TOP - HOUSING_Z, P, 5, 0.8),
  housingSeam: k.sideSeam(HOUSING, HOUSING_Z + 3, P, 5),
  housingGroove: k.planOutline(k.insetPlan(HOUSING, 3), HOUSING_TOP, P, 4),
  frame: k.slabOf(
    { x: WINDOW_X, y: faceFront, w: WINDOW_W, d: 0.8, r: 1 },
    WINDOW_Z0,
    WINDOW_Z1 - WINDOW_Z0,
    P,
    3,
    0.3,
  ),
  frameScrews: k.pointsAt(
    [-1, 1].map((sx) => [sx * 34.5, faceFront, (WINDOW_Z0 + WINDOW_Z1) / 2] as k.Point3),
    P,
  ),
  glassMatrix: k.sideMatrix([GLASS_X, GLASS_Y], WINDOW_Z1 - WINDOW_PAD, P, "left"),
  lampMatrix: k.sideMatrix([0, faceFront], LAMP_Z, P, "left"),
  bell: [
    k.cylinder(bellAt[0], bellAt[1], 5, HOUSING_TOP, 1.4, P, 24, 0.3),
    k.cylinder(bellAt[0], bellAt[1], 3.7, HOUSING_TOP + 1.4, 2.4, P, 20, 0.3),
    k.cylinder(bellAt[0], bellAt[1], 1.1, HOUSING_TOP + 3.8, 1.6, P, 12),
  ],
  bellRing: k.ring(bellAt[0], bellAt[1], 4.1, HOUSING_TOP + 1.4, P, 20),
  vents: [-10, -4, 2]
    .map((y) => sideSlot(HOUSING.x + HOUSING.w, y, HOUSING_Z + 16.5, HOUSING_Z + 20.5))
    .join(""),
  rivets: k.pointsAt(
    Array.from(
      { length: 9 },
      (_, index) => [-32 + index * 8, faceFront, HOUSING_Z + 2.4] as k.Point3,
    ),
    P,
  ),
  hubBoss: k.slabOf(
    { x: HOUSING.x + HOUSING.w, y: CRANK_Y - 2.4, w: 1.6, d: 4.8, r: 1.2 },
    CRANK_Z - 2.4,
    4.8,
    P,
    3,
  ),
};

export function crankOf(angle: number) {
  const x = CRANK_X + CRANK_OFF;
  const tip: k.Point3 = [
    x,
    CRANK_Y + CRANK_R * Math.cos(angle),
    CRANK_Z + CRANK_R * Math.sin(angle),
  ];
  const hub: k.Point3 = [x, CRANK_Y, CRANK_Z];
  const rear: k.Point3 = [x, CRANK_Y - 2.4 * Math.cos(angle), CRANK_Z - 2.4 * Math.sin(angle)];
  const arm = k.pathOf([k.iso(rear, P), k.iso(tip, P)]);
  return { arm, tip: k.iso(tip, P), hub: k.iso(hub, P) };
}

export const CRANK_HUB = k.sideRing([CRANK_X + CRANK_OFF, CRANK_Y, CRANK_Z], 2.3, "x", P, 16);
export const CRANK_STEM = k.segment(
  [CRANK_X, CRANK_Y, CRANK_Z],
  [CRANK_X + CRANK_OFF, CRANK_Y, CRANK_Z],
  P,
);
export const CRANK_PATH = k.pathOf(
  Array.from({ length: 33 }, (_, i) =>
    k.iso(
      [
        CRANK_X + CRANK_OFF,
        CRANK_Y + CRANK_R * Math.cos((i / 32) * Math.PI * 2),
        CRANK_Z + CRANK_R * Math.sin((i / 32) * Math.PI * 2),
      ],
      P,
    ),
  ),
  true,
);
