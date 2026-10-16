import { serviceIcon } from "@/components/sections/service-page/service-icons";

type AudienceItem = {
  id: string;
  title: string;
  body: string;
};

type ServiceAudienceProps = {
  intro: string;
  items: readonly AudienceItem[];
};

export function ServiceAudience({ intro, items }: ServiceAudienceProps) {
  return (
    <>
      <p className="text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
      <ul className="mt-8 grid divide-y divide-border rounded-lg border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map((item) => {
          const Icon = serviceIcon(item.id);

          return (
            <li key={item.id} className="flex flex-col gap-3 p-5">
              <Icon size={20} className="text-muted" />
              <h3 className="font-sans text-base font-normal tracking-normal text-ink">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
