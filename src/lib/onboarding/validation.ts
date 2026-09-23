import type { OnboardingRequest } from "@/lib/onboarding/request";

export type OnboardingField = "name" | "email" | "whatsapp" | "message";

export type OnboardingError =
  | "nameRequired"
  | "emailRequired"
  | "emailInvalid"
  | "whatsappInvalid"
  | "messageRequired";

export type OnboardingErrors = Partial<Record<OnboardingField, OnboardingError>>;

const STEP_FIELDS: OnboardingField[][] = [["name"], ["email", "whatsapp"], ["message"]];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;
const MIN_PHONE_DIGITS = 8;
const MAX_PHONE_DIGITS = 15;

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "").length;
  return PHONE_PATTERN.test(value) && digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS;
}

export function validateField(
  field: OnboardingField,
  data: OnboardingRequest,
): OnboardingError | undefined {
  const value = data[field].trim();

  switch (field) {
    case "name":
      return value ? undefined : "nameRequired";
    case "email":
      if (!value) {
        return "emailRequired";
      }
      return EMAIL_PATTERN.test(value) ? undefined : "emailInvalid";
    case "whatsapp":
      return !value || isValidPhone(value) ? undefined : "whatsappInvalid";
    case "message":
      return value ? undefined : "messageRequired";
  }
}

export function validateStep(step: number, data: OnboardingRequest) {
  const errors: OnboardingErrors = {};

  for (const field of STEP_FIELDS[step - 1] ?? []) {
    const error = validateField(field, data);

    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

export function findFirstInvalidStep(data: OnboardingRequest, untilStep = STEP_FIELDS.length) {
  for (let step = 1; step <= untilStep; step++) {
    const errors = validateStep(step, data);

    if (Object.keys(errors).length > 0) {
      return { step, errors };
    }
  }

  return null;
}
