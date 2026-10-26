import { PHRASES } from "@/components/sections/services/figures/presence/model";

export interface Step {
  fn?: () => void;
  wait: number;
}

interface Actions {
  setMode: (index: number) => void;
  type: (char: string) => void;
  erase: () => void;
  setPower: (on: boolean) => void;
}

export function buildScript({ setMode, type, erase, setPower }: Actions): Step[] {
  const steps: Step[] = [
    { fn: () => setMode(0), wait: 2.2 },
    { fn: () => setMode(1), wait: 3 },
    { fn: () => setMode(2), wait: 1.2 },
  ];
  for (const phrase of PHRASES) {
    for (const char of phrase) steps.push({ fn: () => type(char), wait: 0.16 });
    steps.push({ wait: 1.6 });
    for (let i = 0; i < phrase.length; i++) steps.push({ fn: erase, wait: 0.07 });
    steps.push({ wait: 0.5 });
  }
  steps.push({ fn: () => setPower(false), wait: 1 }, { fn: () => setPower(true), wait: 1.2 });
  return steps;
}
