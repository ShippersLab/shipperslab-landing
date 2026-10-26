import es from "@/i18n/messages/es.json";
import {
  type BlogSlug,
  formatBlogDate,
  getBlogAuthor,
  getBlogPost,
  getPublishedBlogPosts,
  getReadingMinutes,
} from "@/lib/blog";
import {
  absoluteUrl,
  bullets,
  canonical,
  heading,
  joinBlocks,
  labeled,
  page,
  renderCopy,
} from "@/lib/seo/llms/copy";

type BlogPost = (typeof es.blog.posts)[keyof typeof es.blog.posts];
type BlogSection = BlogPost["sections"][number];
type BlogTable = Extract<BlogSection, { table: unknown }>["table"];

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function markdownTable(table: BlogTable) {
  const header = `| | ${table.columns.map(escapeCell).join(" | ")} |`;
  const rule = `| --- | ${table.columns.map(() => "---").join(" | ")} |`;
  const rows = table.rows.map(
    (row) => `| ${escapeCell(row.label)} | ${row.cells.map(escapeCell).join(" | ")} |`,
  );
  return [table.caption, header, rule, ...rows].join("\n");
}

function markdownImage(image: { src: string; alt: string; caption: string }) {
  return `![${image.alt}](${absoluteUrl(image.src)})\n\n${image.caption}`;
}

function buildBlogSection(section: BlogSection) {
  return joinBlocks([
    heading(3, section.title),
    ...section.paragraphs.map((paragraph) => renderCopy(paragraph)),
    "image" in section && section.image ? markdownImage(section.image) : undefined,
    "items" in section && section.items ? bullets(section.items) : undefined,
    "table" in section && section.table ? markdownTable(section.table) : undefined,
    "closing" in section && section.closing ? section.closing : undefined,
    "link" in section && section.link
      ? `[${section.link.label}](${absoluteUrl(section.link.href)})`
      : undefined,
  ]);
}

export function blogCopy(slug: BlogSlug): BlogPost {
  if (!(slug in es.blog.posts)) {
    throw new Error(`Missing Spanish copy for blog post ${slug}`);
  }
  return es.blog.posts[slug];
}

export function buildBlogPost(slug: BlogSlug) {
  const meta = getBlogPost(slug);
  const isPublished = getPublishedBlogPosts().some((post) => post.slug === slug && post.published);
  if (!meta || !isPublished) {
    throw new Error(`llms-full refused an unpublished blog post: ${slug}`);
  }

  const post = blogCopy(slug);
  const author = getBlogAuthor(slug);
  const role = author ? es.team.members[author.id].role : undefined;
  const reading = es.blog.readingTime.replace("{minutes}", String(getReadingMinutes(post)));
  const byline = [
    author?.name,
    role,
    `${es.blog.publishedOn} ${formatBlogDate(meta.datePublished, "es")} (${meta.datePublished})`,
    reading,
  ]
    .filter((part): part is string => Boolean(part))
    .join(". ");

  return page(`/blog/${slug}`, [
    post.metaTitle,
    post.metaDescription,
    heading(3, post.title),
    post.excerpt,
    byline,
    labeled(es.blog.answerLabel, post.answer),
    ...post.intro.map((paragraph) => renderCopy(paragraph)),
    ...post.sections.map((section) => buildBlogSection(section)),
    heading(3, post.checklist.title),
    post.checklist.intro,
    bullets(post.checklist.items),
    post.checklist.closing,
    heading(3, post.faq.title),
    ...post.faq.items.map((item) => joinBlocks([heading(4, item.question), item.answer])),
    heading(3, post.ctaTitle),
    post.ctaDescription,
    `[${post.ctaButton}](${canonical("/empecemos")})`,
    heading(3, post.related.title),
    bullets(
      post.related.links.map(
        (item) => `[${item.label}](${absoluteUrl(item.href)}): ${item.description}`,
      ),
    ),
  ]);
}
