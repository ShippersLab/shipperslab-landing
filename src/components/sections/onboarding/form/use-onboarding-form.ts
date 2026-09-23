import { useState, type SubmitEvent } from "react";

import {
  EMPTY_ONBOARDING_REQUEST,
  type OnboardingNeed,
  type OnboardingRequest,
} from "@/lib/onboarding/request";
import {
  findFirstInvalidStep,
  validateField,
  type OnboardingErrors,
  type OnboardingField,
} from "@/lib/onboarding/validation";

export type OnboardingStatus = "idle" | "sending" | "success" | "error";

type InvalidStep = NonNullable<ReturnType<typeof findFirstInvalidStep>>;

export type SetField = <K extends keyof OnboardingRequest>(
  field: K,
  value: OnboardingRequest[K],
) => void;

function isFieldWithError(field: string, errors: OnboardingErrors): field is OnboardingField {
  return field in errors;
}

function focusField(form: HTMLFormElement, field: string) {
  const element = form.elements.namedItem(field);

  if (element instanceof HTMLElement) {
    element.focus();
  }
}

export function useOnboardingForm(stepCount: number) {
  const [data, setData] = useState<OnboardingRequest>(EMPTY_ONBOARDING_REQUEST);
  const [errors, setErrors] = useState<OnboardingErrors>({});
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [status, setStatus] = useState<OnboardingStatus>("idle");

  const isLastStep = step === stepCount;

  const setField: SetField = (field, value) => {
    const next = { ...data, [field]: value };
    setData(next);

    if (isFieldWithError(field, errors)) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }));
    }
  };

  function toggleNeed(need: OnboardingNeed) {
    setData((prev) => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter((entry) => entry !== need)
        : [...prev.needs, need],
    }));
  }

  function moveTo(target: number) {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  }

  function showErrors(invalid: InvalidStep, form?: HTMLFormElement) {
    setErrors(invalid.errors);

    if (invalid.step !== step) {
      moveTo(invalid.step);
    } else if (form) {
      focusField(form, Object.keys(invalid.errors)[0]);
    }
  }

  function goTo(target: number, form?: HTMLFormElement) {
    if (target < 1 || target > stepCount || target === step) {
      return;
    }

    const invalid = target > step ? findFirstInvalidStep(data, target - 1) : null;

    if (invalid) {
      showErrors(invalid, form);
      return;
    }

    moveTo(target);
  }

  async function submit() {
    setStatus("sending");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Onboarding request failed with status ${response.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    if (!isLastStep) {
      goTo(step + 1, event.currentTarget);
      return;
    }

    const invalid = findFirstInvalidStep(data);

    if (invalid) {
      showErrors(invalid, event.currentTarget);
      return;
    }

    void submit();
  }

  return {
    data,
    errors,
    step,
    direction,
    status,
    isLastStep,
    setField,
    toggleNeed,
    goTo,
    handleSubmit,
  };
}
