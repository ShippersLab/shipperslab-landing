import { DRAWERS, type DrawerKey } from "@/components/sections/services/figures/systems/model";
import { boxCorners, fitProjection, type Plan, type Point3 } from "@/components/ui/iso/iso-kit";

export const WIDTH = 600;
export const HEIGHT = 480;
const AZIMUTH = 42;
const ELEVATION = 36;

export const BASE: Plan = { x: -96, y: -43, w: 192, d: 86, r: 5 };
export const BASE_H = 6;
export const FOOT_H = 4;
export const CABINET: Plan = { x: -86, y: -35, w: 172, d: 70, r: 2 };
export const BODY_Z = BASE_H;
export const BODY_TOP = 78;
export const CAP: Plan = { x: -90, y: -39, w: 180, d: 78, r: 3 };
export const CAP_TOP = 82;
export const FRONT = CABINET.y + CABINET.d;

export const PANEL_W = 72;
export const PANEL_H = 28;
export const PANEL_D = 3;
export const GAP = 1.5;
export const WALL = 1.4;
export const FLOOR = 3;
export const WALL_H = 18;
export const CARD_W = 60;
export const CARD_H = 22.5;
export const CARD_D = 0.8;
export const PITCH = 3.6;
export const SLOTS = 6;
export const TAB_W = 12;
export const TAB_H = 2.8;

export const HOVER_OPEN = 12;
export const FULL_OPEN = 24;

const COLUMNS = [-38, 38];
const ROWS = [44, 12];

export interface Slot {
  key: DrawerKey;
  cx: number;
  z: number;
  left: number;
  right: number;
}

export const SLOTS_OF: Slot[] = DRAWERS.map((key, index) => {
  const cx = COLUMNS[index % 2]!;
  return {
    key,
    cx,
    z: ROWS[Math.floor(index / 2)]!,
    left: cx - PANEL_W / 2,
    right: cx + PANEL_W / 2,
  };
});

export const PAINT_ORDER = [2, 3, 0, 1];

export const DESK_Z = CAP_TOP;
export const DESK: Plan = { x: -56, y: -28, w: 112, d: 56, r: 3 };
export const DESK_H = 10;
export const BED_Z = DESK_Z + DESK_H;
export const HOUSING: Plan = { x: -40, y: -26, w: 80, d: 24, r: 3 };
export const HOUSING_Z = BED_Z;
const HOUSING_H = 22;
export const HOUSING_TOP = HOUSING_Z + HOUSING_H;
const BELL_TOP = HOUSING_TOP + 6;

export const WINDOW_X = -31;
export const WINDOW_W = 62;
export const WINDOW_Z0 = HOUSING_Z + 5;
export const WINDOW_Z1 = HOUSING_Z + 17;
export const FACE_Y = HOUSING.y + HOUSING.d;

const corners = (plan: Plan, z0: number, z1: number) => boxCorners(plan, z0, z1);

export const P = fitProjection(
  [
    ...corners(BASE, -FOOT_H, BASE_H),
    ...corners(CAP, BASE_H, CAP_TOP),
    ...corners(DESK, CAP_TOP, BED_Z),
    ...corners(HOUSING, HOUSING_Z, BELL_TOP),
    [48, -14, HOUSING_Z + 14],
    [0, FRONT + FULL_OPEN + 4, ROWS[1]!],
  ] as Point3[],
  WIDTH,
  HEIGHT,
  { pad: 30, azimuth: AZIMUTH, elevation: ELEVATION },
);
