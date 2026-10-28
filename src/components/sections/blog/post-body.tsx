import { BlogPostFigure } from "@/components/sections/blog/post-figure";
import { BlogPostTable } from "@/components/sections/blog/post-table";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { InlineText } from "@/components/ui/inline-text";
import { LocalizedLink } from "@/i18n/link";
import type { BlogPostContent } from "@/content/blog/types";
import { useI18n } from "@/i18n/provider";
import { slugifyHeading } from "@/lib/blog";

const LEAD_MAX_LENGTH = 70;

function splitLead(item: string) {
  const end = item.indexOf(". ");
  if (end === -1 || end + 1 > LEAD_MAX_LENGTH) {
    return { lead: item, rest: "" };
  }
  return { lead: item.slice(0, end + 1), rest: item.slice(end + 2) };
}

type BlogPostBodyProps = {
  post: BlogPostContent;
};

export function BlogPostBody({ post }: BlogPostBodyProps) {
  const { messages } = useI18n();

  return (
    <div className="prose-article prose">
      <aside className="not-prose rounded-lg border border-border bg-surface p-5 sm:p-6">
        <p className="text-sm font-medium text-ink">{messages.blog.answerLabel}</p>
        <p className="mt-2 text-base leading-relaxed text-ink">{post.answer}</p>
      </aside>

      {post.intro.map((paragraph) => (
        <p key={paragraph}>
          <InlineText text={paragraph} />
        </p>
      ))}

      {post.sections.map((section) => (
        <section key={section.title} id={slugifyHeading(section.title)}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <InlineText text={paragraph} />
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
              <InlineText text={section.closing} />
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
