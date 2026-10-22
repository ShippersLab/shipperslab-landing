const LEAD_MAX_LENGTH = 70;

function splitLead(item: string) {
  const end = item.indexOf(". ");
  if (end === -1 || end + 1 > LEAD_MAX_LENGTH) {
    return { lead: item, rest: "" };
  }
  return { lead: item.slice(0, end + 1), rest: item.slice(end + 2) };
}

type BlogPostListProps = {
  items: readonly string[];
};

export function BlogPostList({ items }: BlogPostListProps) {
  return (
    <ul className="mt-6 divide-y divide-border rounded-lg border border-border">
      {items.map((item, index) => {
        const { lead, rest } = splitLead(item);
        return (
          <li key={item} className="flex gap-3 p-4 sm:gap-5 sm:p-5">
            <span aria-hidden className="pt-1 font-mono text-label tracking-label text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-base leading-relaxed text-muted">
              <span className="text-ink">{lead}</span>
              {rest ? ` ${rest}` : null}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
