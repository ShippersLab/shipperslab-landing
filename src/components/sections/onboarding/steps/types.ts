import type { SetField } from "@/components/sections/onboarding/form/use-onboarding-form";
import type { OnboardingNeed, OnboardingRequest } from "@/lib/onboarding/request";
import type { OnboardingErrors } from "@/lib/onboarding/validation";

export type StepProps = {
  data: OnboardingRequest;
  errors: OnboardingErrors;
  setField: SetField;
  toggleNeed: (need: OnboardingNeed) => void;
};
