"use client";

import { useState, type FormEvent } from "react";

import { useI18n } from "@/i18n/provider";
import { TextureButton } from "@/components/ui/texture-button";
import { Reveal } from "@/components/ui/reveal";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors duration-200";

const CONTACT_EMAIL = "hola@shipperslab.tech";

export function Contact() {
  const { messages } = useI18n();
  const [form, setForm] = useState({ name: "", company: "", contactMethod: "", message: "" });

  function handleChange(field: keyof typeof form) {
    return (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.currentTarget.value }));
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = [
      `${messages.contact.form.name}: ${form.name}`,
      `${messages.contact.form.company}: ${form.company}`,
      `${messages.contact.form.contactMethod}: ${form.contactMethod}`,
      "",
      form.message,
    ].join("\n");

    const subject = `${messages.contact.form.company}: ${form.company || form.name}`.trim();
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <section id="contacto" className="border-t border-border py-16 sm:py-24 md:py-section">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="max-w-sm text-3xl sm:text-4xl">{messages.contact.title}</h2>
            <p className="mt-5 max-w-sm text-base text-muted sm:text-lg">
              {messages.contact.description}
            </p>
            <p className="mt-8 text-sm text-muted">{messages.contact.support}</p>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-ink">
                  {messages.contact.form.name}
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder={messages.contact.form.namePlaceholder}
                    className={FIELD_CLASS}
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm text-ink">
                  {messages.contact.form.company}
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange("company")}
                    placeholder={messages.contact.form.companyPlaceholder}
                    className={FIELD_CLASS}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-ink">
                {messages.contact.form.contactMethod}
                <input
                  required
                  name="contactMethod"
                  value={form.contactMethod}
                  onChange={handleChange("contactMethod")}
                  placeholder={messages.contact.form.contactMethodPlaceholder}
                  className={FIELD_CLASS}
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-ink">
                {messages.contact.form.message}
                <textarea
                  required
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder={messages.contact.form.messagePlaceholder}
                  className={`${FIELD_CLASS} resize-none`}
                />
              </label>

              <TextureButton type="submit" variant="primary" size="pill" className="w-auto">
                {messages.contact.form.submit}
              </TextureButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
