import { TAB_SHIFT, trayOf } from "@/components/sections/services/figures/systems/geometry";
import {
  DRAWERS,
  START,
  digitsOf,
  enter,
  readoutOf,
  spokenOf,
  valueOf,
  type Ledger,
} from "@/components/sections/services/figures/systems/model";
import {
  DROP_END,
  LAND_AT,
  OPEN_ENOUGH,
  dropHeight,
  exposure,
  nextTargets,
  shiftOf,
  variantOf,
  wrapDigit,
} from "@/components/sections/services/figures/systems/motion";
import {
  paintSolid,
  type DrawerNodes,
  type Nodes,
} from "@/components/sections/services/figures/systems/nodes";
import { CELLS, LINE_H, crankOf } from "@/components/sections/services/figures/systems/register";
import {
  CARD_D,
  FULL_OPEN,
  HOVER_OPEN,
  P,
  SLOTS,
} from "@/components/sections/services/figures/systems/view";
import { translateAlong } from "@/components/ui/iso/iso-kit";
import { follow, spring, type Spring } from "@/components/ui/iso/react/live";

const CARD_GAP = 2.6 + CARD_D;
const TOUR_FIRST = 1.4;
const TOUR_AFTER = 3.6;
const TOUR_STEP = 3.8;
const KEY_DIP = 1.1;

interface DrawerState {
  open: Spring;
  pending: number;
  pulse: number;
  drop: number;
  landed: boolean;
  base: number;
  dip: Spring;
  dipTime: number;
  shown: string;
}

export interface Engine {
  ledger: Ledger;
  active: number;
  drawers: DrawerState[];
  cells: Spring[];
  targets: number[];
  angle: number;
  angleTarget: number;
  shownAngle: number;
  shownCells: string;
  hover: number;
  focus: number;
  idle: number;
  need: number;
  tour: number;
}

export interface Hooks {
  say: (text: string) => void;
  speak: (text: string) => void;
}

const shifted = (x: number, y: number, z: number) => translateAlong(P, [x, y, z]);

export function createEngine(): Engine {
  const digits = digitsOf(valueOf(START, DRAWERS[0]!), CELLS);
  return {
    ledger: START,
    active: 0,
    drawers: DRAWERS.map((key) => ({
      open: { at: 0, rate: 0 },
      pending: 0,
      pulse: 0,
      drop: -1,
      landed: false,
      base: START.cards[key],
      dip: { at: 0, rate: 0 },
      dipTime: 0,
      shown: "",
    })),
    cells: digits.map((digit) => ({ at: digit, rate: 0 })),
    targets: [...digits],
    angle: 0,
    angleTarget: 0,
    shownAngle: 0,
    shownCells: "",
    hover: -1,
    focus: -1,
    idle: 0,
    need: TOUR_FIRST,
    tour: 0,
  };
}

function setVariants(state: DrawerState, nodes: DrawerNodes) {
  nodes.tabs.forEach((tab, slot) =>
    tab?.setAttribute("transform", shifted(TAB_SHIFT[variantOf(state.base, slot)]!, 0, 0)),
  );
  nodes.dropTab?.setAttribute("transform", shifted(TAB_SHIFT[variantOf(state.base + 1, 0)]!, 0, 0));
}

export function prime(engine: Engine, nodes: Nodes) {
  engine.drawers.forEach((state, index) => setVariants(state, nodes.drawers[index]!));
  nodes.lamps[engine.active]?.setAttribute("data-on", "");
  nodes.drawers[engine.active]?.label?.setAttribute("data-on", "");
}

function land(engine: Engine, index: number, nodes: Nodes, hooks: Hooks) {
  const state = engine.drawers[index]!;
  engine.ledger = enter(engine.ledger, DRAWERS[index]!);
  nodes.lamps[engine.active]?.removeAttribute("data-on");
  nodes.drawers[engine.active]?.label?.removeAttribute("data-on");
  engine.active = index;
  nodes.lamps[index]?.setAttribute("data-on", "");
  nodes.drawers[index]?.label?.setAttribute("data-on", "");
  engine.targets = nextTargets(
    engine.targets,
    digitsOf(valueOf(engine.ledger, DRAWERS[index]!), CELLS),
  );
  engine.angleTarget += Math.PI * 2;
  state.dipTime = 0.2;
  state.pulse = Math.max(state.pulse, 1.1);
  state.landed = true;
  hooks.say(readoutOf(engine.ledger, DRAWERS[index]!));
  hooks.speak(spokenOf(engine.ledger, DRAWERS[index]!));
}

function commit(engine: Engine, index: number, nodes: Nodes) {
  const state = engine.drawers[index]!;
  state.base += 1;
  state.drop = -1;
  state.landed = false;
  setVariants(state, nodes.drawers[index]!);
}

export function request(engine: Engine, index: number, nodes: Nodes, hooks: Hooks, calm: boolean) {
  const state = engine.drawers[index]!;
  if (calm) {
    land(engine, index, nodes, hooks);
    state.base += 1;
    state.landed = false;
    setVariants(state, nodes.drawers[index]!);
    for (let cell = 0; cell < CELLS; cell++) engine.cells[cell]!.at = engine.targets[cell]!;
    return;
  }
  state.pending += 1;
  state.pulse = Math.max(state.pulse, 1.7);
}

