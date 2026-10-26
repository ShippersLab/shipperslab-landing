import { P, at } from "@/components/sections/services/figures/presence/view";
import * as k from "@/components/ui/iso/iso-kit";

export const S = (paths: k.SolidPaths, style?: k.SolidStyle) => k.solidSvg(paths, style);
export const L = (d: string, style?: k.LineStyle) => k.lineSvg(d, style);
export const D = (
  points: Array<k.Flat | [number, number, number]>,
  style?: { size?: number; tone?: k.Tone },
) => k.dotsSvg(points, style);

export const byDepth = (points: k.Plane[]) =>
  [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
export const planeOf = (y: number) => k.sideMatrix([0, y], 0, P, "left");

export const flat = (x0: number, z0: number, x1: number, z1: number, r: number, steps = 6) =>
  k.pathOf(
    k
      .roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps)
      .map(([u, z]) => [u, -z] as k.Flat),
    true,
  );

export interface Opening {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  r: number;
  depth: number;
}

export function recess(
  clipId: string,
  { x0, x1, z0, z1, r, depth }: Opening,
  y: number,
  back = "",
  backClass = "pf-well",
  inside = "",
) {
  const ring = k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, 6);
  const cx = (x0 + x1) / 2;
  const cz = (z0 + z1) / 2;
  const { sinA } = k.cameraOf(P);
  const tops: string[] = [];
  const sides: string[][] = [[], [], [], []];
  ring.forEach(([ax, az], index) => {
    const [bx, bz] = ring[(index + 1) % ring.length];
    const length = Math.hypot(bx - ax, bz - az) || 1;
    let [nx, nz] = [(bz - az) / length, -(bx - ax) / length];
    if (nx * (cx - (ax + bx) / 2) + nz * (cz - (az + bz) / 2) < 0) [nx, nz] = [-nx, -nz];
    if (nx <= 0 && nz <= 0) return;
    const quad = k.pathOf(
      [at([ax, y, az]), at([bx, y, bz]), at([bx, y - depth, bz]), at([ax, y - depth, az])],
      true,
    );
    if (nz >= nx) tops.push(quad);
    else sides[Math.min(3, Math.max(0, Math.floor(((nx * -sinA + 1) / 2) * 4)))].push(quad);
  });
  const shape = flat(x0, z0, x1, z1, r);
  return [
    `<clipPath id="${clipId}"><path transform="${planeOf(y)}" d="${shape}"/></clipPath>`,
    `<g clip-path="url(#${clipId})">`,
    `<path class="iso-top" d="${tops.join("")}"/>`,
    ...sides.map((d, shade) =>
      d.length ? `<path class="iso-shade" data-shade="${shade}" d="${d.join("")}"/>` : "",
    ),
    `<g transform="${planeOf(y - depth)}"><path class="${backClass}" d="${shape}"/>${back}<path class="iso-line" data-tone="faint" d="${shape}"/></g>`,
    inside,
    `</g>`,
    `<g transform="${planeOf(y)}"><path class="iso-line" data-tone="lo" d="${shape}"/></g>`,
  ].join("");
}
