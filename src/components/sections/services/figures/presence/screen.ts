import { flat } from "@/components/sections/services/figures/presence/helpers";
import { MODES, PRODUCTS } from "@/components/sections/services/figures/presence/model";
import { CRT } from "@/components/sections/services/figures/presence/view";

export const TEXT_X = -17;
const TEXT_Z = 139.7;

const box = (x0: number, z0: number, x1: number, z1: number, className: string, r = 1.2) =>
  `<path class="${className}" d="${flat(x0, z0, x1, z1, r, 3)}"/>`;
const label = (
  x: number,
  z: number,
  text: string,
  size = 3.2,
  className = "pf-t",
  anchor = "start",
) =>
  `<text class="${className}" x="${x}" y="${-z}" font-size="${size}" text-anchor="${anchor}">${text}</text>`;
const circle = (cx: number, z: number, r: number, className: string) =>
  `<circle class="${className}" cx="${cx}" cy="${-z}" r="${r}"/>`;
const poly = (points: Array<[number, number]>, className: string) =>
  `<path class="${className}" d="M${points.map(([x, z]) => `${x} ${-z}`).join("L")}Z"/>`;

function chrome() {
  const tabs = MODES.map((mode, index) => {
    const x = -36 + index * 24;
    const active = index === 0;
    return `<g data-tab="${index}">${box(x, 129.5, x + 22, 135.5, active ? "pf-acc" : "pf-ghost", 1.6)}${label(x + 11, 130.9, mode.label, 3.3, "pf-t", "middle")}</g>`;
  });
  return [
    circle(-33.5, 141.2, 1, "pf-bar"),
    circle(-30.5, 141.2, 1, "pf-dim"),
    circle(-27.5, 141.2, 1, "pf-dim"),
    box(-23, 138, 36, 144.5, "pf-dim", 3),
    circle(-20.4, 142.6, 1.2, "pf-ghost"),
    `<path class="pf-ghost" d="M-19.5 ${-141.7}L-18.2 ${-140.4}"/>`,
    `<text class="pf-t" data-part="text" x="${TEXT_X}" y="${-TEXT_Z}" font-size="4"></text>`,
    `<text class="pf-t pf-soft" data-part="hint" x="${TEXT_X + 3}" y="${-TEXT_Z}" font-size="4">buscar</text>`,
    `<rect class="pf-cursor" data-part="cursor" x="${TEXT_X}" y="${-TEXT_Z - 3.1}" width="1.8" height="4.2"/>`,
    ...tabs,
  ].join("");
}

function web() {
  const cards = [0, 1, 2].map((i) => {
    const x = -36 + i * 25;
    return `${box(x, 82, x + 22, 94, "pf-ghost", 1.4)}${box(x + 2, 85, x + 9, 92, "pf-dim", 1)}${box(x + 11, 90, x + 20, 91.4, "pf-bar", 0.6)}${box(x + 11, 86.6, x + 17, 87.8, "pf-dim", 0.6)}`;
  });
  return [
    box(-36, 121, -6, 124.4, "pf-bar", 1.2),
    box(-36, 116, -12, 118.2, "pf-dim", 1),
    box(-36, 111.4, -17, 113.6, "pf-dim", 1),
    box(-36, 100, -14, 107, "pf-acc", 2),
    label(-25, 102.4, "Contacto", 3.1, "pf-t", "middle"),
    box(-2, 99, 36, 125, "pf-dim", 2),
    circle(26, 116.5, 3.2, "pf-ghost"),
    poly(
      [
        [0, 101],
        [10, 112],
        [17, 105],
        [24, 110],
        [34, 101],
      ],
      "pf-bar",
    ),
    ...cards,
  ].join("");
}