function paintDrawer(engine: Engine, index: number, nodes: DrawerNodes) {
  const state = engine.drawers[index]!;
  const open = Math.max(0, state.open.at);
  const dropping = state.drop >= 0;
  const shift = dropping ? shiftOf(state.drop) : 0;
  const key = `${open.toFixed(2)}|${state.drop.toFixed(3)}`;
  if (key === state.shown) return;
  state.shown = key;
  const visible = open > 0.3;
  for (const tray of nodes.trays) {
    if (visible) tray?.removeAttribute("display");
    else tray?.setAttribute("display", "none");
  }
  if (visible) {
    const tray = trayOf(open);
    paintSolid(nodes.floor, tray.floor);
    paintSolid(nodes.left, tray.left);
    paintSolid(nodes.right, tray.right);
  }
  nodes.panel?.setAttribute("transform", shifted(0, open, 0));
  nodes.hit?.setAttribute("transform", shifted(0, open, 0));
  nodes.cards?.setAttribute("transform", shifted(0, open + shift, 0));
  if (visible) nodes.cards?.removeAttribute("display");
  else nodes.cards?.setAttribute("display", "none");
  for (let slot = 0; slot < SLOTS; slot++) {
    const seen = Math.min(1, Math.max(0, exposure(open, shift, slot, CARD_GAP) / 1.6));
    const card = nodes.cardList[slot];
    if (seen <= 0) card?.setAttribute("display", "none");
    else {
      card?.removeAttribute("display");
      card?.setAttribute("opacity", seen.toFixed(2));
    }
  }
  if (dropping) {
    nodes.dropper?.setAttribute("opacity", "1");
    nodes.dropper?.setAttribute("transform", shifted(0, open, dropHeight(state.drop)));
  } else nodes.dropper?.setAttribute("opacity", "0");
}

function paintCounter(engine: Engine, nodes: Nodes) {
  const moves = engine.cells.map(
    (cell) => `translate(0 ${(-wrapDigit(cell.at) * LINE_H).toFixed(2)})`,
  );
  const joined = moves.join("|");
  if (joined === engine.shownCells) return;
  engine.shownCells = joined;
  moves.forEach((move, index) => nodes.cells[index]?.setAttribute("transform", move));
}

function paintCrank(engine: Engine, nodes: Nodes) {
  if (Math.abs(engine.angle - engine.shownAngle) < 1e-3) return;
  engine.shownAngle = engine.angle;
  const crank = crankOf(engine.angle);
  nodes.arm?.setAttribute("d", crank.arm);
  nodes.knob?.setAttribute("cx", `${crank.tip[0]}`);
  nodes.knob?.setAttribute("cy", `${crank.tip[1]}`);
}

export function step(engine: Engine, nodes: Nodes, hooks: Hooks, dt: number, calm: boolean) {
  const engaged = engine.hover >= 0 || engine.focus >= 0;
  let busy = false;
  if (engaged) {
    engine.idle = 0;
    engine.need = TOUR_AFTER;
  } else if (!calm) {
    engine.idle += dt;
    busy = true;
    if (engine.idle >= engine.need) {
      engine.idle = 0;
      engine.need = TOUR_STEP;
      request(engine, engine.tour % DRAWERS.length, nodes, hooks, false);
      engine.tour += 1;
    }
  }
  engine.drawers.forEach((state, index) => {
    const parts = nodes.drawers[index]!;
    state.pulse = Math.max(0, state.pulse - dt);
    const watched = engine.hover === index || engine.focus === index;
    const goal = state.pulse > 0 ? FULL_OPEN : watched ? HOVER_OPEN : 0;
    let settled = spring(state.open, goal, dt, 130, 17, calm);
    if (state.drop < 0 && state.pending > 0 && state.open.at >= OPEN_ENOUGH) {
      state.pending -= 1;
      state.drop = 0;
    }
    if (state.drop >= 0) {
      state.drop += dt;
      if (!state.landed && state.drop >= LAND_AT) land(engine, index, nodes, hooks);
      if (state.drop >= DROP_END) commit(engine, index, nodes);
      settled = false;
    }
    state.dipTime = Math.max(0, state.dipTime - dt);
    const pressed = spring(state.dip, state.dipTime > 0 ? 1 : 0, dt, 420, 30, calm);
    nodes.keys[index]?.setAttribute("transform", shifted(0, 0, -KEY_DIP * state.dip.at));
    paintDrawer(engine, index, parts);
    if (!settled || !pressed || state.pending > 0 || state.pulse > 0) busy = true;
  });
  let rolling = false;
  engine.cells.forEach((cell, index) => {
    if (!spring(cell, engine.targets[index]!, dt, 130, 20, calm)) rolling = true;
  });
  paintCounter(engine, nodes);
  engine.angle = follow(engine.angle, engine.angleTarget, dt, 0.22, calm);
  paintCrank(engine, nodes);
  return busy || rolling || engine.angle !== engine.angleTarget;
}
