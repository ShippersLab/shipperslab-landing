import type { Page } from "puppeteer-core";
import { evaluateWithHelpers, type PageHelpers } from "@/lib/audit/browser/page-scripts/helpers";
import type { DomSnapshot } from "@/lib/audit/types/viewport";

interface SnapshotArg {
  maxText: number;
  maxNodes: number;
  maxLinks: number;
}

function snapshotScript(helpers: PageHelpers, arg: SnapshotArg): DomSnapshot {
  const { selectorOf, isVisible, textOf, rectOf } = helpers;
  const foldHeight = window.innerHeight;
  const body = document.body;
  const fullText = (body?.innerText ?? "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"))
    .filter((el) => isVisible(el))
    .slice(0, 60)
    .map((el) => ({
      level: Number(el.tagName.slice(1)),
      text: textOf(el, 160),
      selector: selectorOf(el),
    }));

  const nodeSelector =
    "a[href],button,input,select,textarea,summary,[role=button],[role=link],[role=dialog],nav,header,footer,main,form,img[alt]";
  const nodes = Array.from(document.querySelectorAll(nodeSelector))
    .filter((el) => isVisible(el))
    .slice(0, arg.maxNodes)
    .map((el) => {
      const rect = rectOf(el);
      return {
        selector: selectorOf(el),
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute("role"),
        text: textOf(el, 80),
        rect,
        aboveFold: rect.y < foldHeight,
      };
    });

  const ctaWords =
    /contact|comprar|compra|reserv|presupuesto|cotiz|whatsapp|agend|solicit|empez|prob[aá]|demo|turno|suscrib|registr|ingres|descarg|get started|start|book|buy|quote|call|sign ?up|subscribe|order|free|gratis|hablemos|escrib/i;
  const ctas = Array.from(
    document.querySelectorAll("a[href],button,input[type=submit],[role=button]"),
  )
    .filter((el) => isVisible(el))
    .map((el) => {
      const text = textOf(el, 60);
      const tag = el.tagName.toLowerCase();
      const isSubmit =
        (tag === "button" && (el as HTMLButtonElement).type === "submit") ||
        (tag === "input" && (el as HTMLInputElement).type === "submit");
      const className = String((el as HTMLElement).className || "");
      const looksButton = /btn|button|cta/i.test(className) || el.getAttribute("role") === "button";
      const kind: "link" | "button" | "submit" = isSubmit
        ? "submit"
        : tag === "a"
          ? "link"
          : "button";
      let reason = "";
      if (isSubmit) reason = "submit_control";
      else if (tag !== "a" && text) reason = "button_element";
      else if (looksButton && text) reason = "button_styled_link";
      else if (
        ctaWords.test(text) ||
        /^(tel:|mailto:|https?:\/\/(wa\.me|api\.whatsapp))/i.test(el.getAttribute("href") ?? "")
      ) {
        reason = "action_wording_or_contact_link";
      }
      return { el, text, tag, kind, reason };
    })
    .filter((entry) => entry.reason !== "" && entry.text !== "" && entry.text.length <= 60)
    .slice(0, 40)
    .map((entry) => {
      const rect = rectOf(entry.el);
      return {
        selector: selectorOf(entry.el),
        tag: entry.tag,
        kind: entry.kind,
        text: entry.text,
        href: entry.tag === "a" ? (entry.el as HTMLAnchorElement).href.slice(0, 300) : null,
        reason: entry.reason,
        aboveFold: rect.y < foldHeight,
        rect,
      };
    });

  const anchors = Array.from(document.querySelectorAll("a[href]")) as HTMLAnchorElement[];
  const seen = new Set<string>();
  const links: Array<{ href: string; text: string; sameOrigin: boolean }> = [];
  for (const anchor of anchors) {
    const href = anchor.href;
    if (!/^https?:/i.test(href)) continue;
    const key = href.split("#")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    if (links.length < arg.maxLinks * 5) {
      links.push({
        href: key.slice(0, 500),
        text: textOf(anchor, 80),
        sameOrigin: anchor.origin === window.location.origin,
      });
    }
  }

  return {
    title: document.title.slice(0, 300),
    lang: document.documentElement.getAttribute("lang"),
    visibleText: fullText.slice(0, arg.maxText),
    visibleTextChars: fullText.length,
    visibleTextTruncated: fullText.length > arg.maxText,
    headings,
    nodes,
    ctas,
    links,
    linkCount: anchors.length,
    documentHeight: Math.max(document.documentElement.scrollHeight, body?.scrollHeight ?? 0),
  };
}

export function collectDomSnapshot(page: Page, arg: SnapshotArg): Promise<DomSnapshot> {
  return evaluateWithHelpers(page, snapshotScript, arg);
}
