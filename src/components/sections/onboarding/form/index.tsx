"use client";

import { MotionConfig } from "motion/react";

import { FormNavigation } from "@/components/sections/onboarding/form/form-navigation";
import { FormStepper } from "@/components/sections/onboarding/form/form-stepper";
import { StepTransition } from "@/components/sections/onboarding/form/step-transition";
import { ONBOARDING_STEPS } from "@/components/sections/onboarding/steps";
import { Success } from "@/components/sections/onboarding/form/success";
import { useOnboardingForm } from "@/components/sections/onboarding/form/use-onboarding-form";

export function OnboardingForm() {
  const {
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
  } = useOnboardingForm(ONBOARDING_STEPS.length);

  const CurrentStep = ONBOARDING_STEPS[step - 1];

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full rounded-lg border border-border bg-paper/80 p-6 backdrop-blur-sm sm:p-8">
        {status === "success" ? (
          <Success />
        ) : (
          <div className="flex flex-col gap-8">
            <FormStepper step={step} onStepChange={goTo} />

            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-8">
              <StepTransition step={step} direction={direction}>
                <CurrentStep
                  data={data}
                  errors={errors}
                  setField={setField}
                  toggleNeed={toggleNeed}
                />
              </StepTransition>

              <FormNavigation
                canGoBack={step > 1}
                isLastStep={isLastStep}
                status={status}
                onBack={() => goTo(step - 1)}
              />
            </form>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
