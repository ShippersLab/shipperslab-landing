"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { ContactStatus } from "@/components/sections/contact/use-contact-form";
import { TextureButton } from "@/components/ui/button/texture-button";
import { CheckIcon, RefreshIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/provider";

type SubmitButtonProps = {
  status: ContactStatus;
};

export function SubmitButton({ status }: SubmitButtonProps) {
  const { messages } = useI18n();
  const copy = messages.contact.form;
  const reducedMotion = useReducedMotion();
  const sending = status === "sending";

  const label =
    status === "sending"
      ? copy.sending
      : status === "success"
        ? copy.sent
        : status === "error"
          ? copy.retry
          : copy.submit;

  const inner = (
    <>
      {status === "sending" ? <RefreshIcon size={16} className="animate-spin" /> : null}
      {status === "success" ? <CheckIcon size={16} /> : null}
      {label}
    </>
  );

  return (
    <TextureButton
      type="submit"
      variant="primary"
      size="square"
      className="w-full sm:w-auto sm:min-w-44"
      disabled={sending}
    >
      {reducedMotion ? (
        <span className="flex items-center gap-2">{inner}</span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            {inner}
          </motion.span>
        </AnimatePresence>
      )}
    </TextureButton>
  );
}