function turnero() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const booked = new Set([2, 4, 8, 9, 12, 15, 19, 22]);
  const cells: string[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 7; col++) {
      const n = row * 7 + col;
      const x = -35 + col * 5.5;
      const z = 114.5 - row * 5.5;
      const cls = n === 17 ? "pf-acc" : booked.has(n) ? "pf-dim" : "pf-ghost";
      cells.push(box(x, z - 4.6, x + 4.6, z, cls, 0.9));
    }
  }
  const slots = ["09:00", "10:30", "12:00", "16:30"].map((time, i) => {
    const z = 124.5 - i * 6.6;
    return `${box(10, z - 5, 36, z, i === 1 ? "pf-ghost pf-pick" : "pf-ghost", 2.4)}${label(23, z - 3.6, time, 3.2, "pf-t", "middle")}`;
  });
  return [
    label(-36, 122.3, "Octubre", 3.8),
    `<path class="pf-ghost" d="M-8 ${-123.4}L-10 ${-121.9}L-8 ${-120.4}M-1 ${-123.4}L1 ${-121.9}L-1 ${-120.4}"/>`,
    ...days.map((d, i) => label(-32.7 + i * 5.5, 117.6, d, 2.6, "pf-t pf-soft", "middle")),
    ...cells,
    ...slots,
    box(10, 90, 36, 97, "pf-acc", 2.4),
    label(23, 92.2, "Reservar", 3.2, "pf-t", "middle"),
    box(-35, 86, -31, 89, "pf-dim", 0.8),
    label(-29.5, 86.3, "ocupado", 2.6, "pf-t pf-soft"),
    box(-12, 86, -8, 89, "pf-ghost", 0.8),
    label(-6.5, 86.3, "libre", 2.6, "pf-t pf-soft"),
  ].join("");
}

const ICONS: Array<(x: number, z: number) => string> = [
  (x, z) =>
    `${box(x + 3, z + 2, x + 10, z + 9, "pf-bar", 1)}<path class="pf-ghost" d="M${x + 10} ${-(z + 7)}H${x + 12}V${-(z + 3)}H${x + 10}"/>`,
  (x, z) =>
    poly(
      [
        [x + 2, z + 9],
        [x + 5, z + 10],
        [x + 7, z + 9],
        [x + 9, z + 10],
        [x + 12, z + 9],
        [x + 11, z + 6],
        [x + 10, z + 7],
        [x + 10, z + 2],
        [x + 4, z + 2],
        [x + 4, z + 7],
        [x + 3, z + 6],
      ],
      "pf-bar",
    ),
  (x, z) =>
    `<path class="pf-bar" d="M${x + 2} ${-(z + 4)}A5 5 0 0 1 ${x + 12} ${-(z + 4)}ZM${x + 8} ${-(z + 4)}H${x + 14}V${-(z + 3)}H${x + 8}Z"/>`,
  (x, z) =>
    `${box(x + 4, z + 2, x + 10, z + 7, "pf-bar", 0.8)}<path class="pf-acc" d="M${x + 7} ${-(z + 7.4)}Q${x + 5.4} ${-(z + 9.4)} ${x + 7} ${-(z + 11.4)}Q${x + 8.6} ${-(z + 9.4)} ${x + 7} ${-(z + 7.4)}Z"/>`,
];

function catalogo() {
  const items = PRODUCTS.map((name, i) => {
    const x = -36 + (i % 2) * 38;
    const z = 108 - Math.floor(i / 2) * 17;
    return [
      `<g data-product="${i}">`,
      box(x, z, x + 34, z + 16, "pf-ghost", 1.6),
      box(x + 1.5, z + 1.5, x + 15, z + 14.5, "pf-dim", 1.2),
      ICONS[i](x + 1.5, z + 1.5),
      label(x + 17.5, z + 9.8, name, 3.4),
      label(x + 17.5, z + 4.6, `$${(i + 3) * 1200}`, 3, "pf-t pf-soft"),
      circle(x + 30, z + 4, 1.8, "pf-ghost"),
      `<path class="pf-ghost" d="M${x + 30} ${-(z + 5.2)}V${-(z + 2.8)}M${x + 28.8} ${-(z + 4)}H${x + 31.2}"/>`,
      `</g>`,
    ].join("");
  });
  return [
    ...items,
    box(-32, 81.5, 32, 87.5, "pf-acc", 2.6),
    circle(-27.5, 84.5, 1.5, "pf-ghost"),
    label(2, 83.4, "Pedir por WhatsApp", 3, "pf-t", "middle"),
  ].join("");
}

export function screenContent() {
  const lines: string[] = [];
  for (let z = CRT.z0 + 1.2; z < CRT.z1; z += 1.6)
    lines.push(`M${CRT.x0} ${(-z).toFixed(1)}H${CRT.x1}`);
  return [
    `<path class="pf-glow" d="${flat(-30, CRT.z0 + 8, 30, CRT.z1 - 8, 26, 10)}"/>`,
    chrome(),
    `<g data-mode="0">${web()}</g>`,
    `<g data-mode="1" style="display:none">${turnero()}</g>`,
    `<g data-mode="2" style="display:none">${catalogo()}</g>`,
    `<path class="pf-scan" d="${lines.join("")}"/>`,
  ].join("");
}
