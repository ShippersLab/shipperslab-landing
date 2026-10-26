import { DRAWERS } from "@/components/sections/services/figures/systems/model";
import { CELLS } from "@/components/sections/services/figures/systems/register";
import { SLOTS } from "@/components/sections/services/figures/systems/view";
import type { SolidPaths } from "@/components/ui/iso/iso-kit";

export interface SolidNodes {
  fill: Element | null;
  shades: (Element | null)[];
  top: Element | null;
  crease: Element | null;
  edge: Element | null;
}

function solidNodes(group: Element | null): SolidNodes {
  return {
    fill: group?.querySelector(".iso-fill") ?? null,
    shades: [0, 1, 2, 3].map(
      (shade) => group?.querySelector(`.iso-shade[data-shade="${shade}"]`) ?? null,
    ),
    top: group?.querySelector(".iso-top") ?? null,
    crease: group?.querySelector(".iso-crease") ?? null,
    edge: group?.querySelector(".iso-edge") ?? null,
  };
}

export function paintSolid(nodes: SolidNodes, paths: SolidPaths) {
  nodes.fill?.setAttribute("d", paths.fill);
  nodes.shades.forEach((node, shade) => node?.setAttribute("d", paths.shades[shade] ?? ""));
  nodes.top?.setAttribute("d", paths.top);
  nodes.crease?.setAttribute("d", paths.crease);
  nodes.edge?.setAttribute("d", paths.outline);
}

export interface DrawerNodes {
  root: Element | null;
  floor: SolidNodes;
  left: SolidNodes;
  right: SolidNodes;
  trays: (Element | null)[];
  cards: Element | null;
  cardList: (Element | null)[];
  tabs: (Element | null)[];
  dropper: Element | null;
  dropTab: Element | null;
  panel: Element | null;
  label: Element | null;
  hit: Element | null;
}

export interface Nodes {
  drawers: DrawerNodes[];
  cells: (Element | null)[];
  lamps: (Element | null)[];
  keys: (Element | null)[];
  arm: Element | null;
  knob: Element | null;
}

export function collect(root: Element): Nodes {
  const drawers = DRAWERS.map((key, index) => {
    const base = root.querySelector(`[data-drawer="${index}"]`);
    const back = base?.querySelector('[data-tray="back"]');
    const front = base?.querySelector('[data-tray="front"]');
    const solids = back?.querySelectorAll(".iso-solid");
    const cardList = Array.from(
      { length: SLOTS },
      (_, slot) => base?.querySelector(`[data-card="${slot}"]`) ?? null,
    );
    return {
      root: base,
      floor: solidNodes(solids?.[0] ?? null),
      left: solidNodes(solids?.[1] ?? null),
      right: solidNodes(front?.querySelector(".iso-solid") ?? null),
      trays: [back ?? null, front ?? null],
      cards: base?.querySelector("[data-cards]") ?? null,
      cardList,
      tabs: cardList.map((card) => card?.querySelector("[data-tab]") ?? null),
      dropper: base?.querySelector("[data-dropper]") ?? null,
      dropTab: base?.querySelector("[data-dropper] [data-tab]") ?? null,
      panel: base?.querySelector("[data-panel]") ?? null,
      label: root.querySelector(`[data-label="${key}"]`),
      hit: root.querySelector(`[data-ring="${index}"]`),
    };
  });
  return {
    drawers,
    cells: Array.from({ length: CELLS }, (_, cell) => root.querySelector(`[data-cell="${cell}"]`)),
    lamps: DRAWERS.map((_, index) => root.querySelector(`[data-lamp="${index}"]`)),
    keys: DRAWERS.map((_, index) => root.querySelector(`[data-key="${index}"]`)),
    arm: root.querySelector(".sys-arm"),
    knob: root.querySelector(".sys-knob"),
  };
}
