import Link from "next/link";
import type { ReactNode } from "react";

const INLINE_LINK = /\[([^\]]+)\]\((\/[^)\s]+)\)/;

const LINK_CLASS =
  "font-medium text-ink underline decoration-accent underline-offset-4 transition-[text-decoration-thickness] duration-200 ease-out hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function InlineText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let rest = text;

  while (rest.length > 0) {
    const match = rest.match(INLINE_LINK);

    if (!match || match.index === undefined) {
      nodes.push(rest);
      break;
    }

    if (match.index > 0) {
      nodes.push(rest.slice(0, match.index));
    }

    nodes.push(
      <Link key={`${match[2]}-${nodes.length}`} href={match[2]} className={LINK_CLASS}>
        {match[1]}
      </Link>,
    );

    rest = rest.slice(match.index + match[0].length);
  }

  return nodes;
}
