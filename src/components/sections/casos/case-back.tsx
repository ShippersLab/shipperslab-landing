import { ArrowRightIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/i18n/link";

type CaseBackProps = {
  label: string;
};

export function CaseBack({ label }: CaseBackProps) {
  return (
    <LocalizedLink
      href="/casos"
      className="inline-flex items-center gap-2 rounded-sm text-sm text-muted transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <ArrowRightIcon className="size-4 rotate-180" />
      {label}
    </LocalizedLink>
  );
}
