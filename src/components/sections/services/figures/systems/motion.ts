import { PITCH, FULL_OPEN } from "@/components/sections/services/figures/systems/view";

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));
const ease = (t: number) => {
  const u = clamp(t, 0, 1);
  return u * u * (3 - 2 * u);
};

const DROP_FROM = 20;
export const LAND_AT = 0.42;
export const DROP_END = 0.62;
const SHIFT_END = 0.34;
export const OPEN_ENOUGH = FULL_OPEN * 0.72;

export function dropHeight(t: number) {
  const fall = ease((t - 0.06) / (LAND_AT - 0.06));
  return DROP_FROM * (1 - fall * fall);
}

export const shiftOf = (t: number) => ease(t / SHIFT_END) * PITCH;

export function wrapDigit(value: number) {
  return ((value % 10) + 10) % 10;
}

export function nextTargets(targets: number[], digits: number[]) {
  return targets.map((target, cell) => {
    const delta = ((digits[cell]! - wrapDigit(target) + 15) % 10) - 5;
    return target + delta;
  });
}

export function variantOf(count: number, slot: number) {
  return (((count - 1 - slot) % 3) + 3) % 3;
}

export const exposure = (open: number, shift: number, slot: number, cardGap: number) =>
  open + shift - (cardGap + slot * PITCH);
