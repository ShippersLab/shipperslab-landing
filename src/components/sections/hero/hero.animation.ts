import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

export const HERO_TITLE_DELAY = 0.25;
const DESCRIPTION_DURATION = 0.3;
const DESCRIPTION_START = HERO_TITLE_DELAY + 0.05;

export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.fromTo(
          ".hero-description",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: DESCRIPTION_DURATION },
          DESCRIPTION_START,
        );

        tl.addLabel("description", "<");

        tl.fromTo(
          ".hero-ctas",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: DESCRIPTION_DURATION },
          "description+=0.05",
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-description, .hero-ctas", {
          autoAlpha: 1,
        });
      });

      return () => mm.revert();
    },
    { scope },
  );
}
