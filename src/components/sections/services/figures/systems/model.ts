export type DrawerKey = "stock" | "pedidos" | "caja" | "turnos";

export const DRAWERS: DrawerKey[] = ["stock", "pedidos", "caja", "turnos"];

export const LABELS: Record<DrawerKey, string> = {
  stock: "Stock",
  pedidos: "Pedidos",
  caja: "Caja",
  turnos: "Turnos",
};

const STOCK_STEPS = [12, 8, 24, 6];
const SALES = [4200, 12500, 3800, 9600, 6400];
const SLOTS_FREE = 9;

export interface Ledger {
  stock: number;
  pedidos: number;
  caja: number;
  turnos: number;
  cards: Record<DrawerKey, number>;
}

export const START: Ledger = {
  stock: 128,
  pedidos: 14,
  caja: 84300,
  turnos: 6,
  cards: { stock: 7, pedidos: 7, caja: 7, turnos: 7 },
};

export function enter(ledger: Ledger, drawer: DrawerKey): Ledger {
  const count = ledger.cards[drawer];
  const cards = { ...ledger.cards, [drawer]: count + 1 };
  if (drawer === "stock")
    return {
      ...ledger,
      cards,
      stock: ledger.stock + STOCK_STEPS[count % STOCK_STEPS.length]!,
    };
  if (drawer === "pedidos") return { ...ledger, cards, pedidos: ledger.pedidos + 1 };
  if (drawer === "caja")
    return {
      ...ledger,
      cards,
      caja: ledger.caja + SALES[count % SALES.length]!,
    };
  return {
    ...ledger,
    cards,
    turnos: ledger.turnos > 0 ? ledger.turnos - 1 : SLOTS_FREE,
  };
}

export const valueOf = (ledger: Ledger, drawer: DrawerKey) => ledger[drawer];

function money(amount: number) {
  const digits = `${Math.round(amount)}`;
  let grouped = "";
  for (let index = 0; index < digits.length; index++) {
    if (index > 0 && (digits.length - index) % 3 === 0) grouped += ".";
    grouped += digits[index];
  }
  return `$ ${grouped}`;
}

export function readoutOf(ledger: Ledger, drawer: DrawerKey) {
  const value = ledger[drawer];
  if (drawer === "stock") return `Stock · ${value} u.`;
  if (drawer === "pedidos") return `Pedidos · ${value} hoy`;
  if (drawer === "caja") return `Caja · ${money(value)}`;
  return `Turnos · ${value} ${value === 1 ? "libre" : "libres"}`;
}

export const digitsOf = (value: number, count: number) =>
  `${Math.max(0, Math.round(value))}`.padStart(count, "0").slice(-count).split("").map(Number);

export function spokenOf(ledger: Ledger, drawer: DrawerKey) {
  const value = ledger[drawer];
  if (drawer === "stock") return `Stock: ${value} unidades`;
  if (drawer === "pedidos") return `Pedidos: ${value} hoy`;
  if (drawer === "caja") return `Caja: ${value} pesos`;
  return `Turnos: ${value} ${value === 1 ? "libre" : "libres"}`;
}
