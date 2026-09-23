"use client";

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

import { FieldError } from "@/components/ui/form/field-error";
import { cn } from "@/lib/utils";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors duration-200 aria-invalid:border-accent";

const LABEL_CLASS = "flex flex-col gap-2 text-sm text-ink";

function useFieldError(error?: string) {
  const errorId = useId();

  return {
    errorId,
    invalidProps: {
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
    },
  };
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, className, ...props }: TextFieldProps) {
  const { errorId, invalidProps } = useFieldError(error);

  return (
    <label className={LABEL_CLASS}>
      {label}
      <input className={cn(FIELD_CLASS, className)} {...invalidProps} {...props} />
      <FieldError id={errorId} message={error} />
    </label>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextAreaField({ label, error, className, ...props }: TextAreaFieldProps) {
  const { errorId, invalidProps } = useFieldError(error);

  return (
    <label className={LABEL_CLASS}>
      {label}
      <textarea
        className={cn(FIELD_CLASS, "resize-none", className)}
        {...invalidProps}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
}
