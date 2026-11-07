import type { Page } from "puppeteer-core";
import { evaluateWithHelpers, type PageHelpers } from "@/lib/audit/browser/page-scripts/helpers";
import type { LayoutChecks } from "@/lib/audit/types/viewport";

function layoutScript(helpers: PageHelpers, arg: { maxSamples: number }): LayoutChecks {
  const { selectorOf, isVisible, textOf } = helpers;
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight;

  const scrollWidth = Math.max(
    document.documentElement.scrollWidth,
    document.body?.scrollWidth ?? 0,
  );
  const offenders: Array<{ selector: string; right: number }> = [];
  if (scrollWidth > viewportWidth) {
    for (const el of Array.from(document.body?.querySelectorAll("*") ?? []).slice(0, 4000)) {
      const box = el.getBoundingClientRect();
      if (box.width > 0 && box.right > viewportWidth + 1 && offenders.length < 5) {
        offenders.push({ selector: selectorOf(el), right: Math.round(box.right) });
      }
    }
  }

  const interactive = Array.from(
    document.querySelectorAll(
      "a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link]",
    ),
  ).filter((el) => isVisible(el));
  const sized = interactive.map((el) => ({ el, box: el.getBoundingClientRect() }));
  const small = sized.filter(({ box }) => box.width < 24 || box.height < 24);
  const medium = sized.filter(({ box }) => box.width < 44 || box.height < 44);
  const samples = small.slice(0, arg.maxSamples).map(({ el, box }) => ({
    selector: selectorOf(el),
    text: textOf(el, 40),
    width: Math.round(box.width),
    height: Math.round(box.height),
  }));

  const overlays: LayoutChecks["overlays"] = [];
  for (const el of Array.from(document.body?.querySelectorAll("*") ?? []).slice(0, 4000)) {
    if (overlays.length >= 8) break;
    const style = window.getComputedStyle(el);
    const isDialog =
      el.getAttribute("role") === "dialog" ||
      el.getAttribute("aria-modal") === "true" ||
      el.tagName === "DIALOG";
    const isFixed = style.position === "fixed";
    if (!isDialog && !isFixed) continue;
    if (!isVisible(el)) continue;
    const box = el.getBoundingClientRect();
    const coverage =
      (Math.min(box.right, viewportWidth) - Math.max(box.left, 0)) *
      (Math.min(box.bottom, viewportHeight) - Math.max(box.top, 0));
    const ratio = Math.max(0, coverage) / (viewportWidth * viewportHeight);
    const hasContent = textOf(el, 20) !== "" || el.querySelector("button,a,input") !== null;
    if (!hasContent) continue;
    if (isDialog && ratio > 0.05) {
      overlays.push({
        selector: selectorOf(el),
        kind: "dialog",
        coverage: Number(ratio.toFixed(2)),
        text: textOf(el, 120),
      });
    } else if (isFixed && ratio >= 0.5) {
      overlays.push({
        selector: selectorOf(el),
        kind: "fixed_cover",
        coverage: Number(ratio.toFixed(2)),
        text: textOf(el, 120),
      });
    } else if (isFixed && ratio >= 0.1 && box.width >= viewportWidth * 0.8) {
      overlays.push({
        selector: selectorOf(el),
        kind: "fixed_banner",
        coverage: Number(ratio.toFixed(2)),
        text: textOf(el, 120),
      });
    }
  }

  const expectedAutocomplete = (input: HTMLInputElement): string | null => {
    const hint = `${input.name} ${input.id} ${input.placeholder}`.toLowerCase();
    if (input.type === "email" || /e-?mail|correo/.test(hint)) return "email";
    if (input.type === "tel" || /tel|phone|whatsapp|celular/.test(hint)) return "tel";
    if (/(^|[^a-z])(full)?name|nombre/.test(hint) && !/user|company|empresa/.test(hint))
      return "name";
    if (/postal|zip|cp\b/.test(hint)) return "postal-code";
    return null;
  };
  const accessibleName = (el: Element): boolean => {
    if (
      el.getAttribute("aria-label") ||
      el.getAttribute("aria-labelledby") ||
      el.getAttribute("title")
    )
      return true;
    const id = el.getAttribute("id");
    if (id && document.querySelector(`label[for="${id.replace(/"/g, '\\"')}"]`)) return true;
    return el.closest("label") !== null;
  };
  const describeField = (el: Element) => {
    const input = el as HTMLInputElement;
    const type = el.tagName === "INPUT" ? input.type : el.tagName.toLowerCase();
    return {
      selector: selectorOf(el),
      type,
      name: input.name || null,
      hasAccessibleName: accessibleName(el),
      required: input.required || el.getAttribute("aria-required") === "true",
      autocomplete: el.getAttribute("autocomplete"),
      expectedAutocomplete: el.tagName === "INPUT" ? expectedAutocomplete(input) : null,
    };
  };
  const fieldSelector =
    "input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=reset]):not([type=image]),select,textarea";

  const stepPattern = /(paso|step|etapa)\s*\d+\s*(de|of|\/)\s*\d+|\b\d+\s*(de|of|\/)\s*\d+\b/i;
  const forms = Array.from(document.forms)
    .slice(0, 10)
    .map((form) => {
      const fields = Array.from(form.querySelectorAll(fieldSelector)).filter((el) => isVisible(el));
      const described = fields.slice(0, 40).map(describeField);
      const fieldTypes: Record<string, number> = {};
      for (const field of described) fieldTypes[field.type] = (fieldTypes[field.type] ?? 0) + 1;
      const stepNode = form.querySelector(
        "[aria-current=step],[class*=step],[class*=progress],progress,[role=progressbar]",
      );
      const stepText = stepPattern.exec((form as HTMLElement).innerText || "");
      const evidence = stepText ? stepText[0] : stepNode ? selectorOf(stepNode) : null;
      let actionHost: string | null = null;
      try {
        actionHost = new URL(form.action, window.location.href).host;
      } catch {
        actionHost = null;
      }
      return {
        selector: selectorOf(form),
        method: (form.getAttribute("method") || "get").toLowerCase(),
        actionHost,
        visible: isVisible(form),
        fieldCount: fields.length,
        requiredCount: described.filter((field) => field.required).length,
        fieldTypes,
        hasSubmitControl:
          form.querySelector("button:not([type=button]):not([type=reset]),input[type=submit]") !==
          null,
        fieldsets: form.querySelectorAll("fieldset").length,
        visibleSteps: { detected: evidence !== null, evidence },
        fields: described,
      };
    });

  const allFields = Array.from(document.querySelectorAll(fieldSelector)).filter((el) =>
    isVisible(el),
  );
  const orphan = allFields.filter((el) => (el as HTMLInputElement).form === null);
  const described = allFields.map(describeField);

  return {
    horizontalOverflow: {
      overflows: scrollWidth > viewportWidth,
      scrollWidth,
      clientWidth: viewportWidth,
      offenders,
    },
    touchTargets: {
      inspected: sized.length,
      below24: small.length,
      below44: medium.length,
      samples,
    },
    overlays,
    forms,
    orphanFieldCount: orphan.length,
    inputsMissingAutocomplete: described.filter(
      (field) => field.expectedAutocomplete !== null && !field.autocomplete,
    ).length,
    inputsMissingName: described.filter((field) => !field.hasAccessibleName).length,
  };
}

export function collectLayout(page: Page, maxSamples: number): Promise<LayoutChecks> {
  return evaluateWithHelpers(page, layoutScript, { maxSamples });
}
