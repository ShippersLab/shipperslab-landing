"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { ContactLinks } from "@/components/sections/contact/contact-links";
import { FormActions } from "@/components/sections/contact/form-actions";
import { useContactForm } from "@/components/sections/contact/use-contact-form";
import { TextAreaField, TextField } from "@/components/ui/form/text-field";
import { Section } from "@/components/ui/section/section";
import { useI18n } from "@/i18n/provider";
import { BLUR_EASE, blurItem, staggerGroup } from "@/lib/animation/motion";
import { PUENTE_BLUR_DATA_URL } from "@/lib/images/blur-data";

const FIELD_CLASS = "bg-transparent";
const formGroup = staggerGroup(0.6);

export function Contact() {
  const { messages } = useI18n();
  const { form, status, handleChange, handleSubmit } = useContactForm();
  const reducedMotion = useReducedMotion();
  const copy = messages.contact.form;

  return (
    <Section id="contacto">
      <div className="selection-paper relative isolate overflow-hidden rounded-lg p-3 sm:p-8 lg:p-12">
        <motion.div
          aria-hidden
          initial={reducedMotion ? false : { opacity: 0, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: BLUR_EASE }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src="/images/puente-accent.webp"
            alt=""
            fill
            quality={90}
            loading="lazy"
            placeholder="blur"
            blurDataURL={PUENTE_BLUR_DATA_URL}
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          variants={formGroup}
          initial={reducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-xl px-3 pt-6 sm:px-0 sm:pt-0"
        >
          <motion.h2 variants={blurItem} className="text-4xl text-paper sm:text-5xl">
            {messages.contact.title}
          </motion.h2>
          <motion.p variants={blurItem} className="mt-4 text-base text-paper/85 sm:text-lg">
            {messages.contact.description}
          </motion.p>
        </motion.div>

        <div className="mt-8 rounded-lg bg-paper p-6 sm:mt-10 sm:p-8">
          <motion.form
            onSubmit={handleSubmit}
            variants={formGroup}
            initial={reducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <motion.div variants={blurItem}>
              <TextField
                label={copy.name}
                required
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange("name")}
                placeholder={copy.namePlaceholder}
                className={FIELD_CLASS}
              />
            </motion.div>

            <motion.div variants={blurItem}>
              <TextField
                label={copy.contactMethod}
                required
                name="contactMethod"
                autoComplete="email"
                value={form.contactMethod}
                onChange={handleChange("contactMethod")}
                placeholder={copy.contactMethodPlaceholder}
                className={FIELD_CLASS}
              />
            </motion.div>

            <motion.div variants={blurItem} className="sm:col-span-2">
              <TextAreaField
                label={copy.message}
                required
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange("message")}
                placeholder={copy.messagePlaceholder}
                className={FIELD_CLASS}
              />
            </motion.div>

            <motion.div variants={blurItem} className="sm:col-span-2">
              <FormActions status={status} />
            </motion.div>
          </motion.form>
          <ContactLinks />
        </div>
      </div>
    </Section>
  );
}
