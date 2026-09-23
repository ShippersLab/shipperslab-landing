"use client";

import { TextField } from "@/components/ui/form/text-field";
import type { StepProps } from "@/components/sections/onboarding/steps/types";
import { useI18n } from "@/i18n/provider";

export function AboutStep({ data, errors, setField }: StepProps) {
  const { messages } = useI18n();
  const copy = messages.onboarding.fields;
  const errorCopy = messages.onboarding.errors;

  return (
    <div className="flex flex-col gap-5">
      <TextField
        required
        name="name"
        autoComplete="name"
        label={copy.name}
        placeholder={copy.namePlaceholder}
        value={data.name}
        error={errors.name && errorCopy[errors.name]}
        onChange={(event) => setField("name", event.currentTarget.value)}
      />
      <TextField
        name="company"
        autoComplete="organization"
        label={copy.company}
        placeholder={copy.companyPlaceholder}
        value={data.company}
        onChange={(event) => setField("company", event.currentTarget.value)}
      />
    </div>
  );
}
