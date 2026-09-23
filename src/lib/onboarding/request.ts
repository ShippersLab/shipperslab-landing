import { findFirstInvalidStep } from "@/lib/onboarding/validation";
import { isRecord, readString, readStringList } from "@/lib/payload";

export const ONBOARDING_NEEDS = ["software", "automation", "ai", "products", "unsure"] as const;
export const ONBOARDING_STAGES = ["idea", "existing"] as const;

export type OnboardingNeed = (typeof ONBOARDING_NEEDS)[number];
export type OnboardingStage = (typeof ONBOARDING_STAGES)[number];

export type OnboardingRequest = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  needs: OnboardingNeed[];
  stage: OnboardingStage | "";
  message: string;
};

export const EMPTY_ONBOARDING_REQUEST: OnboardingRequest = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  needs: [],
  stage: "",
  message: "",
};

const MAX_SHORT_FIELD = 200;
const MAX_MESSAGE = 5000;

function isNeed(value: string): value is OnboardingNeed {
  return (ONBOARDING_NEEDS as readonly string[]).includes(value);
}

function isStage(value: string): value is OnboardingStage {
  return (ONBOARDING_STAGES as readonly string[]).includes(value);
}

export function parseOnboardingRequest(payload: unknown): OnboardingRequest | null {
  if (!isRecord(payload)) {
    return null;
  }

  const stage = readString(payload, "stage", MAX_SHORT_FIELD);
  const request: OnboardingRequest = {
    name: readString(payload, "name", MAX_SHORT_FIELD),
    company: readString(payload, "company", MAX_SHORT_FIELD),
    email: readString(payload, "email", MAX_SHORT_FIELD),
    whatsapp: readString(payload, "whatsapp", MAX_SHORT_FIELD),
    needs: [...new Set(readStringList(payload, "needs").filter(isNeed))],
    stage: isStage(stage) ? stage : "",
    message: readString(payload, "message", MAX_MESSAGE),
  };

  return findFirstInvalidStep(request) ? null : request;
}
