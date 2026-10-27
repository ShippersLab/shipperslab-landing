import type { ReactNode } from "react";

import { BlogPostFigure } from "@/components/sections/blog/post-figure";
import { BlogPostTable } from "@/components/sections/blog/post-table";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { type BlogSlug, omitUnpublishedBlogLinks, slugifyHeading } from "@/lib/blog";

const LEAD_MAX_LENGTH = 70;
const COPY_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/(?!\/)[^)\s]+)\)/;

function BlogCopy({ text }: { text: string }) {
  const { messages } = useI18n();
  const nodes: ReactNode[] = [];
  let rest = omitUnpublishedBlogLinks(text);

  while (rest.length > 0) {
    const match = rest.match(COPY_LINK);

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
        <a key={`${href}-${nodes.length}`} href={href} target="_blank" rel="noopener noreferrer">
          {label}
          <span className="sr-only"> ({messages.common.opensNewTab})</span>
        </a>,
      );
    } else {
      nodes.push(
        <LocalizedLink key={`${href}-${nodes.length}`} href={href}>
          {label}
        </LocalizedLink>,
      );
    }

    rest = rest.slice(match.index + match[0].length);
  }

  return nodes;
}

function splitLead(item: string) {
  const end = item.indexOf(". ");
  if (end === -1 || end + 1 > LEAD_MAX_LENGTH) {
    return { lead: item, rest: "" };
  }
  return { lead: item.slice(0, end + 1), rest: item.slice(end + 2) };
}

type BlogPostBodyProps = {
  slug: BlogSlug;
};

export function BlogPostBody({ slug }: BlogPostBodyProps) {
  const { messages } = useI18n();
  const post = messages.blog.posts[slug];

  return (
    <div className="prose-article prose">
      <aside className="not-prose rounded-lg border border-border bg-surface p-5 sm:p-6">
        <p className="text-sm font-medium text-ink">{messages.blog.answerLabel}</p>
        <p className="mt-2 text-base leading-relaxed text-ink">{post.answer}</p>
      </aside>

      {post.intro.map((paragraph) => (
        <p key={paragraph}>
          <BlogCopy text={paragraph} />
        </p>
      ))}

      {post.sections.map((section) => (
        <section key={section.title} id={slugifyHeading(section.title)}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <BlogCopy text={paragraph} />
            </p>
          ))}
          {"image" in section && section.image ? (
            <div className="not-prose">
              <BlogPostFigure image={section.image} />
            </div>
          ) : null}
          {"items" in section && section.items ? (
            <ul>
              {section.items.map((item) => {
                const { lead, rest } = splitLead(item);
                return (
                  <li key={item}>
                    <strong>{lead}</strong>
                    {rest ? ` ${rest}` : null}
                  </li>
                );
              })}
            </ul>
          ) : null}
          {"table" in section && section.table ? <BlogPostTable table={section.table} /> : null}
          {"closing" in section && section.closing ? (
            <p>
              <BlogCopy text={section.closing} />
            </p>
          ) : null}
          {"link" in section && section.link ? (
            <p>
              {section.link.href.startsWith("http") ? (
                <a href={section.link.href} target="_blank" rel="noopener noreferrer">
                  {section.link.label}
                  <span className="sr-only"> ({messages.common.opensNewTab})</span>
                </a>
              ) : (
                <LocalizedLink href={section.link.href}>{section.link.label}</LocalizedLink>
              )}
            </p>
          ) : null}
        </section>
      ))}

      <section id={slugifyHeading(post.checklist.title)}>
        <h2>{post.checklist.title}</h2>
        <p>{post.checklist.intro}</p>
        <ul>
          {post.checklist.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{post.checklist.closing}</p>
      </section>

      <section id={slugifyHeading(post.faq.title)}>
        <h2>{post.faq.title}</h2>
        <div className="not-prose">
          <FaqAccordion items={post.faq.items} delay={0.1} className="mt-6" />
        </div>
      </section>
    </div>
  );
}
