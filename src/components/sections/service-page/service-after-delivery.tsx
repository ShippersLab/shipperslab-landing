import { Reveal } from "@/components/ui/animation/reveal";

type AfterDeliveryItem = {
  label: string;
  body: string;
};

type ServiceAfterDeliveryProps = {
  items: readonly AfterDeliveryItem[];
  delay?: number;
};

export function ServiceAfterDelivery({ items, delay = 0 }: ServiceAfterDeliveryProps) {
  return (
    <Reveal delay={delay} className="border-t border-border pt-10">
      <ul className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map((item) => (
          <li
            key={item.label}
            className="py-6 first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
          >
            <p className="font-mono text-label uppercase tracking-label text-muted">{item.label}</p>
            <p className="mt-3 text-base leading-relaxed text-ink">{item.body}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
