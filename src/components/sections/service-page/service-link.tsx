import Link from "next/link";
import type { ReactNode } from "react";

type ServiceLinkProps = {
  href: string;
  children: ReactNode;
};

export function ServiceLink({ href, children }: ServiceLinkProps) {
  return (
    <Link
      href={href}
      className="mt-4 inline-block text-base font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {children}
    </Link>
  );
}
