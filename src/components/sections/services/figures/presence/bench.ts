import { D, L, S, byDepth } from "@/components/sections/services/figures/presence/helpers";
import { KEY_ROWS } from "@/components/sections/services/figures/presence/model";
import {
  COIL,
  FOOT_H,
  KB,
  KB_TOP,
  KB_Z,
  KEYS_X,
  KEYS_Y,
  P,
  PLATE,
  PLATE_H,
  PORT,
  ROW_H,
  SIDE,
  U,
  at,
} from "@/components/sections/services/figures/presence/view";
import * as k from "@/components/ui/iso/iso-kit";

export function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(
      S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), {
        tone: "mid",
      }),
    );
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(
    L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), {
      tone: "lo",
    }),
  );
  out.push(
    D(
      screws.map(([x, y]) => at([x, y, 0])),
      { size: 0.5 },
    ),
  );
  const label = { x: -88, y: 144, w: 40, d: 9, r: 1.2 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  out.push(
    L(
      [30, 22]
        .map((w, i) =>
          k.lineOnTop(
            [label.x + 4, label.y + 3 + i * 3],
            [label.x + 4 + w, label.y + 3 + i * 3],
            0.8,
            P,
          ),
        )
        .join(""),
      { tone: "lo", free: true },
    ),
  );
  out.push(
    D([at([label.x + label.w - 3, label.y + label.d / 2, 0.8])], {
      size: 0.45,
    }),
  );
  return out.join("");
}

export function qrStand() {
  const X = 84;
  const Y = -12;
  const W = 22;
  const out = [
    S(k.slabOf({ x: X - 3, y: Y - 2, w: 9, d: W + 4, r: 2 }, 0, 2.4, P, 4, 0.4), { tone: "lo" }),
  ];
  out.push(
    S(k.slabOf({ x: X, y: Y, w: 2.4, d: W, r: 0.8 }, 2.4, 26, P, 3, 0.4), {
      tone: "hi",
    }),
  );
  const face = X + 2.4;
  const cell = 2.7;
  const y0 = Y + 3;
  const z0 = 6.5;
  const cells = 6;
  const inFinder = (r: number, c: number) =>
    (r < 2 && c < 2) || (r < 2 && c > 3) || (r > 3 && c < 2);
  const dots: k.Flat[] = [];
  for (let r = 0; r < cells; r++)
    for (let c = 0; c < cells; c++)
      if (!inFinder(r, c) && (r * 5 + c * 3 + r * c * 2) % 5 < 3)
        dots.push(at([face, y0 + (c + 0.5) * cell, z0 + (r + 0.5) * cell]));
  const finder = (r0: number, c0: number) =>
    k.pathOf(
      [
        at([face, y0 + c0 * cell + 0.3, z0 + r0 * cell + 0.3]),
        at([face, y0 + (c0 + 2) * cell - 0.3, z0 + r0 * cell + 0.3]),
        at([face, y0 + (c0 + 2) * cell - 0.3, z0 + (r0 + 2) * cell - 0.3]),
        at([face, y0 + c0 * cell + 0.3, z0 + (r0 + 2) * cell - 0.3]),
      ],
      true,
    );
  const core = (r0: number, c0: number) => at([face, y0 + (c0 + 1) * cell, z0 + (r0 + 1) * cell]);
  out.push(L(finder(0, 0) + finder(0, 4) + finder(4, 0), { tone: "mid" }));
  out.push(D([core(0, 0), core(0, 4), core(4, 0), ...dots], { size: 0.6, tone: "hi" }));
  out.push(D([at([face, Y + 3, 24.5]), at([face, Y + W - 3, 24.5])], { size: 0.45 }));
  return out.join("");
}

export function keyboard() {
  const out = [`<path class="iso-halo" d="${k.haloOf(KB, 0, 4, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(KB, 8)))
    out.push(S(k.cylinder(x, y, 2.8, 0, KB_Z, P, 16), { tone: "lo" }));
  out.push(S(k.slabOf(KB, KB_Z, KB_TOP - KB_Z, P, 6, 1), { tone: "mid" }));
  const well = {
    x: KEYS_X - 1.4,
    y: KEYS_Y - 1.4,
    w: U * 15 + 2.8,
    d: U * 5 + 2.8,
    r: 2,
  };
  out.push(L(k.planOutline(well, KB_TOP, P, 4), { tone: "lo" }));
  out.push(
    D([at([KB.x + 4, KB.y + 2.4, KB_TOP]), at([KB.x + KB.w - 4, KB.y + 2.4, KB_TOP])], {
      size: 0.45,
    }),
  );
  let index = 0;
  KEY_ROWS.forEach((row, r) => {
    let x = KEYS_X;
    for (const [code, width] of row) {
      const plan = {
        x: x + 0.7,
        y: KEYS_Y + r * U + 0.7,
        w: width * U - 1.4,
        d: U - 1.4,
        r: 1.4,
      };
      const h = ROW_H[r];
      const dish = k.planOutline(k.insetPlan(plan, code === " " ? 1.8 : 1.6), KB_TOP + h, P, 3);
      out.push(
        `<g class="pf-key" data-key="${index++}">${S(k.slabOf(plan, KB_TOP, h, P, 3, 0.4), { tone: "mid", crease: "faint" })}${L(dish, { tone: "faint" })}</g>`,
      );
      x += width * U;
    }
  });
  out.push(
    S(k.slabOf({ x: KB.x + KB.w, y: 90, w: 4, d: 4, r: 1.5 }, 2.5, 4, P, 4), {
      tone: "mid",
    }),
  );
  return out.join("");
}

export function cable() {
  const curve = (points: k.Point3[]) => k.pathOf(points.map((point) => at(point)));
  const start: k.Point3 = [COIL.x + COIL.r, COIL.from, COIL.z];
  const end: k.Point3 = [COIL.x + COIL.r, COIL.to, COIL.z];
  const spring = k.coil(COIL.from, COIL.to, [COIL.x, COIL.z], COIL.r, COIL.turns, "y", P);
  return [
    `<path class="iso-line pf-cord" data-tone="mid" d="${curve([[SIDE + 10.4, PORT.y + 4, PORT.z + 3.5], [SIDE + 14, PORT.y + 6, PORT.z + 2.4], [SIDE + 17, PORT.y + 9.5, PORT.z - 1], [SIDE + 19.6, PORT.y + 13, COIL.z + 1.6], start])}"/>`,
    L(spring.back, { tone: "lo" }),
    L(spring.front, { tone: "mid" }),
    `<path class="iso-line pf-cord" data-tone="mid" d="${curve([end, [COIL.x + 2.6, COIL.to + 3, COIL.z + 0.2], [KB.x + KB.w + 6.4, 91.4, 4.4], [KB.x + KB.w + 4, 92, 4.5]])}"/>`,
  ].join("");
}
