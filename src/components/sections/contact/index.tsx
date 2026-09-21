"use client";

import { FormActions } from "@/components/sections/contact/form-actions";
import { useContactForm } from "@/components/sections/contact/use-contact-form";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors duration-200";

export function Contact() {
  const { messages } = useI18n();
  const { form, status, handleChange, handleSubmit } = useContactForm();

  return (
    <Section id="contacto" bordered>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <SectionHeading
          title={messages.contact.title}
          description={messages.contact.description}
          className="max-w-sm"
        />

        <Reveal delay={100}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-ink">
                {messages.contact.form.name}
                <input
                  required
                  name="name"
                  autoComplete="name"
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
                  autoComplete="organization"
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
                autoComplete="email"
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

            <FormActions status={status} form={form} />
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
