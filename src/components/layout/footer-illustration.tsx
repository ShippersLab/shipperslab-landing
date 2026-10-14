"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n/provider";

const HIDDEN = { opacity: 0, filter: "blur(12px)" };
const VISIBLE = { opacity: 1, filter: "blur(0px)" };

export function FooterIllustration() {
  const { messages } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const visible = (hydrated && prefersReducedMotion) || (isInView && loaded);

  return (
    <motion.div
      ref={ref}
      initial={HIDDEN}
      animate={visible ? VISIBLE : HIDDEN}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      className="pointer-events-none -mx-4 mt-8 select-none sm:mt-12"
    >
      <Image
        src="/images/footer-illustration.webp"
        alt={messages.footer.illustrationAlt}
        width={3000}
        height={990}
        sizes="100vw"
        quality={90}
        onLoad={() => setLoaded(true)}
        className="h-auto w-full"
      />
    </motion.div>
  );
}
