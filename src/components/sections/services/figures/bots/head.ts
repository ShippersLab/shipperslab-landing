import {
  AZIMUTH,
  CX,
  CY,
  HEAD_D,
  HEAD_H,
  HEAD_TOP,
  HEAD_W,
  HEAD_Z,
  P,
  chamfered,
  clamp,
  poly,
} from "@/components/sections/services/figures/bots/view";
import {
  axisVector,
  cylinder,
  extrude,
  ring,
  roundedPlan,
  type Plane,
  type Point3,
  type SolidPaths,
} from "@/components/ui/iso/iso-kit";

export const YAW_REST = -24;
export const YAW_RANGE = 26;
const RAD = Math.PI / 180;
const FACE_Y = HEAD_D / 2;
const SCREEN_Z: [number, number] = [48, 66.5];
const SCREEN_X = 16.5;
const EYE_Z = 59;
const MOUTH_Z = 52.8;

export interface HeadInput {
  yaw: number;
  gx: number;
  gy: number;
  blink: number;
  smile: number;
}

export interface HeadFrame {
  body: SolidPaths;
  earL: SolidPaths;
  earR: SolidPaths;
  earRings: string;
  hatch: string;
  vents: string;
  sideVents: string;
  bezel: string;
  screen: string;
  glare: string;
  eyes: [string, string];
  mouth: string;
}

export const yawSign = (() => {
  const right = axisVector(P, [
    Math.cos((90 + YAW_REST + 6) * RAD),
    Math.sin((90 + YAW_REST + 6) * RAD),
    0,
  ])[0];
  const left = axisVector(P, [
    Math.cos((90 + YAW_REST - 6) * RAD),
    Math.sin((90 + YAW_REST - 6) * RAD),
    0,
  ])[0];
  return right > left ? 1 : -1;
})();

const BODY_RING = roundedPlan({ x: -HEAD_W / 2, y: -HEAD_D / 2, w: HEAD_W, d: HEAD_D, r: 4 }, 4);

export function headFrame({ yaw, gx, gy, blink, smile }: HeadInput): HeadFrame {
  const cos = Math.cos(yaw * RAD);
  const sin = Math.sin(yaw * RAD);
  const plane = (lx: number, ly: number): Plane => [
    CX + lx * cos - ly * sin,
    CY + lx * sin + ly * cos,
  ];
  const world = (lx: number, ly: number, z: number): Point3 => {
    const [x, y] = plane(lx, ly);
    return [x, y, z];
  };
  const face = (lx: number, z: number, out = 0.1) => world(lx, FACE_Y + out, z);
  const facing = (angle: number) => Math.cos((angle - AZIMUTH) * RAD);
  const sideVisible = (sign: 1 | -1) => facing(yaw + (sign > 0 ? 0 : 180)) > 0.12;

  const body = extrude(
    BODY_RING.map(([x, y]) => plane(x, y)),
    HEAD_Z,
    HEAD_H,
    P,
    { convex: true, bevel: 0.9 },
  );
  const ear = (sign: number) => {
    const [x, y] = plane(sign * (HEAD_W / 2 + 1.4), 0);
    return cylinder(x, y, 3.2, HEAD_Z + 6, 14, P, 14, 0.4);
  };
  const earRing = (sign: number) => {
    const [x, y] = plane(sign * (HEAD_W / 2 + 1.4), 0);
    return ring(x, y, 1.8, HEAD_Z + 20, P, 12);
  };

  const topPoint = (lx: number, ly: number): Point3 => world(lx, ly, HEAD_TOP);
  const hatch = poly(
    [topPoint(-10, 4.4), topPoint(10, 4.4), topPoint(10, 11.4), topPoint(-10, 11.4)],
    true,
  );
  const vents = [6.2, 8, 9.8].map((ly) => poly([topPoint(-6.5, ly), topPoint(6.5, ly)])).join("");
  const sideVents = ([1, -1] as const)
    .filter(sideVisible)
    .map((sign) =>
      [53.5, 56.5, 59.5, 62.5]
        .map((z) =>
          poly([world(sign * (HEAD_W / 2 + 0.1), -7, z), world(sign * (HEAD_W / 2 + 0.1), 7, z)]),
        )
        .join(""),
    )
    .join("");

  const onFace = (points: [number, number][], out?: number) =>
    poly(
      points.map(([lx, z]) => face(lx, z, out)),
      true,
    );
  const bezel = onFace(
    chamfered(-SCREEN_X - 1.2, SCREEN_X + 1.2, SCREEN_Z[0] - 1.2, SCREEN_Z[1] + 1.2, 2.2),
  );
  const screen = onFace(chamfered(-SCREEN_X, SCREEN_X, SCREEN_Z[0], SCREEN_Z[1], 1.6), 0.2);
  const glare = onFace(
    [
      [-14, SCREEN_Z[1] - 0.6],
      [-5, SCREEN_Z[1] - 0.6],
      [-12, SCREEN_Z[0] + 0.6],
      [-14.8, SCREEN_Z[0] + 0.6],
      [-14.8, SCREEN_Z[1] - 2.4],
    ],
    0.3,
  );

  const eyeHeight = 8.2 * (1 - blink * 0.9) + 0.6;
  const eye = (sign: number) => {
    const cx = clamp(sign * 7.2 + gx * 2.6, -12.6, 12.6);
    const cz = EYE_Z + gy * 1.8;
    return onFace(
      chamfered(
        cx - 3.3,
        cx + 3.3,
        cz - eyeHeight / 2,
        cz + eyeHeight / 2,
        Math.min(1.5, eyeHeight / 2 - 0.05),
      ),
      0.4,
    );
  };
  const mouthPoints: [number, number][] = Array.from({ length: 9 }, (_, step) => {
    const along = (step / 8) * 2 - 1;
    return [along * 4.6, MOUTH_Z + smile * (1.9 * along * along - 0.9)];
  });
  const mouth = poly(mouthPoints.map(([lx, z]) => face(lx, z, 0.4)));

  return {
    body,
    earL: ear(-1),
    earR: ear(1),
    earRings: earRing(-1) + earRing(1),
    hatch,
    vents,
    sideVents,
    bezel,
    screen,
    glare,
    eyes: [eye(-1), eye(1)],
    mouth,
  };
}
