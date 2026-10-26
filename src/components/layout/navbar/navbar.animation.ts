import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/animation/gsap";

const HOME_DELAY = 0.25;

export function useNavbarAnimation(scope: RefObject<HTMLElement | null>, isHome: boolean) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          scope.current,
          { autoAlpha: 0, filter: "blur(16px)" },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.6,
            delay: isHome ? HOME_DELAY : 0,
            ease: "power3.out",
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(scope.current, { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [isHome] },
  );
}
