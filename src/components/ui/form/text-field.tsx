"use client";

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

import { FieldError } from "@/components/ui/form/field-error";
import { cn } from "@/lib/utils";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-paper/60 px-4 py-3 text-base text-ink ring-ink/10 outline-hidden transition-[background-color,border-color,box-shadow] duration-200 ease-out placeholder:text-muted hover:border-ink/20 hover:bg-paper focus:border-ink focus:bg-paper focus:ring-2 aria-invalid:border-accent";

const LABEL_CLASS = "group flex flex-col gap-2 text-sm";

const LABEL_TEXT_CLASS =
  "text-muted transition-colors duration-200 ease-out group-focus-within:text-ink group-hover:text-ink";

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
      <span className={LABEL_TEXT_CLASS}>{label}</span>
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
      <span className={LABEL_TEXT_CLASS}>{label}</span>
      <textarea
        className={cn(FIELD_CLASS, "resize-none", className)}
        {...invalidProps}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
}
