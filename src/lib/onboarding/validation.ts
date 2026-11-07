import type { OnboardingRequest } from "@/lib/onboarding/request";

export type OnboardingField = "name" | "email" | "whatsapp" | "message";

export type OnboardingError =
  | "nameRequired"
  | "nameInvalid"
  | "emailRequired"
  | "emailInvalid"
  | "whatsappInvalid"
  | "messageRequired"
  | "messageTooShort"
  | "messageInvalid";

export type OnboardingErrors = Partial<Record<OnboardingField, OnboardingError>>;

export const EMAIL_STEP = 2;

const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 15;
const MIN_MESSAGE_WORDS = 3;
const MIN_MESSAGE_DISTINCT_CHARS = 5;

const STEP_FIELDS: OnboardingField[][] = [["name"], ["email", "whatsapp"], ["message"]];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;
const MIN_PHONE_DIGITS = 8;
const MAX_PHONE_DIGITS = 15;

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "").length;
  return PHONE_PATTERN.test(value) && digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS;
}

function hasLetters(value: string) {
  return /\p{L}/u.test(value);
}

function isSingleRepeatedChar(value: string) {
  return new Set(value.replace(/\s/g, "").toLowerCase()).size <= 1;
}

function isMeaningfulText(value: string) {
  return hasLetters(value) && !isSingleRepeatedChar(value);
}

function isMeaningfulMessage(value: string) {
  const words = value.split(/\s+/).filter(Boolean).length;
  const distinct = new Set(value.replace(/\s/g, "").toLowerCase()).size;
  return (
    isMeaningfulText(value) && words >= MIN_MESSAGE_WORDS && distinct >= MIN_MESSAGE_DISTINCT_CHARS
  );
}

export function validateField(
  field: OnboardingField,
  data: OnboardingRequest,
): OnboardingError | undefined {
  const value = data[field].trim();

  switch (field) {
    case "name":
      if (!value) {
        return "nameRequired";
      }
      return value.length >= MIN_NAME_LENGTH && isMeaningfulText(value) ? undefined : "nameInvalid";
    case "email":
      if (!value) {
        return "emailRequired";
      }
      return EMAIL_PATTERN.test(value) ? undefined : "emailInvalid";
    case "whatsapp":
      return !value || isValidPhone(value) ? undefined : "whatsappInvalid";
    case "message":
      if (!value) {
        return "messageRequired";
      }
      if (value.length < MIN_MESSAGE_LENGTH) {
        return "messageTooShort";
      }
      return isMeaningfulMessage(value) ? undefined : "messageInvalid";
  }
}

function validateStep(step: number, data: OnboardingRequest) {
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
