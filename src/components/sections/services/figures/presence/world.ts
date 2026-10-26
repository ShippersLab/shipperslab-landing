import { KEYS } from "@/components/sections/services/figures/presence/model";
import type { Step } from "@/components/sections/services/figures/presence/script";

export const newWorld = () => ({
  mode: 0,
  line: "",
  power: true,
  powerClock: 9,
  modeClock: 1,
  touring: false,
  script: [] as Step[],
  wait: 1.2,
  idle: 0,
  held: KEYS.map(() => 0),
  at: KEYS.map(() => 0),
  active: new Set<number>(),
});
