import {
  hullOf,
  P,
  FRONT_Y,
  SLIP_Z,
  SLOT_H,
  SLOT_Z,
  at,
  rectY,
} from "@/components/sections/services/figures/bots/view";
import {
  onTop,
  planOutline,
  pointsAt,
  slabOf,
  topMatrix,
  type Plan,
} from "@/components/ui/iso/iso-kit";

const SLIP_CARD: Plan = { x: -25, y: -13, w: 22, d: 26, r: 1 };
export const SLIP_REACH = 20;
const TOP = SLIP_Z + 0.9;

export const SLIP_ART = (() => {
  const rule = (y: number, x1: number) =>
    onTop(
      [
        [-23, y],
        [x1, y],
      ],
      TOP,
      P,
    );
  return {
    card: slabOf(SLIP_CARD, SLIP_Z, 0.9, P, 2),
    border: planOutline({ x: -24, y: -12, w: 20, d: 24, r: 0.6 }, TOP, P, 2),
    rules: rule(8.4, -6) + rule(10.8, -6) + rule(13, -12),
    perf: pointsAt(
      Array.from(
        { length: 9 },
        (_, index) => [-23 + index * 2.25, -3, TOP] as [number, number, number],
      ),
      P,
    ),
    titleMatrix: topMatrix([-23, 3], TOP, P),
    timeMatrix: topMatrix([-23, 6.2], TOP, P),
  };
})();

const clipLevels = [SLOT_Z - 1, SLOT_Z + SLOT_H + 1];
export const SLIP_CLIP = (() => {
  const points = clipLevels.flatMap((z) =>
    [-60, 40].flatMap((x) => [FRONT_Y, FRONT_Y + 90].map((y) => at([x, y, z]))),
  );
  const hull = hullOf(points);
  return `M${hull.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}Z`;
})();

export const LED_COUNT = 8;
export const LED_PATHS = Array.from({ length: LED_COUNT }, (_, index) =>
  rectY(FRONT_Y + 0.05, -28.6 + index * 3.7, -25.8 + index * 3.7, 30.2, 31.2),
);
