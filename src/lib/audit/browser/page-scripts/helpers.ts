import type { Page } from "puppeteer-core";

export interface PageHelpers {
  selectorOf: (element: Element) => string;
  isVisible: (element: Element) => boolean;
  textOf: (element: Element, max: number) => string;
  rectOf: (element: Element) => { x: number; y: number; width: number; height: number };
}

export function selectorOf(element: Element): string {
  const escape = (value: string) => (window.CSS && CSS.escape ? CSS.escape(value) : value);
  const parts: string[] = [];
  let node: Element | null = element;
  while (node && node.nodeType === 1 && parts.length < 5) {
    if (node.id && document.querySelectorAll(`#${escape(node.id)}`).length === 1) {
      parts.unshift(`#${escape(node.id)}`);
      break;
    }
    const tag = node.tagName.toLowerCase();
    const parent: Element | null = node.parentElement;
    let part = tag;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        (child) => child.tagName === node?.tagName,
      );
      if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(node) + 1})`;
    }
    parts.unshift(part);
    node = parent;
  }
  return parts.join(" > ");
}

export function isVisible(element: Element): boolean {
  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
    return false;
  }
  const box = element.getBoundingClientRect();
  return box.width > 0 && box.height > 0;
}

export function textOf(element: Element, max: number): string {
  const label = element.getAttribute("aria-label");
  const raw = (element as HTMLElement).innerText || element.textContent || label || "";
  const value =
    element.tagName === "INPUT" ? (element as HTMLInputElement).value || label || "" : raw;
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export function rectOf(element: Element) {
  const box = element.getBoundingClientRect();
  return {
    x: Math.round(box.x + window.scrollX),
    y: Math.round(box.y + window.scrollY),
    width: Math.round(box.width),
    height: Math.round(box.height),
  };
}

export async function evaluateWithHelpers<A, R>(
  page: Page,
  script: (helpers: PageHelpers, arg: A) => R,
  arg: A,
): Promise<Awaited<R>> {
  const expression = `(() => {
    const helpers = {
      selectorOf: ${selectorOf.toString()},
      isVisible: ${isVisible.toString()},
      textOf: ${textOf.toString()},
      rectOf: ${rectOf.toString()},
    };
    return (${script.toString()})(helpers, ${JSON.stringify(arg)});
  })()`;
  return (await page.evaluate(expression)) as Awaited<R>;
}
