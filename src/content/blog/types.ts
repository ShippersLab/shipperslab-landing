export type BlogPostEntry = {
  slug: string;
  datePublished: string;
  authorId: string;
  published: boolean;
  cover: string;
};

export type BlogPostImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type BlogPostTable = {
  caption: string;
  columns: readonly string[];
  rows: readonly { label: string; cells: readonly string[] }[];
};

export type BlogPostLink = {
  label: string;
  href: string;
};

export type BlogPostSection = {
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
  closing?: string;
  image?: BlogPostImage;
  table?: BlogPostTable;
  link?: BlogPostLink;
};

export type BlogPostContent = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  answer: string;
  intro: readonly string[];
  sections: readonly BlogPostSection[];
  checklist: {
    title: string;
    intro: string;
    items: readonly string[];
    closing: string;
  };
  faq: {
    title: string;
    items: readonly { question: string; answer: string }[];
  };
  related: {
    title: string;
    links: readonly (BlogPostLink & { description: string })[];
  };
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
};

export type BlogPostSummary = {
  title: string;
  excerpt: string;
  readingMinutes: number;
};
