"use client";

import { useActiveSection } from "@/components/sections/blog/use-active-section";

type BlogPostTocProps = {
  label: string;
  items: readonly { id: string; title: string }[];
};

export function BlogPostToc({ label, items }: BlogPostTocProps) {
  const { activeId, select } = useActiveSection(items.map((item) => item.id));

  return (
    <aside className="hidden lg:block">
      <nav aria-label={label} className="sticky top-8">
        <p className="font-mono text-label uppercase tracking-label text-muted">{label}</p>
        <ol className="mt-5 grid gap-1 border-l border-border">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => select(item.id)}
                  className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    isActive
                      ? "border-ink text-ink"
                      : "border-transparent text-muted hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
