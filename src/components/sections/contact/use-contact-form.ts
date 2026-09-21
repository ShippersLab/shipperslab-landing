import { useState, type ChangeEvent, type SubmitEvent } from "react";

import type { ContactMessage } from "@/lib/contact/message";

export type ContactStatus = "idle" | "sending" | "success" | "error";

const EMPTY_FORM: ContactMessage = {
  name: "",
  company: "",
  contactMethod: "",
  message: "",
};

export function useContactForm() {
  const [form, setForm] = useState<ContactMessage>(EMPTY_FORM);
  const [status, setStatus] = useState<ContactStatus>("idle");

  function handleChange(field: keyof ContactMessage) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.currentTarget.value }));
    };
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
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
