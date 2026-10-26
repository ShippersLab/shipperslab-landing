const PUSH = 2.2;

interface KeyWorld {
  held: number[];
  at: number[];
  active: Set<number>;
}

export function pressKeys(
  w: KeyWorld,
  keys: Element[],
  dt: number,
  calm: boolean,
  down: [number, number],
) {
  for (const i of w.active) {
    w.held[i] = Math.max(0, w.held[i] - dt);
    const want = w.held[i] > 0 ? PUSH : 0;
    w.at[i] = calm
      ? want
      : w.at[i] + (want - w.at[i]) * (1 - Math.exp(-dt / (want ? 0.025 : 0.07)));
    if (Math.abs(want - w.at[i]) < 0.01) w.at[i] = want;
    keys[i].setAttribute(
      "transform",
      `translate(${(down[0] * w.at[i]).toFixed(2)} ${(down[1] * w.at[i]).toFixed(2)})`,
    );
    keys[i].toggleAttribute("data-down", w.at[i] > 0.6);
    if (!w.held[i] && w.at[i] === 0) w.active.delete(i);
  }
}
