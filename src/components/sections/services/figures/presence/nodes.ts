import { KEYS, MODES, PRODUCTS } from "@/components/sections/services/figures/presence/model";

export interface Nodes {
  keys: Element[];
  text: SVGTextElement;
  hint: SVGElement;
  cursor: SVGElement;
  crt: SVGElement;
  beam: SVGElement;
  dot: SVGElement;
  glass: SVGElement;
  led: SVGElement;
  rockerOn: SVGElement;
  rockerOff: SVGElement;
  modes: SVGElement[];
  tabs: Element[];
  products: SVGElement[];
}

const pick = <T extends Element>(root: Element, selector: string) =>
  root.querySelector(selector) as unknown as T;

export function collect(root: SVGSVGElement): Nodes {
  return {
    keys: KEYS.map((_, index) => pick(root, `[data-key="${index}"]`)),
    text: pick(root, '[data-part="text"]'),
    hint: pick(root, '[data-part="hint"]'),
    cursor: pick(root, '[data-part="cursor"]'),
    crt: pick(root, '[data-part="crt"]'),
    beam: pick(root, '[data-part="beam"]'),
    dot: pick(root, '[data-part="dot"]'),
    glass: pick(root, ".pf-glass"),
    led: pick(root, '[data-part="led"]'),
    rockerOn: pick(root, '[data-rocker="on"]'),
    rockerOff: pick(root, '[data-rocker="off"]'),
    modes: MODES.map((_, index) => pick(root, `[data-mode="${index}"]`)),
    tabs: MODES.map((_, index) => pick(root, `[data-tab="${index}"]`)),
    products: PRODUCTS.map((_, index) => pick(root, `[data-product="${index}"]`)),
  };
}
