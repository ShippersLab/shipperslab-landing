import { ArrowUpRightIcon, GlobeIcon, PlugIcon, RobotIcon, StockIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/i18n/link";
import type { ServiceSlug } from "@/lib/services";

const iconsBySlug = {
  "sistemas-de-gestion": StockIcon,
  "webs-y-catalogos": GlobeIcon,
  "bots-con-ia": RobotIcon,
  integraciones: PlugIcon,
} as const;

type ServiceLinkProps = {
  slug: ServiceSlug;
  label: string;
};

export function ServiceLink({ slug, label }: ServiceLinkProps) {
  const Icon = iconsBySlug[slug];

  return (
    <LocalizedLink
      href={`/${slug}`}
      className="group flex h-full items-center justify-between gap-3 rounded-lg border border-border p-5 text-base text-ink transition-colors duration-200 ease-out hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <span className="flex items-center gap-3">
        <Icon size={20} className="shrink-0 text-muted" />
        {label}
      </span>
      <ArrowUpRightIcon
        size={16}
        className="shrink-0 text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </LocalizedLink>
  );
}
