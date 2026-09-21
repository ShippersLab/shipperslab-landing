"use client";

import { useRef, type ReactNode, type RefCallback } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            delay: delay / 1000,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [delay] },
  );

  const setRef: RefCallback<HTMLDivElement | HTMLLIElement> = (node) => {
    ref.current = node;
  };

  if (as === "li") {
    return (
      <li ref={setRef} className={className}>
        {children}
      </li>
    );
  }

  return (
    <div ref={setRef} className={className}>
      {children}
    </div>
  );
}
