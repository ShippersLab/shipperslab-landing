"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
} from "react";

import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type StepState = "active" | "completed" | "inactive";

type StepperContextValue = {
  activeStep: number;
  onStepChange: (step: number) => void;
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  disabled: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const StepperContext = createContext<StepperContextValue | null>(null);
const StepItemContext = createContext<StepItemContextValue | null>(null);

function useStepper() {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }

  return context;
}

function useStepItem() {
  const context = useContext(StepItemContext);

  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }

  return context;
}

function resolveState(step: number, activeStep: number): StepState {
  if (step < activeStep) {
    return "completed";
  }

  return step === activeStep ? "active" : "inactive";
}

type StepperProps = HTMLAttributes<HTMLOListElement> & {
  value: number;
  onValueChange: (step: number) => void;
};

export function Stepper({ value, onValueChange, className, ...props }: StepperProps) {
  return (
    <StepperContext value={{ activeStep: value, onStepChange: onValueChange }}>
      <ol className={cn("flex w-full items-center", className)} {...props} />
    </StepperContext>
  );
}

type StepperItemProps = LiHTMLAttributes<HTMLLIElement> & {
  step: number;
  disabled?: boolean;
};

export function StepperItem({ step, disabled = false, className, ...props }: StepperItemProps) {
  const { activeStep } = useStepper();
  const state = resolveState(step, activeStep);

  return (
    <StepItemContext value={{ step, state, disabled }}>
      <li
        data-state={state}
        className={cn("group/step flex items-center not-last:flex-1", className)}
        {...props}
      />
    </StepItemContext>
  );
}

export function StepperTrigger({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onStepChange } = useStepper();
  const { step, state, disabled } = useStepItem();

  return (
    <button
      type="button"
      disabled={disabled}
      aria-current={state === "active" ? "step" : undefined}
      onClick={() => onStepChange(step)}
      className={cn(
        "inline-flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted/60 disabled:cursor-default",
        className,
      )}
      {...props}
    />
  );
}

export function StepperIndicator({ className }: { className?: string }) {
  const { step, state } = useStepItem();
  const completed = state === "completed";

  return (
    <span
      className={cn(
        "relative flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-paper font-mono text-label text-muted transition-colors duration-200",
        "group-data-[state=active]/step:border-muted/60 group-data-[state=active]/step:text-ink",
        "group-data-[state=completed]/step:border-accent group-data-[state=completed]/step:bg-accent group-data-[state=completed]/step:text-paper",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={completed ? "check" : "number"}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.18, ease: EASE }}
          className="flex"
        >
          {completed ? <CheckIcon size={14} aria-hidden="true" /> : step}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function StepperTitle({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-sm text-muted transition-colors duration-200 group-data-[state=active]/step:text-ink group-data-[state=completed]/step:text-ink",
        className,
      )}
      {...props}
    />
  );
}

export function StepperSeparator({ className }: { className?: string }) {
  const { state } = useStepItem();

  return (
    <span
      aria-hidden="true"
      className={cn("relative mx-3 h-px flex-1 overflow-hidden bg-border", className)}
    >
      <motion.span
        className="absolute inset-0 origin-left bg-accent"
        initial={false}
        animate={{ scaleX: state === "completed" ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </span>
  );
}
