"use client";

import { SubmitButton } from "@/components/sections/contact/submit-button";
import type { ContactStatus } from "@/components/sections/contact/use-contact-form";
import { useI18n } from "@/i18n/provider";

type FormActionsProps = {
  status: ContactStatus;
};

export function FormActions({ status }: FormActionsProps) {
  const { messages } = useI18n();
  const copy = messages.contact.form;

  return (
    <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-end">
      <p role={status === "error" ? "alert" : "status"} className="text-sm text-ink sm:text-right">
        {status === "error" ? copy.error : null}
        {status === "success" ? copy.success : null}
      </p>

      <SubmitButton status={status} />
    </div>
  );
}
