import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

export function useNavbarAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          scope.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(scope.current, { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope },
  );
}
