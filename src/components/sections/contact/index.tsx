"use client";

import { FormActions } from "@/components/sections/contact/form-actions";
import { useContactForm } from "@/components/sections/contact/use-contact-form";
import { Reveal } from "@/components/ui/animation/reveal";
import { TextAreaField, TextField } from "@/components/ui/form/text-field";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/i18n/provider";

const TITLE_DELAY = 0;
const DESCRIPTION_DELAY = 0.1;
const FIELDS_DELAY = 0.2;
const FIELD_STAGGER = 0.08;

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
          titleDelay={TITLE_DELAY}
          descriptionDelay={DESCRIPTION_DELAY}
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Reveal delay={FIELDS_DELAY * 1000} className="grid gap-5 sm:grid-cols-2">
            <TextField
              label={messages.contact.form.name}
              required
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder={messages.contact.form.namePlaceholder}
            />

            <TextField
              label={messages.contact.form.company}
              name="company"
              autoComplete="organization"
              value={form.company}
              onChange={handleChange("company")}
              placeholder={messages.contact.form.companyPlaceholder}
            />
          </Reveal>

          <Reveal delay={(FIELDS_DELAY + FIELD_STAGGER) * 1000}>
            <TextField
              label={messages.contact.form.contactMethod}
              required
              name="contactMethod"
              autoComplete="email"
              value={form.contactMethod}
              onChange={handleChange("contactMethod")}
              placeholder={messages.contact.form.contactMethodPlaceholder}
            />
          </Reveal>

          <Reveal delay={(FIELDS_DELAY + FIELD_STAGGER * 2) * 1000}>
            <TextAreaField
              label={messages.contact.form.message}
              required
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange("message")}
              placeholder={messages.contact.form.messagePlaceholder}
            />
          </Reveal>

          <Reveal delay={(FIELDS_DELAY + FIELD_STAGGER * 3) * 1000}>
            <FormActions status={status} />
          </Reveal>
        </form>
      </div>
    </Section>
  );
}
