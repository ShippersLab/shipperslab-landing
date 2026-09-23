"use client";

import { ChoiceGroup } from "@/components/ui/form/choice-group";
import { TextAreaField } from "@/components/ui/form/text-field";
import type { StepProps } from "@/components/sections/onboarding/steps/types";
import { useI18n } from "@/i18n/provider";
import { ONBOARDING_NEEDS, ONBOARDING_STAGES } from "@/lib/onboarding/request";

export function ProjectStep({ data, errors, setField, toggleNeed }: StepProps) {
  const { messages } = useI18n();
  const copy = messages.onboarding;

  return (
    <div className="flex flex-col gap-6">
      <ChoiceGroup
        type="checkbox"
        name="needs"
        legend={copy.fields.needs}
        options={ONBOARDING_NEEDS.map((value) => ({ value, label: copy.needs[value] }))}
        isSelected={(value) => data.needs.includes(value)}
        onSelect={toggleNeed}
      />
      <ChoiceGroup
        type="radio"
        name="stage"
        legend={copy.fields.stage}
        options={ONBOARDING_STAGES.map((value) => ({ value, label: copy.stages[value] }))}
        isSelected={(value) => data.stage === value}
        onSelect={(value) => setField("stage", value)}
      />
      <TextAreaField
        required
        name="message"
        rows={4}
        label={copy.fields.message}
        placeholder={copy.fields.messagePlaceholder}
        value={data.message}
        error={errors.message && copy.errors[errors.message]}
        onChange={(event) => setField("message", event.currentTarget.value)}
      />
    </div>
  );
}
