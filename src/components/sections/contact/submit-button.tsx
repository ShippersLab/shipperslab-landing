"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { ContactStatus } from "@/components/sections/contact/use-contact-form";
import { CheckIcon, RefreshIcon } from "@/components/ui/icons";
import { TextureButton } from "@/components/ui/texture-button";
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
      size="pill"
      className="w-full min-w-33 rounded-full sm:w-auto hover:opacity-80"
      disabled={sending}
    >
      {reducedMotion ? (
        <span className="flex items-center justify-center gap-2 text-sm sm:text-base">{inner}</span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {inner}
          </motion.span>
        </AnimatePresence>
      )}
    </TextureButton>
  );
}
