"use client";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useI18n } from "@/i18n/provider";

type FormStepperProps = {
  step: number;
  onStepChange: (step: number) => void;
};

export function FormStepper({ step, onStepChange }: FormStepperProps) {
  const { messages } = useI18n();
  const titles = messages.onboarding.steps;

  return (
    <nav aria-label={messages.onboarding.stepsLabel}>
      <Stepper value={step} onValueChange={onStepChange}>
        {titles.map((title, index) => {
          const itemStep = index + 1;

          return (
            <StepperItem key={title} step={itemStep} disabled={itemStep >= step}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle className="hidden sm:inline">{title}</StepperTitle>
              </StepperTrigger>
              {itemStep < titles.length ? <StepperSeparator /> : null}
            </StepperItem>
          );
        })}
      </Stepper>
    </nav>
  );
}
