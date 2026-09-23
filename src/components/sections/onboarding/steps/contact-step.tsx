"use client";

import { TextField } from "@/components/ui/form/text-field";
import type { StepProps } from "@/components/sections/onboarding/steps/types";
import { useI18n } from "@/i18n/provider";

export function ContactStep({ data, errors, setField }: StepProps) {
  const { messages } = useI18n();
  const copy = messages.onboarding.fields;
  const errorCopy = messages.onboarding.errors;

  return (
    <div className="flex flex-col gap-5">
      <TextField
        required
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        label={copy.email}
        placeholder={copy.emailPlaceholder}
        value={data.email}
        error={errors.email && errorCopy[errors.email]}
        onChange={(event) => setField("email", event.currentTarget.value)}
      />
      <TextField
        type="tel"
        name="whatsapp"
        autoComplete="tel"
        inputMode="tel"
        label={copy.whatsapp}
        placeholder={copy.whatsappPlaceholder}
        value={data.whatsapp}
        error={errors.whatsapp && errorCopy[errors.whatsapp]}
        onChange={(event) => setField("whatsapp", event.currentTarget.value)}
      />
    </div>
  );
}
