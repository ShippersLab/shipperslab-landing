"use client";

import { AnimatePresence, motion } from "motion/react";

import { AlertIcon } from "@/components/ui/icons";

type FieldErrorProps = {
  id: string;
  message?: string;
};

export function FieldError({ id, message }: FieldErrorProps) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          id={id}
          key={message}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-1.5 text-sm text-accent"
        >
          <AlertIcon size={14} aria-hidden="true" className="shrink-0" />
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
