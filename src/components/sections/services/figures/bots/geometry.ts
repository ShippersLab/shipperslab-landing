import {
  ANTENNA_TOP,
  ARM_H,
  ARM_Z,
  BASE,
  BASE_H,
  CX,
  CY,
  FOOT_H,
  FRONT_Y,
  HEAD_TOP,
  P,
  PEDESTAL,
  PEDESTAL_H,
  PIVOT,
  SHOULDER_L,
  SHOULDER_R,
  SIDE_X,
  SLOT_H,
  SLOT_Z,
  STATION,
  STATION_FRONT,
  STATION_H,
  TORSO,
  TORSO_TOP,
  TORSO_Z,
  poly,
  rectX,
  rectY,
} from "@/components/sections/services/figures/bots/view";
import {
  corners,
  cylinder,
  haloOf,
  insetPlan,
  onTop,
  planOutline,
  pointsAt,
  ring,
  segment,
  sideSeam,
  slabOf,
  topTicks,
  type Plan,
} from "@/components/ui/iso/iso-kit";

const slab = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);
const cyl = (x: number, y: number, r: number, z: number, h: number, steps = 20, bevel = 0) =>
  cylinder(x, y, r, z, h, P, steps, bevel);
const join = (paths: string[]) => paths.join("");

const PLATE_LABEL: Plan = { x: -66, y: 29, w: 38, d: 11, r: 2 };
const PLATE_RULER: Plan = { x: -20, y: 32, w: 80, d: 8, r: 1.5 };

export const BASE_ART = (() => {
  const lower = -BASE_H;
  const feet = corners(BASE, 9).map(([x, y]) => cyl(x, y, 4.5, lower - FOOT_H, FOOT_H, 16));
  const ticks = topTicks(-16, 54, 2.5, 4, 32, 0.6, [1.6, 3.2], P);
  const rules = [0, 1, 2].map((row) =>
    onTop(
      [
        [-63, 32.6 + row * 2.8],
        [-63 + (row === 2 ? 18 : 30), 32.6 + row * 2.8],
      ],
      0.6,
      P,
    ),
  );
  return {
    halo: join([
      haloOf(BASE, lower, BASE_H, P),
      haloOf(PEDESTAL, 0, 4, P),
      haloOf(STATION, 0, 6, P),
    ]),
    feet,
    slab: slab(BASE, lower, BASE_H, 8, 1),
    groove: planOutline(insetPlan(BASE, 4), 0, P, 8),
    screwRings: join(corners(BASE, 8).map(([x, y]) => ring(x, y, 1.8, 0, P, 12))),
    screws: pointsAt(
      corners(BASE, 8).map(([x, y]) => [x, y, 0]),
      P,
    ),
    label: slab(PLATE_LABEL, 0, 0.6, 3),
    labelRules: join(rules),
    labelDots: pointsAt(
      [
        [-64.2, 30.2, 0.6],
        [-29.8, 30.2, 0.6],
        [-64.2, 38.8, 0.6],
        [-29.8, 38.8, 0.6],
      ],
      P,
    ),
    ruler: slab(PLATE_RULER, 0, 0.6, 3),
    rulerMinor: ticks.minor,
    rulerMajor: ticks.major,
    cable: poly([
      [13, 4, 2.5],
      [16, 4, 0.8],
      [23, 4, 0.8],
      [26, 4, 3],
    ]),
    cableEnds: pointsAt(
      [
        [13, 4, 2.5],
        [26, 4, 3],
      ],
      P,
    ),
  };
})();

export const BODY_ART = (() => {
  const seam = sideSeam(TORSO, 17.5, P, 4);
  const screwsFront = pointsAt(
    [
      [-31.5, FRONT_Y, 21.3],
      [3.5, FRONT_Y, 21.3],
      [-31.5, FRONT_Y, 37.3],
      [3.5, FRONT_Y, 37.3],
    ],
    P,
  );
  const slits = join(
    Array.from({ length: 7 }, (_, index) =>
      rectY(FRONT_Y, -30 + index * 4.4, -28.6 + index * 4.4, 8.5, 15),
    ),
  );
  const grooves = join([11, 15, 19].map((z) => segment([SIDE_X, -7, z], [SIDE_X, 7, z], P)));
  return {
    pedestal: slab(PEDESTAL, 0, PEDESTAL_H, 4, 0.8),
    pedestalSeam: sideSeam(PEDESTAL, 2.4, P, 4),
    rivets: pointsAt(
      [-34, -26, -18, -10, -2, 6, 10].map(
        (x) => [x, PEDESTAL.y + PEDESTAL.d, 3.8] as [number, number, number],
      ),
      P,
    ),
    torso: slab(TORSO, TORSO_Z, TORSO_TOP - TORSO_Z, 4, 1),
    seam,
    panel: rectY(FRONT_Y, -33, 5, 19.5, 38.5),
    panelInner: rectY(FRONT_Y, -32, 4, 20.5, 37.5),
    screwsFront,
    window: rectY(FRONT_Y, -30, 2, 29.4, 36.6),
    slot: rectY(FRONT_Y, -29, 1, SLOT_Z, SLOT_Z + SLOT_H),
    slotLip: segment([-30, FRONT_Y, SLOT_Z + SLOT_H + 0.9], [2, FRONT_Y, SLOT_Z + SLOT_H + 0.9], P),
    slits,
    sidePanel: rectX(SIDE_X, -9, 9, 9, 26),
    sideGrooves: grooves,
    sideScrews: pointsAt(
      [
        [SIDE_X, -7.2, 10.8],
        [SIDE_X, 7.2, 10.8],
        [SIDE_X, -7.2, 24.2],
        [SIDE_X, 7.2, 24.2],
      ],
      P,
    ),
    topScrews: pointsAt(
      [
        [-33, -11, TORSO_TOP],
        [5, -11, TORSO_TOP],
        [-33, 11, TORSO_TOP],
        [5, 11, TORSO_TOP],
      ],
      P,
    ),
    neck: cyl(CX, CY, 6.5, TORSO_TOP, 4, 20, 0.4),
    collar: cyl(CX, CY, 8.4, TORSO_TOP, 1.6, 24, 0.4),
    shoulderL: cyl(SHOULDER_L[0], SHOULDER_L[1], 5, ARM_Z - 2, ARM_H + 4, 20, 0.5),
    shoulderLCap: ring(SHOULDER_L[0], SHOULDER_L[1], 2.4, ARM_Z + ARM_H + 2, P, 12),
    shoulderR: cyl(SHOULDER_R[0], SHOULDER_R[1], 5, ARM_Z - 2, ARM_H + 4, 20, 0.5),
    shoulderRCap: ring(SHOULDER_R[0], SHOULDER_R[1], 2.4, ARM_Z + ARM_H + 2, P, 12),
  };
})();

