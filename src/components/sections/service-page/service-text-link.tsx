import type { ReactNode } from "react";

import { LocalizedLink } from "@/i18n/link";

type ServiceTextLinkProps = {
  href: string;
  children: ReactNode;
};

export function ServiceTextLink({ href, children }: ServiceTextLinkProps) {
  return (
    <LocalizedLink
      href={href}
      className="mt-4 inline-block text-base font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {children}
    </LocalizedLink>
  );
}
