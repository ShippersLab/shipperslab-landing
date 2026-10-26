type ModeId = "web" | "turnero" | "catalogo";

export interface Mode {
  id: ModeId;
  label: string;
  note: string;
}

export const MODES: Mode[] = [
  { id: "web", label: "Web", note: "tu web" },
  { id: "turnero", label: "Turnos", note: "turnero online" },
  { id: "catalogo", label: "Catálogo", note: "catálogo + WhatsApp" },
];

export const PRODUCTS = ["taza", "remera", "gorra", "vela"];

export const KEY_ROWS: Array<Array<[string, number]>> = [
  [
    ["`", 1],
    ["1", 1],
    ["2", 1],
    ["3", 1],
    ["4", 1],
    ["5", 1],
    ["6", 1],
    ["7", 1],
    ["8", 1],
    ["9", 1],
    ["0", 1],
    ["-", 1],
    ["=", 1],
    ["Backspace", 2],
  ],
  [
    ["Tab", 1.5],
    ["q", 1],
    ["w", 1],
    ["e", 1],
    ["r", 1],
    ["t", 1],
    ["y", 1],
    ["u", 1],
    ["i", 1],
    ["o", 1],
    ["p", 1],
    ["[", 1],
    ["]", 1],
    ["\\", 1.5],
  ],
  [
    ["CapsLock", 1.75],
    ["a", 1],
    ["s", 1],
    ["d", 1],
    ["f", 1],
    ["g", 1],
    ["h", 1],
    ["j", 1],
    ["k", 1],
    ["l", 1],
    [";", 1],
    ["'", 1],
    ["Enter", 2.25],
  ],
  [
    ["Shift", 2.25],
    ["z", 1],
    ["x", 1],
    ["c", 1],
    ["v", 1],
    ["b", 1],
    ["n", 1],
    ["m", 1],
    [",", 1],
    [".", 1],
    ["/", 1],
    ["ShiftRight", 2.75],
  ],
  [
    ["Alt", 1.5],
    ["Meta", 1.5],
    [" ", 9],
    ["NumpadEnter", 1.5],
    ["AltRight", 1.5],
  ],
];

export const KEYS = KEY_ROWS.flat().map(([code]) => code);

export const SHIFTED: Record<string, string> = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  _: "-",
  "+": "=",
  "{": "[",
  "}": "]",
  "|": "\\",
  ":": ";",
  '"': "'",
  "<": ",",
  ">": ".",
  "?": "/",
};

export const PHRASES = ["taza", "gorra", "vela"];
export const MAX_CHARS = 18;

export const nextMode = (index: number) => (index + 1) % MODES.length;

export const matches = (product: string, query: string) =>
  !query.trim() || product.includes(query.trim().toLowerCase());

export function readoutOf(mode: number, line: string, power: boolean) {
  if (!power) return "apagada";
  const hits = PRODUCTS.filter((product) => matches(product, line)).length;
  const base = MODES[mode].note;
  return mode === 2 && line.trim()
    ? `${base} · ${hits} de ${PRODUCTS.length}`
    : `${base} · ${line.length} car.`;
}

export const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
