"use client";

import type { OnboardingStatus } from "@/components/sections/onboarding/form/use-onboarding-form";
import { TextureButton } from "@/components/ui/button/texture-button";
import { ArrowUpRightIcon, CalendarIcon, RefreshIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/provider";
import { site } from "@/lib/site";

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
    <div className="flex flex-col">
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="rounded-sm px-4 py-2.5 text-sm text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-0 sm:text-base"
          >
            {copy.actions.back}
          </button>
        ) : (
          <span aria-hidden="true" />
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={site.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm text-ink transition-colors duration-200 ease-out hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-0 sm:text-base"
          >
            <CalendarIcon size={16} />
            {copy.actions.call}
            <ArrowUpRightIcon size={16} />
          </a>

          <TextureButton
            type="submit"
            variant="primary"
            size="square"
            disabled={sending}
            className="w-full sm:w-auto sm:min-w-44"
          >
            <span className="flex items-center gap-2">
              {sending ? <RefreshIcon size={16} className="animate-spin" /> : null}
              {label}
            </span>
          </TextureButton>
        </div>
      </div>

      <p role="alert" className="mt-4 text-sm text-ink empty:mt-0">
        {status === "error" ? copy.error : null}
      </p>
    </div>
  );
}
