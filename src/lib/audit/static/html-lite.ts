export interface ParsedTag {
  name: string;
  attrs: Record<string, string>;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

export function decodeEntities(text: string): string {
  return text
    .replace(/&(amp|lt|gt|quot|apos|nbsp|#39);/g, (match) => ENTITIES[match] ?? match)
    .replace(/&#(\d{1,6});/g, (_, code: string) => {
      const point = Number.parseInt(code, 10);
      return point > 0 && point < 0x110000 ? String.fromCodePoint(point) : "";
    });
}

export function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function parseAttributes(source: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const pattern = /([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let match = pattern.exec(source);
  while (match !== null) {
    const name = match[1].toLowerCase();
    if (!(name in attrs)) attrs[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
    match = pattern.exec(source);
  }
  return attrs;
}

export function findTags(html: string, names: readonly string[]): ParsedTag[] {
  const alternation = names.join("|");
  const pattern = new RegExp(`<(${alternation})\\b([^>]*)>`, "gi");
  const tags: ParsedTag[] = [];
  let match = pattern.exec(html);
  while (match !== null && tags.length < 2000) {
    tags.push({ name: match[1].toLowerCase(), attrs: parseAttributes(match[2]) });
    match = pattern.exec(html);
  }
  return tags;
}

export function stripToText(html: string): string {
  const withoutBlocks = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, " ");
  return collapseWhitespace(decodeEntities(withoutBlocks.replace(/<[^>]*>/g, " ")));
}

export function findTitle(html: string): string | null {
  const match = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (!match) return null;
  return collapseWhitespace(decodeEntities(match[1].replace(/<[^>]*>/g, " ")));
}

export function findHeadings(html: string): Array<{ level: number; text: string }> {
  const pattern = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings: Array<{ level: number; text: string }> = [];
  let match = pattern.exec(html);
  while (match !== null && headings.length < 200) {
    const text = collapseWhitespace(decodeEntities(match[2].replace(/<[^>]*>/g, " ")));
    headings.push({ level: Number.parseInt(match[1], 10), text: text.slice(0, 200) });
    match = pattern.exec(html);
  }
  return headings;
}

export function countJsonLd(html: string): number {
  return (html.match(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json/gi) ?? []).length;
}
