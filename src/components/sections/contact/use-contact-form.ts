import { useState, type ChangeEvent, type SubmitEvent } from "react";

import { useI18n } from "@/i18n/provider";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  isEmailContact,
  type ContactMessage,
} from "@/lib/contact/message";
import { site } from "@/lib/site";

export type ContactStatus = "idle" | "sending" | "success" | "error";

const EMPTY_FORM: ContactMessage = {
  name: "",
  company: "",
  contactMethod: "",
  message: "",
};

export function useContactForm() {
  const { messages } = useI18n();
  const [form, setForm] = useState<ContactMessage>(EMPTY_FORM);
  const [status, setStatus] = useState<ContactStatus>("idle");

  function handleChange(field: keyof ContactMessage) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.currentTarget.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isEmailContact(form.contactMethod)) {
      const whatsappUrl = buildWhatsAppUrl(
        site.whatsappNumber,
        buildWhatsAppMessage(form, messages.contact.form),
      );

      if (whatsappUrl) {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setForm(EMPTY_FORM);
        setStatus("success");
        return;
      }
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Contact request failed with status ${response.status}`);
      }

      setForm(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return { form, status, handleChange, handleSubmit };
}
