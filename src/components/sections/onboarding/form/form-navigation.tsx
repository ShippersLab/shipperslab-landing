"use client";

import type { OnboardingStatus } from "@/components/sections/onboarding/form/use-onboarding-form";
import { ArrowRightIcon, RefreshIcon } from "@/components/ui/icons";
import { TextureButton } from "@/components/ui/texture-button";
import { useI18n } from "@/i18n/provider";

type FormNavigationProps = {
  canGoBack: boolean;
  isLastStep: boolean;
  status: OnboardingStatus;
  onBack: () => void;
};

export function FormNavigation({ canGoBack, isLastStep, status, onBack }: FormNavigationProps) {
  const { messages } = useI18n();
  const copy = messages.onboarding;
  const sending = status === "sending";

  const label = sending
    ? copy.actions.sending
    : isLastStep
      ? copy.actions.submit
      : copy.actions.next;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 text-sm text-muted transition-colors duration-200 hover:text-ink sm:px-0 sm:text-base"
          >
            {copy.actions.back}
          </button>
        ) : (
          <span aria-hidden="true" />
        )}

        <TextureButton
          type="submit"
          variant="primary"
          size="pill"
          disabled={sending}
          className="w-full min-w-33 rounded-full sm:w-auto"
        >
          <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
            {sending ? <RefreshIcon size={16} className="animate-spin" /> : null}
            {label}
            {!isLastStep ? <ArrowRightIcon size={16} /> : null}
          </span>
        </TextureButton>
      </div>

      <p role="status" aria-live="polite" className="text-sm text-ink empty:hidden">
        {status === "error" ? copy.error : null}
      </p>
    </div>
  );
}
