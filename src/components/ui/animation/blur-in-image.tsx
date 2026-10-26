"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const HIDDEN = { opacity: 0, filter: "blur(12px)" };
const VISIBLE = { opacity: 1, filter: "blur(0px)" };

type BlurInImageProps = ImageProps & {
  wrapperClassName?: string;
};

export function BlurInImage({ wrapperClassName, onLoad, ...props }: BlurInImageProps) {
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
      className={wrapperClassName}
    >
      <Image
        {...props}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </motion.div>
  );
}
