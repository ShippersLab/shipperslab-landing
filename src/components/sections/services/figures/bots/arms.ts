import {
  ARM_H,
  ARM_MID,
  ARM_Z,
  P,
  PIVOT,
  SHOULDER_L,
  SHOULDER_R,
  at,
  clamp,
  hullOf,
} from "@/components/sections/services/figures/bots/view";
import {
  extrude,
  onTop,
  pathOf,
  roundedPlan,
  type Flat,
  type Plane,
  type Point3,
  type SolidPaths,
} from "@/components/ui/iso/iso-kit";

const RAD = Math.PI / 180;
const UPPER = 21;
const FORE = 19;
const WIDTH = 6;
const RINGS = new Map<number, Plane[]>();
const ringFor = (length: number) => {
  const known = RINGS.get(length);
  if (known) return known;
  const made = roundedPlan({ x: -2, y: -WIDTH / 2, w: length + 4, d: WIDTH, r: 2.4 }, 3);
  RINGS.set(length, made);
  return made;
};

interface Segment {
  solid: SolidPaths;
  groove: string;
}

export interface ArmFrame {
  upper: Segment;
  fore: Segment;
  elbow: Flat;
  hand: Flat;
  prongs: [SolidPaths, SolidPaths];
}

function segmentOf(from: Flat, angle: number, length: number): Segment {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const ring: Plane[] = ringFor(length).map(([x, y]) => [
    from[0] + x * cos - y * sin,
    from[1] + x * sin + y * cos,
  ]);
  const solid = extrude(ring, ARM_Z, ARM_H, P, { convex: true, bevel: 0.5 });
  const a: Plane = [from[0] + 1 * cos, from[1] + 1 * sin];
  const b: Plane = [from[0] + (length - 1) * cos, from[1] + (length - 1) * sin];
  return { solid, groove: onTop([a, b], ARM_Z + ARM_H, P) };
}

function prongsOf(hand: Flat, angle: number, open: number): [SolidPaths, SolidPaths] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const side = 2.3 + open * 1.5;
  const make = (sign: number) => {
    const start: Flat = [
      hand[0] + cos * 2.4 - sin * sign * side,
      hand[1] + sin * 2.4 + cos * sign * side,
    ];
    const ring: Plane[] = [
      [0, -1],
      [6, -0.8],
      [6, 0.8],
      [0, 1],
    ].map(([x, y]) => [start[0] + x * cos - y * sin, start[1] + x * sin + y * cos]);
    return extrude(ring, ARM_Z + 0.5, ARM_H - 1, P, { convex: true });
  };
  return [make(-1), make(1)];
}

function frameOf(shoulder: Flat, upper: number, fore: number, open: number): ArmFrame {
  const elbow: Flat = [
    shoulder[0] + Math.cos(upper) * UPPER,
    shoulder[1] + Math.sin(upper) * UPPER,
  ];
  const hand: Flat = [elbow[0] + Math.cos(fore) * FORE, elbow[1] + Math.sin(fore) * FORE];
  return {
    upper: segmentOf(shoulder, upper, UPPER),
    fore: segmentOf(elbow, fore, FORE),
    elbow,
    hand,
    prongs: prongsOf(hand, fore, open),
  };
}

export function leftArm(wave: number, clock: number): ArmFrame {
  const swing = Math.sin(clock * 9) * 5 * wave;
  const fore = (88 - wave * 22 + swing) * RAD;
  return frameOf(SHOULDER_L, 150 * RAD, fore, wave);
}

export const LEVER_REST = -30;
const LEVER_PULLED = 28;
const LEVER_LENGTH = 27;
const REST_HAND: Flat = [SHOULDER_R[0] + 17, SHOULDER_R[1] + 15];
const CONTACT_Z = ARM_MID - PIVOT[2];

export const leverAngle = (pull: number) => LEVER_REST + (LEVER_PULLED - LEVER_REST) * pull;

