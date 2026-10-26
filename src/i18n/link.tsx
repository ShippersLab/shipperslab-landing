"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { localizePath } from "@/i18n/paths";
import { useI18n } from "@/i18n/provider";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { locale } = useI18n();

  return <Link href={localizePath(href, locale)} {...props} />;
}
