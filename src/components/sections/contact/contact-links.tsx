"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CalendarIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/provider";
import { blurItem, staggerGroup } from "@/lib/animation/motion";
import { buildWhatsAppUrl } from "@/lib/contact/message";
import { site } from "@/lib/site";

const CHIP_CLASS =
  "inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-ink transition-colors duration-200 ease-out hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const COPIED_MS = 1800;

const linkGroup = staggerGroup(0.3);

function EmailRow() {
  const { messages } = useI18n();
  const copy = messages.contact.links;
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(site.emails.contact);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPIED_MS);
  }

  return (
    <motion.li variants={blurItem} className="inline-flex items-center gap-1">
      <a href={`mailto:${site.emails.contact}`} className={CHIP_CLASS}>
        <MailIcon size={16} />
        {site.emails.contact}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copy.copyLabel}
        className="rounded-md border border-border px-3 py-1.5 font-mono text-sm tracking-tight text-muted transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span role="status">{copied ? copy.copied : copy.copy}</span>
      </button>
    </motion.li>
  );
}

type LinkRowProps = {
  href: string;
  label: string;
  icon: typeof MailIcon;
};

function LinkRow({ href, label, icon: Icon }: LinkRowProps) {
  const { messages } = useI18n();

  return (
    <motion.li variants={blurItem}>
      <a href={href} target="_blank" rel="noopener noreferrer" className={CHIP_CLASS}>
        <Icon size={16} />
        {label}
        <span className="sr-only">({messages.common.opensNewTab})</span>
      </a>
    </motion.li>
  );
}

export function ContactLinks() {
  const { messages } = useI18n();
  const copy = messages.contact.links;
  const whatsappUrl = buildWhatsAppUrl(site.whatsappNumber, messages.contact.form.whatsappMessage);

  const reducedMotion = useReducedMotion();

  return (
    <motion.ul
      variants={linkGroup}
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-6"
    >
      <EmailRow />
      {whatsappUrl ? (
        <LinkRow href={whatsappUrl} label={copy.whatsapp} icon={WhatsAppIcon} />
      ) : null}
      <LinkRow href={site.social.instagram} label={copy.instagram} icon={InstagramIcon} />
      <LinkRow href={site.calUrl} label={copy.call} icon={CalendarIcon} />
    </motion.ul>
  );
}
