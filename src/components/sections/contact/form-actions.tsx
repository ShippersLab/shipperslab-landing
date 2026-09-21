"use client";

import type { ContactStatus } from "@/components/sections/contact/use-contact-form";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";
import { buildWhatsAppUrl } from "@/lib/contact/message";
import { site } from "@/lib/site";

type FormActionsProps = {
  status: ContactStatus;
};

export function FormActions({ status }: FormActionsProps) {
  const { messages } = useI18n();
  const copy = messages.contact.form;
  const whatsappUrl = buildWhatsAppUrl(site.whatsappNumber, copy.whatsappMessage);
  const sending = status === "sending";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <TextureButton
          type="submit"
          variant="primary"
          size="pill"
          className="w-auto"
          disabled={sending}
        >
          {sending ? copy.sending : copy.submit}
        </TextureButton>

        {whatsappUrl ? (
          <TextureButton asChild variant="secondary" size="pill" className="w-auto">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              {copy.whatsapp}
            </a>
          </TextureButton>
        ) : null}
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
