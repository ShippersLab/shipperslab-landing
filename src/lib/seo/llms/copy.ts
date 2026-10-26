import { singleLine } from "@/lib/seo/shared/text";
import { site } from "@/lib/site";

const MIN_NEEDLE = 20;

export function canonical(path: string) {
  if (path === "/") return site.url;
  return `${site.url}${path}`;
}

export function absoluteUrl(href: string) {
  if (/^(https?:|mailto:)/.test(href)) return href;
  if (href.startsWith("/")) return `${site.url}${href}`;
  return `${site.url}/${href}`;
}

export function renderCopy(text: string) {
  return text
    .replace(/\{EventOps\}/g, `[EventOps](${site.eventopsUrl})`)
    .replace(/\[([^\]]+)\]\((\/[^)\s]+)\)/g, (_, label: string, href: string) => {
      return `[${label}](${absoluteUrl(href)})`;
    });
}

export function heading(level: 3 | 4, text: string) {
  return `${"#".repeat(level)} ${singleLine(renderCopy(text))}`;
}

export function bullets(lines: readonly string[]) {
  return lines.map((line) => `- ${line}`).join("\n");
}

export function numbered(lines: readonly string[]) {
  return lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
}

export function joinBlocks(blocks: ReadonlyArray<string | false | null | undefined>) {
  return blocks.filter((block): block is string => Boolean(block)).join("\n\n");
}

export function labeled(label: string, body: string) {
  return `**${label}.** ${body}`;
}

export function page(path: string, blocks: ReadonlyArray<string | false | null | undefined>) {
  return joinBlocks([`## ${canonical(path)}`, ...blocks]);
}

function needles(text: string) {
  const normalized = singleLine(text).replace(/\{EventOps\}/g, "\n");
  if (normalized.includes("{")) return [];

  const labels = [...normalized.matchAll(/\[([^\]]+)\]\([^)]+\)/g)].map((match) => match[1]);
  const parts = normalized.split(/\[[^\]]+\]\([^)]+\)|\n/g);

  return [...parts, ...labels]
    .map((part) => part.trim())
    .filter((part) => part.length >= MIN_NEEDLE);
}

function collectNeedles(value: unknown, key?: string): string[] {
  if (key === "id") return [];
  if (typeof value === "string") return needles(value);
  if (Array.isArray(value)) return value.flatMap((item) => collectNeedles(item));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([childKey, child]) => collectNeedles(child, childKey));
  }
  return [];
}

export function assertSourceCopy(source: unknown, output: string) {
  for (const needle of collectNeedles(source)) {
    if (!output.includes(needle)) {
      throw new Error(`llms-full is missing source copy: ${needle}`);
    }
  }
}
