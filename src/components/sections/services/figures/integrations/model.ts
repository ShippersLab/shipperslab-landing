export const JACKS = ["WhatsApp", "Planilla", "Facturación", "Sistema"] as const;

export type Jack = 0 | 1 | 2 | 3;
export type Cable = 0 | 1;
export type Pair = [Jack, Jack];
export type Patch = [Pair, Pair];

interface Hop {
  cable: Cable;
  end: 0 | 1;
  from: Jack;
  to: Jack;
}

export interface Repatch {
  patch: Patch;
  lead: Hop;
  other: Hop;
}

export const START: Patch = [
  [0, 1],
  [2, 3],
];

export function seatOf(patch: Patch, jack: Jack): { cable: Cable; end: 0 | 1 } {
  for (const cable of [0, 1] as const) {
    for (const end of [0, 1] as const) {
      if (patch[cable][end] === jack) return { cable, end };
    }
  }
  return { cable: 0, end: 0 };
}

export function repatch(patch: Patch, from: Jack, to: Jack): Repatch | null {
  if (from === to) return null;
  const mine = seatOf(patch, from);
  const theirs = seatOf(patch, to);
  if (mine.cable === theirs.cable) return null;
  const next: Patch = [
    [patch[0][0], patch[0][1]],
    [patch[1][0], patch[1][1]],
  ];
  next[mine.cable][mine.end] = to;
  next[theirs.cable][theirs.end] = from;
  return {
    patch: next,
    lead: { ...mine, from, to },
    other: { ...theirs, from: to, to: from },
  };
}

export const linkText = (pair: Pair) => `${JACKS[pair[0]]} → ${JACKS[pair[1]]} · sincronizado`;

export const pickText = (jack: Jack) => `${JACKS[jack]} · elegí otra entrada`;

export const refuseText = (jack: Jack) => `${JACKS[jack]} · ese cable ya llega ahí`;

export const restText = (patch: Patch) => linkText(patch[0]);

export function labelOf(patch: Patch, jack: Jack, selected: Jack | null) {
  const { cable, end } = seatOf(patch, jack);
  const partner = JACKS[patch[cable][end === 0 ? 1 : 0]];
  if (selected === jack) return `${JACKS[jack]}, cable a ${partner} en mano. Enter para soltarlo`;
  if (selected !== null)
    return `${JACKS[jack]}. Enter para pasar acá el cable de ${JACKS[selected]}`;
  return `${JACKS[jack]}, cable a ${partner}. Enter para tomar el cable`;
}
