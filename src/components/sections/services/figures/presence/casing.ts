import {
  D,
  L,
  S,
  flat,
  planeOf,
  recess,
} from "@/components/sections/services/figures/presence/helpers";
import { screenContent } from "@/components/sections/services/figures/presence/screen";
import {
  BEZEL,
  CASE,
  CRT,
  CRT_MID,
  FRONT,
  P,
  PLINTH_H,
  PORT,
  SEAM,
  SIDE,
  SLOT,
  TOP,
  at,
} from "@/components/sections/services/figures/presence/view";
import * as k from "@/components/ui/iso/iso-kit";

const sideSlot = (y: number, z0: number, z1: number, half = 0.8) =>
  k.pathOf(
    k
      .roundedPlan({ x: y - half, y: z0, w: half * 2, d: z1 - z0, r: half }, 4)
      .map(([u, z]) => at([SIDE, u, z])),
    true,
  );

function screen() {
  const crt = `<g data-part="crt" transform="">${screenContent()}</g>`;
  const back = [
    crt,
    `<path class="pf-beam" data-part="beam" d="M${CRT.x0 + 4} ${-CRT_MID}H${CRT.x1 - 4}" style="opacity:0"/>`,
    `<circle class="pf-dot" data-part="dot" cx="0" cy="${-CRT_MID}" r="1.4" style="opacity:0"/>`,
    `<path class="iso-line" data-tone="lo" d="M${CRT.x0 + 3} ${-(CRT.z1 - 9)}Q${CRT.x0 + 3.5} ${-(CRT.z1 - 3.5)} ${CRT.x0 + 9} ${-(CRT.z1 - 3)}"/>`,
  ].join("");
  return recess(
    "presence-clip-bezel",
    BEZEL,
    FRONT,
    "",
    "pf-bezel",
    recess("presence-clip-glass", CRT, FRONT - BEZEL.depth, back, "pf-glass"),
  );
}

function rocker() {
  const y = CASE.y + 8;
  const half = (z: number, proud: boolean) =>
    S(k.slabOf({ x: SIDE + 1.2, y: y + 1.5, w: proud ? 2.4 : 0.8, d: 9, r: 0.6 }, z, 5.6, P, 2), {
      tone: "mid",
    });
  return [
    S(k.slabOf({ x: SIDE, y, w: 1.2, d: 12, r: 1 }, 12, 15, P, 3), {
      tone: "mid",
    }),
    `<g data-rocker="on" data-hit="rocker">${half(13, true)}${half(20.4, false)}</g>`,
    `<g data-rocker="off" data-hit="rocker" style="display:none">${half(20.4, true)}${half(13, false)}</g>`,
  ].join("");
}

function port() {
  return [
    S(k.slabOf({ x: SIDE - 0.4, y: PORT.y - 1, w: 1.4, d: 10, r: 1 }, PORT.z - 1, 9, P, 3), {
      tone: "lo",
    }),
    S(k.slabOf({ x: SIDE + 1, y: PORT.y, w: 4.4, d: 8, r: 1 }, PORT.z, 7, P, 3, 0.4), {
      tone: "mid",
    }),
    S(k.slabOf({ x: SIDE + 5.4, y: PORT.y + 2, w: 5, d: 4, r: 1.6 }, PORT.z + 1.5, 4, P, 4), {
      tone: "mid",
    }),
    D([at([SIDE + 3.2, PORT.y + 1.6, PORT.z + 7]), at([SIDE + 3.2, PORT.y + 6.4, PORT.z + 7])], {
      size: 0.4,
    }),
  ].join("");
}

export function computer() {
  const out = [`<path class="iso-halo" d="${k.haloOf(CASE, 0, 8, P)}"/>`];
  out.push(S(k.slabOf(k.insetPlan(CASE, 3), 0, PLINTH_H, P, 8), { tone: "lo" }));
  out.push(S(k.slabOf(CASE, PLINTH_H, TOP - PLINTH_H, P, 8, 1.6), { tone: "mid" }));
  const handle = { x: -42, y: CASE.y + 7, w: 84, d: 11, r: 5.5 };
  out.push(L(k.planOutline(handle, TOP, P, 8), { tone: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(handle, 2.2), TOP, P, 8), { tone: "faint" }));
  out.push(
    L(
      Array.from({ length: 7 }, (_, i) =>
        k.planOutline({ x: -34, y: CASE.y + 27.3 + i * 3.4, w: 68, d: 1.4, r: 0.7 }, TOP, P, 4),
      ).join(""),
      { tone: "faint" },
    ),
  );
  out.push(
    L(
      k.lineOnTop([CASE.x, SEAM], [SIDE, SEAM], TOP, P) +
        k.segment([SIDE, SEAM, TOP], [SIDE, SEAM, PLINTH_H], P),
      { tone: "lo" },
    ),
  );
  const rowOf = (from: number, to: number) =>
    Array.from({ length: Math.floor((to - from) / 3.2 + 1e-9) + 1 }, (_, i) => from + i * 3.2);
  out.push(
    L(
      rowOf(CASE.y + 10, CASE.y + 52)
        .map((y) => sideSlot(y, TOP - 48, TOP - 14))
        .join(""),
      { tone: "faint" },
    ),
  );
  out.push(
    L(
      rowOf(CASE.y + 10, CASE.y + 40)
        .map((y) => sideSlot(y, 20, 30))
        .join(""),
      { tone: "faint" },
    ),
  );
  out.push(
    `<g transform="${planeOf(FRONT)}"><path class="iso-line" data-tone="faint" d="${flat(CASE.x + 4, PLINTH_H + 4, SIDE - 4, TOP - 4, 5)}"/></g>`,
  );
  out.push(screen());
  out.push(
    recess(
      "presence-clip-slot",
      SLOT,
      FRONT,
      `<path class="iso-line" data-tone="lo" d="M${SLOT.x0} ${-(SLOT.z0 + 1.6)}H${SLOT.x1}"/>`,
      "pf-dark",
    ),
  );
  out.push(D([at([SLOT.x1 + 4, FRONT, SLOT.z0 - 1])], { size: 0.5, tone: "mid" }));
  out.push(
    `<g transform="${planeOf(FRONT)}">${L(Array.from({ length: 9 }, (_, i) => flat(-46.7 + i * 3, 42, -45.3 + i * 3, 54, 0.7, 4)).join(""), { tone: "lo" })}</g>`,
  );
  out.push(
    `<g data-part="led" class="pf-led">${D([at([-46, FRONT, 36])], { size: 0.9, tone: "hi" })}</g>`,
  );
  out.push(rocker());
  out.push(port());
  return `<g class="pf-computer" data-part="computer">${out.join("")}</g>`;
}
