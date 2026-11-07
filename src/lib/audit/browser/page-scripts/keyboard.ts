import type { Page } from "puppeteer-core";
import { evaluateWithHelpers, type PageHelpers } from "@/lib/audit/browser/page-scripts/helpers";
import type { KeyboardCheck } from "@/lib/audit/types/viewport";

interface StaticKeyboardInfo {
  tabbable: number;
  positiveTabindex: number;
  hasSkipLink: boolean;
  clickableNotFocusable: Array<{ selector: string; text: string }>;
}

function staticScript(helpers: PageHelpers): StaticKeyboardInfo {
  const { selectorOf, isVisible, textOf } = helpers;
  const focusable = Array.from(
    document.querySelectorAll(
      "a[href],button:not([disabled]),input:not([type=hidden]):not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]",
    ),
  ).filter((el) => isVisible(el) && (el as HTMLElement).tabIndex >= 0);
  const clickable = Array.from(document.querySelectorAll("[onclick],[role=button],[role=link]"))
    .filter(
      (el) =>
        isVisible(el) &&
        (el as HTMLElement).tabIndex < 0 &&
        !el.matches("a[href],button,input,select,textarea"),
    )
    .slice(0, 10)
    .map((el) => ({ selector: selectorOf(el), text: textOf(el, 40) }));
  const firstLink = document.querySelector("a[href^='#']");
  const skip = Array.from(document.querySelectorAll("a[href^='#']"))
    .slice(0, 3)
    .some((el) =>
      /skip|saltar|ir al contenido|main content|contenido principal/i.test(el.textContent ?? ""),
    );
  return {
    tabbable: focusable.length,
    positiveTabindex: Array.from(document.querySelectorAll("[tabindex]")).filter(
      (el) => Number(el.getAttribute("tabindex")) > 0,
    ).length,
    hasSkipLink: skip && firstLink !== null,
    clickableNotFocusable: clickable,
  };
}

function focusScript(helpers: PageHelpers): { selector: string; indicator: boolean } | null {
  const active = document.activeElement;
  if (!active || active === document.body || active === document.documentElement) return null;
  const style = window.getComputedStyle(active);
  const outlined = style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0;
  const shadowed = style.boxShadow !== "none";
  return { selector: helpers.selectorOf(active), indicator: outlined || shadowed };
}

export async function probeKeyboard(page: Page, maxPresses: number): Promise<KeyboardCheck> {
  const info = await evaluateWithHelpers(page, staticScript, null);
  await page.evaluate(
    "document.activeElement && document.activeElement.blur && document.activeElement.blur()",
  );
  const visited = new Set<string>();
  let missingIndicator = 0;
  let stuckAt: string | null = null;
  let previous: string | null = null;
  let presses = 0;
  const limit = Math.min(maxPresses, Math.max(info.tabbable + 1, 1));
  for (let index = 0; index < limit; index += 1) {
    await page.keyboard.press("Tab");
    presses += 1;
    const focus = await evaluateWithHelpers(page, focusScript, null);
    if (!focus) continue;
    if (focus.selector === previous) {
      stuckAt = focus.selector;
      break;
    }
    previous = focus.selector;
    if (!visited.has(focus.selector)) {
      visited.add(focus.selector);
      if (!focus.indicator) missingIndicator += 1;
    }
  }
  const reachable = Math.min(info.tabbable, limit);
  return {
    tabbableCount: info.tabbable,
    tabPresses: presses,
    reached: visited.size,
    reachedRatio: reachable === 0 ? 0 : Number((visited.size / reachable).toFixed(2)),
    stuckAt,
    focusIndicatorMissing: missingIndicator,
    positiveTabindexCount: info.positiveTabindex,
    hasSkipLink: info.hasSkipLink,
    clickableNotFocusable: info.clickableNotFocusable,
  };
}
