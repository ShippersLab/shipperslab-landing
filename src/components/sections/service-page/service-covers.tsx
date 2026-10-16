import { serviceIcon } from "@/components/sections/service-page/service-icons";

type CoverItem = {
  id: string;
  label: string;
};

type ServiceCoversProps = {
  body: string;
  items: readonly CoverItem[];
};

export function ServiceCovers({ body, items }: ServiceCoversProps) {
  return (
    <>
      <p className="text-lg leading-relaxed text-ink sm:text-xl">{body}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => {
          const Icon = serviceIcon(item.id);

          return (
            <li
              key={item.id}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-label uppercase tracking-label text-muted"
            >
              <Icon size={14} className="shrink-0" />
              {item.label}
            </li>
          );
        })}
      </ul>
    </>
  );
}
