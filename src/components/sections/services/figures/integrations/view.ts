import {
  boxCorners,
  fitProjection,
  iso,
  type Flat,
  type Plan,
  type Point3,
} from "@/components/ui/iso/iso-kit";

export const WIDTH = 600;
export const HEIGHT = 340;
const AZIMUTH = 55;

export const BASE: Plan = { x: -175, y: -100, w: 350, d: 200, r: 8 };
export const FOOT_H = 4;
export const BASE_H = 10;
export const BASE_TOP = FOOT_H + BASE_H;
export const DECK: Plan = { x: -165, y: -90, w: 330, d: 180, r: 5 };
export const DECK_H = 5;
export const DECK_TOP = BASE_TOP + DECK_H;
export const PLATE: Plan = { x: -145, y: 6, w: 290, d: 82, r: 5 };
export const PLATE_H = 4;
export const PLATE_TOP = DECK_TOP + PLATE_H;

export const JACK_X = [-105, -35, 35, 105];
export const JACK_Y = 40;
export const BEZEL_R = 11;
export const BEZEL_H = 3;
export const JACK_TOP = PLATE_TOP + BEZEL_H;
export const PLUG_H = 30;
export const END_Z = JACK_TOP + PLUG_H;

export const RELAY: Plan = { x: -42, y: -86, w: 84, d: 44, r: 5 };
export const RELAY_H = 22;
export const RELAY_TOP = DECK_TOP + RELAY_H;
export const LID_H = 3;
export const LAMP = { x: 24, y: -64 };

const TALLEST = 108;

export const P = fitProjection(
  [
    ...boxCorners(BASE, 0, BASE_TOP),
    ...boxCorners({ x: -150, y: 0, w: 300, d: 90, r: 0 }, 0, TALLEST),
  ],
  WIDTH,
  HEIGHT,
  { pad: 8, azimuth: AZIMUTH },
);

export const at = (point: Point3): Flat => iso(point, P);
