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
  const copy = messages.onboarding;
  const titles = copy.steps;

  function stepLabel(title: string, itemStep: number) {
    const label = copy.stepLabel
      .replace("{title}", title)
      .replace("{step}", String(itemStep))
      .replace("{total}", String(titles.length));

    return itemStep < step ? `${label}, ${copy.stepCompleted}` : label;
  }

  return (
    <nav aria-label={copy.stepsLabel}>
      <Stepper value={step} onValueChange={onStepChange}>
        {titles.map((title, index) => {
          const itemStep = index + 1;

          return (
            <StepperItem key={title} step={itemStep} disabled={itemStep >= step}>
              <StepperTrigger aria-label={stepLabel(title, itemStep)}>
                <StepperIndicator />
                <StepperTitle className="sr-only sm:not-sr-only">{title}</StepperTitle>
              </StepperTrigger>
              {itemStep < titles.length ? <StepperSeparator /> : null}
            </StepperItem>
          );
        })}
      </Stepper>
    </nav>
  );
}