export const STATION_ART = (() => {
  const [px, py] = PIVOT;
  const ticks = topTicks(px - 12, px + 12, 2, 4, 12.2, STATION_H, [1.3, 2.6], P);
  return {
    block: slab(STATION, 0, STATION_H, 4, 0.8),
    seam: sideSeam(STATION, 6.4, P, 4),
    slot: planOutline({ x: px - 14, y: py - 1.6, w: 28, d: 3.2, r: 1.4 }, STATION_H, P, 4),
    slotFill: onTop(
      [
        [px - 14, py - 1.6],
        [px + 14, py - 1.6],
        [px + 14, py + 1.6],
        [px - 14, py + 1.6],
      ],
      STATION_H,
      P,
      true,
    ),
    ticksMinor: ticks.minor,
    ticksMajor: ticks.major,
    boot: cyl(px, py, 4.2, STATION_H, 2.2, 20, 0.4),
    bootRing: ring(px, py, 2.2, STATION_H + 2.2, P, 14),
    lamp: cyl(31, 11, 2.4, STATION_H, 2.6, 16, 0.3),
    lampLens: ring(31, 11, 1.4, STATION_H + 2.6, P, 12),
    stops: [px - 15.5, px + 15.5].map((x) =>
      slab({ x: x - 1, y: py - 2, w: 2, d: 4, r: 0.5 }, STATION_H, 1.6, 2),
    ),
    plate: rectY(STATION_FRONT, 29, 59, 3, 9),
    plateSlits: join([32, 35.5, 39, 42.5].map((x) => rectY(STATION_FRONT, x, x + 1.2, 4.6, 7.4))),
    plateScrews: pointsAt(
      [
        [55, STATION_FRONT, 4.4],
        [57.4, STATION_FRONT, 7.6],
        [55, STATION_FRONT, 7.6],
        [57.4, STATION_FRONT, 4.4],
      ],
      P,
    ),
    sidePlate: rectX(STATION.x + STATION.w, 2, 11, 3, 9),
    sideLines: join(
      [4.6, 6, 7.4].map((z) =>
        segment([STATION.x + STATION.w, 3.6, z], [STATION.x + STATION.w, 9.4, z], P),
      ),
    ),
    topScrews: pointsAt(
      [
        [28.6, -2.6, STATION_H],
        [59.4, -2.6, STATION_H],
        [28.6, 13.6, STATION_H],
        [59.4, 13.6, STATION_H],
      ],
      P,
    ),
  };
})();

export const ANTENNA_ART = (() => {
  const base = cyl(CX, CY, 4.2, HEAD_TOP, 2, 20, 0.3);
  const rod = cyl(CX, CY, 0.9, HEAD_TOP + 2, ANTENNA_TOP - 5 - HEAD_TOP - 2, 10);
  const tip = cyl(CX, CY, 2.8, ANTENNA_TOP - 5, 5, 18, 0.5);
  return {
    base,
    rod,
    tip,
    tipTop: ring(CX, CY, 2.8, ANTENNA_TOP, P, 18),
    baseRing: ring(CX, CY, 2.4, HEAD_TOP + 2, P, 14),
  };
})();

export const JOINT_ART = {
  elbow: cyl(0, 0, 4.2, ARM_Z - 1.5, ARM_H + 3, 18, 0.4),
  elbowRing: ring(0, 0, 1.8, ARM_Z + ARM_H + 1.5, P, 12),
  palm: cyl(0, 0, 3.4, ARM_Z + 0.3, ARM_H - 0.6, 16, 0.3),
};
