"use client";

import type { ContactStatus } from "@/components/sections/contact/use-contact-form";
import { SubmitButton } from "@/components/sections/contact/submit-button";
import { CalendarIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

type FormActionsProps = {
  status: ContactStatus;
};

export function FormActions({ status }: FormActionsProps) {
  const { messages } = useI18n();
  const copy = messages.contact.form;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <SubmitButton status={status} />

        <a
          href={site.calUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-muted transition-colors duration-200 hover:text-ink sm:justify-start sm:text-base"
        >
          <CalendarIcon size={16} />
          {copy.bookCall}
        </a>
      </div>

      <p role="status" aria-live="polite" className="text-sm text-muted">
        {status === "success" ? <span className="text-ink">{copy.success}</span> : null}
        {status === "error" ? <span className="text-ink">{copy.error}</span> : null}
        {status === "idle" || status === "sending" ? (
          <>
            {copy.alternative}{" "}
            <a
              href={`mailto:${site.emails.contact}`}
              className="text-ink underline decoration-border underline-offset-4 transition-colors duration-200 hover:decoration-ink"
            >
              {site.emails.contact}
            </a>
          </>
        ) : null}
      </p>
    </div>
  );
}
