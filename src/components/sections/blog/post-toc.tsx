type BlogPostTocProps = {
  label: string;
  items: readonly { id: string; title: string }[];
};

export function BlogPostToc({ label, items }: BlogPostTocProps) {
  return (
    <aside className="hidden lg:block">
      <nav aria-label={label} className="sticky top-8">
        <p className="font-mono text-label uppercase tracking-label text-muted">{label}</p>
        <ol className="mt-5 grid gap-1 border-l border-border">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors duration-200 ease-out hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
