import {
  BASE,
  BASE_H,
  BODY_TOP,
  BODY_Z,
  CABINET,
  CAP,
  CAP_TOP,
  CARD_D,
  CARD_H,
  CARD_W,
  FLOOR,
  FOOT_H,
  FRONT,
  GAP,
  P,
  PANEL_D,
  PANEL_H,
  PANEL_W,
  PITCH,
  SLOTS,
  SLOTS_OF,
  TAB_H,
  TAB_W,
  WALL,
  WALL_H,
} from "@/components/sections/services/figures/systems/view";
import * as k from "@/components/ui/iso/iso-kit";

const byDepth = (points: k.Plane[]) =>
  [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const onFront = (x: number, y: number, z: number): k.Point3 => [x, y, z];

function rectangle(x0: number, x1: number, y: number, z0: number, z1: number) {
  const corners: k.Point3[] = [
    onFront(x0, y, z0),
    onFront(x1, y, z0),
    onFront(x1, y, z1),
    onFront(x0, y, z1),
  ];
  return k.pathOf(
    corners.map((point) => k.iso(point, P)),
    true,
  );
}

function sideRectangle(x: number, y0: number, y1: number, z0: number, z1: number) {
  const corners: k.Point3[] = [
    [x, y0, z0],
    [x, y1, z0],
    [x, y1, z1],
    [x, y0, z1],
  ];
  return k.pathOf(
    corners.map((point) => k.iso(point, P)),
    true,
  );
}

const FEET = byDepth(k.corners(BASE, 13));
const STRIP = { x: -70, y: BASE.y + BASE.d - 5.5, w: 140, d: 3.6, r: 0.8 };
const STRIP_TICKS = k.topTicks(
  STRIP.x + 4,
  STRIP.x + STRIP.w - 4,
  4,
  5,
  STRIP.y,
  BASE_H + 0.6,
  [1.2, 2.2],
  P,
);
const BODY_STEPS = 4;

export const BASE_ART = {
  halo: k.haloOf(BASE, -FOOT_H, FOOT_H + BASE_H, P),
  feet: FEET.map(([x, y]) => ({
    flange: k.cylinder(x, y, 6, -FOOT_H, 1.4, P, 24),
    foot: k.cylinder(x, y, 4.6, -FOOT_H + 1.4, FOOT_H - 1.4, P, 24),
  })),
  slab: k.slabOf(BASE, 0, BASE_H, P, 8, 1),
  groove: k.planOutline(k.insetPlan(BASE, 4), BASE_H, P),
  screwRings: k
    .corners(BASE, 8)
    .map(([x, y]) => k.ring(x, y, 2, BASE_H, P, 16))
    .join(""),
  screws: k.pointsAt(
    k.corners(BASE, 8).map(([x, y]) => [x, y, BASE_H] as k.Point3),
    P,
  ),
  strip: k.slabOf(STRIP, BASE_H, 0.6, P, 3),
  stripMinor: STRIP_TICKS.minor,
  stripMajor: STRIP_TICKS.major,
};

const SEAMS = [10, 42, BODY_TOP - 2].map((z) => k.sideSeam(CABINET, z, P, BODY_STEPS));

export const CABINET_ART = {
  body: k.slabOf(CABINET, BODY_Z, BODY_TOP - BODY_Z, P, BODY_STEPS, 0.8),
  seams: SEAMS.join(""),
  cap: k.slabOf(CAP, BODY_TOP, CAP_TOP - BODY_TOP, P, 6, 1),
  capGroove: k.planOutline(k.insetPlan(CAP, 3), CAP_TOP, P),
  capScrews: k.pointsAt(
    k.corners(CAP, 6).map(([x, y]) => [x, y, CAP_TOP] as k.Point3),
    P,
  ),
  frontScrews: k.pointsAt(
    [-80, 80].flatMap((x) => [16, 46, 70].map((z) => onFront(x, FRONT, z))),
    P,
  ),
  sidePanel: sideRectangle(CABINET.x + CABINET.w, -23, 23, 16, 70),
  sidePanelInner: sideRectangle(CABINET.x + CABINET.w, -20, 20, 19, 67),
  sideRail: k.slabOf({ x: CABINET.x + CABINET.w, y: -12, w: 4, d: 24, r: 1.4 }, 40, 4, P, 4, 0.4),
  sidePosts: [-12, 12].map((y) =>
    k.slabOf({ x: CABINET.x + CABINET.w, y: y - 1.5, w: 4, d: 3, r: 0.4 }, 38, 8, P, 2),
  ),
  sideScrews: k.pointsAt(
    [-17, 17].flatMap((y) => [24, 62].map((z) => [CABINET.x + CABINET.w, y, z] as k.Point3)),
    P,
  ),
};

export const VOIDS = SLOTS_OF.map((slot) => ({
  key: slot.key,
  d: rectangle(slot.left - GAP, slot.right + GAP, FRONT, slot.z - GAP, slot.z + PANEL_H + GAP),
}));

const PANEL_Y = FRONT;
const FRONT_Y = FRONT + PANEL_D;

export const PANEL_ART = {
  panel: k.slabOf(
    { x: -PANEL_W / 2, y: PANEL_Y, w: PANEL_W, d: PANEL_D, r: 1 },
    0,
    PANEL_H,
    P,
    3,
    0.6,
  ),
  inset: rectangle(-PANEL_W / 2 + 3, PANEL_W / 2 - 3, FRONT_Y, 3, PANEL_H - 3),
  rivets: k.pointsAt(
    [-1, 1].flatMap((sx) =>
      [4, PANEL_H - 4].map((z) => onFront(sx * (PANEL_W / 2 - 4.2), FRONT_Y, z)),
    ),
    P,
  ),
  holder: k.slabOf({ x: -17.5, y: FRONT_Y, w: 35, d: 0.8, r: 0.6 }, 15.2, 10.4, P, 3),
  holderScrews: k.pointsAt(
    [-1, 1].map((sx) => onFront(sx * 19.6, FRONT_Y, 20.4)),
    P,
  ),
  label: k.slabOf({ x: -15.8, y: FRONT_Y + 0.8, w: 31.6, d: 0.4, r: 0.4 }, 16.6, 7.6, P, 2),
  labelText: k.sideMatrix([0, FRONT_Y + 1.2], 24.2, P, "left"),
  pull: k.slabOf({ x: -12, y: FRONT_Y, w: 24, d: 2.6, r: 1.1 }, 4.6, 3.4, P, 4, 0.4),
  pullPosts: [-1, 1].map((sx) =>
    k.slabOf({ x: sx * 10 - 1.2, y: FRONT_Y, w: 2.4, d: 2.6, r: 0.4 }, 3, 5.6, P, 2),
  ),
  cup: rectangle(-14, 14, FRONT_Y, 2.4, 9.2),
};

const CARD_Z = FLOOR;
const cardY = (slot: number) => FRONT - 2.6 - CARD_D - slot * PITCH;

export const CARD_ART = Array.from({ length: SLOTS }, (_, slot) => {
  const y = cardY(slot);
  return {
    body: k.slabOf({ x: -CARD_W / 2, y, w: CARD_W, d: CARD_D, r: 0.3 }, CARD_Z, CARD_H, P, 2),
    tab: k.slabOf({ x: -TAB_W / 2, y, w: TAB_W, d: CARD_D, r: 0.3 }, CARD_Z + CARD_H, TAB_H, P, 2),
    rules: [CARD_H - 5, CARD_H - 9]
      .map((z) =>
        k.segment(
          onFront(-CARD_W / 2 + 4, y + CARD_D, CARD_Z + z),
          onFront(CARD_W / 2 - 14, y + CARD_D, CARD_Z + z),
          P,
        ),
      )
      .join(""),
  };
});

export const TAB_SHIFT = [-19, 0, 19];

const TRAY_X0 = -PANEL_W / 2 + 2;
const TRAY_X1 = PANEL_W / 2 - 2;

export function trayOf(open: number) {
  const length = Math.max(open, 0.01);
  const plan = (x: number, w: number) => ({ x, y: FRONT, w, d: length, r: 0 });
  return {
    floor: k.slabOf(plan(TRAY_X0, TRAY_X1 - TRAY_X0), 0, FLOOR, P, 1, 0),
    left: k.slabOf(plan(TRAY_X0, WALL), FLOOR, WALL_H - FLOOR, P, 1, 0),
    right: k.slabOf(plan(TRAY_X1 - WALL, WALL), FLOOR, WALL_H - FLOOR, P, 1, 0),
  };
}