const contactAt = (angle: number): Flat => [
  PIVOT[0] + CONTACT_Z * Math.tan(angle * RAD) - 5.8,
  PIVOT[1],
];

export function rightArm(reach: number, pull: number): ArmFrame {
  const contact = contactAt(leverAngle(pull));
  const target: Flat = [
    REST_HAND[0] + (contact[0] - REST_HAND[0]) * reach,
    REST_HAND[1] + (contact[1] - REST_HAND[1]) * reach,
  ];
  const dx = target[0] - SHOULDER_R[0];
  const dy = target[1] - SHOULDER_R[1];
  const reachMax = UPPER + FORE - 0.4;
  const distance = clamp(Math.hypot(dx, dy), Math.abs(UPPER - FORE) + 0.5, reachMax);
  const base = Math.atan2(dy, dx);
  const along = (distance * distance + UPPER * UPPER - FORE * FORE) / (2 * distance);
  const bend = Math.acos(clamp(along / UPPER, -1, 1));
  const upper = base - bend;
  const elbow: Flat = [
    SHOULDER_R[0] + Math.cos(upper) * UPPER,
    SHOULDER_R[1] + Math.sin(upper) * UPPER,
  ];
  const fore = Math.atan2(
    SHOULDER_R[1] + Math.sin(base) * distance - elbow[1],
    SHOULDER_R[0] + Math.cos(base) * distance - elbow[0],
  );
  return frameOf(SHOULDER_R, upper, fore, 1 - reach * 0.7);
}

export interface LeverFrame {
  silhouette: string;
  faceY: string;
  faceX: string;
  groove: string;
  knob: Flat;
  knobHighlight: Flat;
  knobRadius: number;
}

export function leverFrame(angle: number): LeverFrame {
  const a = angle * RAD;
  const dir: Point3 = [Math.sin(a), 0, Math.cos(a)];
  const normal: Point3 = [Math.cos(a), 0, -Math.sin(a)];
  const [px, py, pz] = PIVOT;
  const base: Point3 = [px, py, pz + 1];
  const top: Point3 = [px + dir[0] * LEVER_LENGTH, py, pz + 1 + dir[2] * LEVER_LENGTH];
  const corner = (end: Point3, half: number, side: number, depth: number): Point3 => [
    end[0] + normal[0] * half * side,
    end[1] + depth,
    end[2] + normal[2] * half * side,
  ];
  const wideBase = 1.8;
  const wideTop = 1.35;
  const depth = 1.5;
  const eight: Point3[] = [];
  for (const side of [-1, 1]) {
    for (const d of [-depth, depth]) {
      eight.push(corner(base, wideBase, side, d), corner(top, wideTop, side, d));
    }
  }
  const quad = (points: Point3[]) => pathOf(points.map(at), true);
  const centre = (end: Point3, d: number): Point3 => [end[0], end[1] + d, end[2]];
  const knobCentre = at([top[0] + dir[0] * 2.4, top[1], top[2] + dir[2] * 2.4]);
  const scale = P.scale;
  return {
    silhouette: pathOf(hullOf(eight.map(at)), true),
    faceY: quad([
      corner(base, wideBase, -1, depth),
      corner(base, wideBase, 1, depth),
      corner(top, wideTop, 1, depth),
      corner(top, wideTop, -1, depth),
    ]),
    faceX: quad([
      corner(base, wideBase, 1, -depth),
      corner(base, wideBase, 1, depth),
      corner(top, wideTop, 1, depth),
      corner(top, wideTop, 1, -depth),
    ]),
    groove: pathOf([at(centre(base, depth + 0.05)), at(centre(top, depth + 0.05))]),
    knob: knobCentre,
    knobHighlight: [knobCentre[0] - 1.1 * scale * 0.6, knobCentre[1] - 1.3 * scale * 0.6],
    knobRadius: 3.4 * scale,
  };
}
