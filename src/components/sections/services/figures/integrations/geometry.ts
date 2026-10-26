import {
  BASE,
  BASE_H,
  BASE_TOP,
  BEZEL_H,
  BEZEL_R,
  DECK,
  DECK_H,
  DECK_TOP,
  FOOT_H,
  JACK_TOP,
  JACK_X,
  JACK_Y,
  LAMP,
  LID_H,
  P,
  PLATE,
  PLATE_H,
  PLATE_TOP,
  PLUG_H,
  RELAY,
  RELAY_H,
  RELAY_TOP,
} from "@/components/sections/services/figures/integrations/view";
import {
  circleRing,
  corners,
  cylinder,
  extrude,
  insetPlan,
  joinPaths,
  knurl,
  lineOnTop,
  onTop,
  pathOf,
  planOutline,
  pointsAt,
  ring,
  segment,
  sideArc,
  sideMatrix,
  sideSeam,
  slabOf,
  topMatrix,
  topTicks,
  type Flat,
  type Plan,
  type Point3,
} from "@/components/ui/iso/iso-kit";

const FEET: Array<[number, number]> = [
  [-150, -78],
  [150, -78],
  [-150, 78],
  [150, 78],
];

export const BASE_ART = {
  feet: FEET.map(([x, y]) => cylinder(x, y, 7, 0, FOOT_H, P, 16)),
  slab: slabOf(BASE, FOOT_H, BASE_H, P, 6, 0.8),
  seam: sideSeam(BASE, FOOT_H + BASE_H * 0.5, P, 6),
};

const RULER_Y = -80;
const ticks = topTicks(-150, -62, 4, 5, RULER_Y, DECK_TOP, [2, 3.6], P);
const SERIAL: Plan = { x: 78, y: -76, w: 72, d: 34, r: 3 };

export const DECK_ART = {
  slab: slabOf(DECK, BASE_TOP, DECK_H, P, 5, 0.6),
  groove: planOutline(insetPlan(DECK, 4), DECK_TOP, P, 5),
  screws: pointsAt(
    corners(DECK, 8).map(([x, y]): Point3 => [x, y, DECK_TOP]),
    P,
  ),
  screwRings: corners(DECK, 8)
    .map(([x, y]) => ring(x, y, 2, DECK_TOP, P, 12))
    .join(""),
  rulerBase: lineOnTop([-150, RULER_Y], [-62, RULER_Y], DECK_TOP, P),
  rulerMinor: ticks.minor,
  rulerMajor: ticks.major,
  serial: slabOf(SERIAL, DECK_TOP, 1, P, 3),
  serialRules: joinPaths(
    [-64, -58, -52].map((y) =>
      lineOnTop([SERIAL.x + 8, y], [SERIAL.x + SERIAL.w - 22, y], DECK_TOP + 1, P),
    ),
  ),
  serialScrews: pointsAt(
    corners(SERIAL, 4).map(([x, y]): Point3 => [x, y, DECK_TOP + 1]),
    P,
  ),
};

const PORTS = [-27, -9, 9, 27];
const FRONT = RELAY.y + RELAY.d;
const LANES = [-32, -20, -20, -32];

export const TRACE_ART = {
  lines: joinPaths(
    PORTS.map((px, index) =>
      onTop(
        [
          [px, FRONT],
          [px, LANES[index]],
          [JACK_X[index], LANES[index]],
          [JACK_X[index], PLATE.y],
        ],
        DECK_TOP,
        P,
      ),
    ),
  ),
  risers: joinPaths(
    PORTS.map((px) => segment([px, FRONT, DECK_TOP], [px, FRONT, DECK_TOP + 4], P)),
  ),
  ports: pointsAt(
    PORTS.map((px): Point3 => [px, FRONT, DECK_TOP + 4]),
    P,
  ),
  tracePads: pointsAt(
    JACK_X.map((jx): Point3 => [jx, PLATE.y, DECK_TOP]),
    P,
  ),
};

const PLATE_INSET = insetPlan(PLATE, 4);

export const PLATE_ART = {
  slab: slabOf(PLATE, DECK_TOP, PLATE_H, P, 5, 0.5),
  inlay: planOutline(PLATE_INSET, PLATE_TOP, P, 4),
  screws: pointsAt(
    corners(PLATE, 6).map(([x, y]): Point3 => [x, y, PLATE_TOP]),
    P,
  ),
  screwRings: corners(PLATE, 6)
    .map(([x, y]) => ring(x, y, 1.9, PLATE_TOP, P, 12))
    .join(""),
};

