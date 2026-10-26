import { BlogPostTable } from "@/components/sections/blog/post-table";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LocalizedLink } from "@/i18n/link";
import { useI18n } from "@/i18n/provider";
import { type BlogSlug, slugifyHeading } from "@/lib/blog";

const LEAD_MAX_LENGTH = 70;

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
        <p key={paragraph}>{paragraph}</p>
      ))}

      {post.sections.map((section) => (
        <section key={section.title} id={slugifyHeading(section.title)}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
          {"closing" in section && section.closing ? <p>{section.closing}</p> : null}
          {"link" in section && section.link ? (
            <p>
              <LocalizedLink href={section.link.href}>{section.link.label}</LocalizedLink>
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
