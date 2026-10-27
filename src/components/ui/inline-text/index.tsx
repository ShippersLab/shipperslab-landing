"use client";

import type { ReactNode } from "react";

import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { omitUnpublishedBlogLinks } from "@/lib/blog";

const INLINE_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/(?!\/)[^)\s]+)\)/;

export const INLINE_LINK_CLASS =
  "font-medium text-ink underline decoration-accent underline-offset-4 transition-[text-decoration-thickness] duration-200 ease-out hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function InlineText({ text, className }: { text: string; className?: string }) {
  const { messages } = useI18n();
  const nodes: ReactNode[] = [];
  let rest = omitUnpublishedBlogLinks(text);

  while (rest.length > 0) {
    const match = rest.match(INLINE_LINK);

    if (!match || match.index === undefined || !match[1] || !match[2]) {
      nodes.push(rest);
      break;
    }

    if (match.index > 0) {
      nodes.push(rest.slice(0, match.index));
    }

    const label = match[1];
    const href = match[2];

    if (href.startsWith("http")) {
      nodes.push(
        <a
          key={`${href}-${nodes.length}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
          <span className="sr-only"> ({messages.common.opensNewTab})</span>
        </a>,
      );
    } else {
      nodes.push(
        <LocalizedLink key={`${href}-${nodes.length}`} href={href} className={className}>
          {label}
        </LocalizedLink>,
      );
    }

    rest = rest.slice(match.index + match[0].length);
  }

  return nodes;
}