const LABEL_Y = 61;
const LABEL_H = 1.2;

export const LABEL_ART = JACK_X.map((jx) => {
  const plan: Plan = { x: jx - 29, y: LABEL_Y, w: 58, d: 17, r: 2 };
  return {
    slab: slabOf(plan, PLATE_TOP, LABEL_H, P, 3),
    text: topMatrix([jx + 3, LABEL_Y + 11.8], PLATE_TOP + LABEL_H, P),
    number: topMatrix([jx - 26, LABEL_Y + 6], PLATE_TOP + LABEL_H, P),
    rule: lineOnTop([jx - 24, LABEL_Y + 13.6], [jx + 24, LABEL_Y + 13.6], PLATE_TOP + LABEL_H, P),
  };
});

export const BEZEL_ART = JACK_X.map((jx) => ({
  collar: cylinder(jx, JACK_Y, BEZEL_R, PLATE_TOP, BEZEL_H, P, 28, 0.4),
  seat: ring(jx, JACK_Y, BEZEL_R - 2.6, JACK_TOP, P, 28),
  knurl: knurl(jx, JACK_Y, BEZEL_R, PLATE_TOP, JACK_TOP, 22, P, 0.3),
  focus: ring(jx, JACK_Y, BEZEL_R + 5, PLATE_TOP, P, 36),
}));

const LID: Plan = insetPlan(RELAY, 3);
const LID_TOP = RELAY_TOP + LID_H;

function slot(x0: number, x1: number, z: number): string {
  const corner = (x: number, height: number): Flat => at3(x, FRONT, height);
  return pathOf([corner(x0, z), corner(x1, z), corner(x1, z + 1.8), corner(x0, z + 1.8)], true);
}

function at3(x: number, y: number, z: number): Flat {
  return pointsAt([[x, y, z]], P)[0];
}

export const RELAY_ART = {
  body: slabOf(RELAY, DECK_TOP, RELAY_H, P, 5, 0.6),
  seam: sideSeam(RELAY, DECK_TOP + RELAY_H * 0.78, P, 5),
  lid: slabOf(LID, RELAY_TOP, LID_H, P, 4, 0.5),
  lidScrews: pointsAt(
    corners(LID, 5).map(([x, y]): Point3 => [x, y, LID_TOP]),
    P,
  ),
  lidRings: corners(LID, 5)
    .map(([x, y]) => ring(x, y, 1.8, LID_TOP, P, 12))
    .join(""),
  slots: joinPaths([0, 1, 2, 3].map((index) => slot(-36, -12, DECK_TOP + 8 + index * 3.6))),
  plate: sideMatrix([6, FRONT], DECK_TOP + 11, P, "left"),
  plateRule: segment([4, FRONT, DECK_TOP + 13], [34, FRONT, DECK_TOP + 13], P),
  lampBase: cylinder(LAMP.x, LAMP.y, 6.4, LID_TOP, 1.2, P, 20),
  lamp: cylinder(LAMP.x, LAMP.y, 4.6, LID_TOP + 1.2, 3.4, P, 20, 0.4),
  lampRing: ring(LAMP.x, LAMP.y, 7.8, LID_TOP, P, 24),
};

export const PLUG_ART = {
  nut: cylinder(0, 0, 8.4, JACK_TOP, 4, P, 26, 0.4),
  nutKnurl: knurl(0, 0, 8.4, JACK_TOP, JACK_TOP + 4, 16, P, 0.3),
  barrel: cylinder(0, 0, 5.4, JACK_TOP + 4, 15, P, 22),
  groove: [JACK_TOP + 8.5, JACK_TOP + 13, JACK_TOP + 16.5]
    .map((z) => sideArc(0, 0, 5.4, z, P, 18))
    .join(""),
  ferrule: cylinder(0, 0, 6.4, JACK_TOP + 19, 3.2, P, 22, 0.3),
  relief: extrude(circleRing(0, 0, 3.8, 18), JACK_TOP + 22.2, PLUG_H - 22.2, P, {}),
  cap: ring(0, 0, 2.2, JACK_TOP + PLUG_H, P, 14),
};
