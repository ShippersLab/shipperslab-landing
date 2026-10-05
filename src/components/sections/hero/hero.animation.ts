import type { RefObject } from "react";

import { revealWords } from "@/components/sections/hero/text-reveal";
import { gsap, useGSAP } from "@/lib/gsap";

const IMAGE_DURATION = 0.5;
const DESCRIPTION_DURATION = 0.3;

export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = scope.current?.querySelector<HTMLElement>(".hero-title");

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.fromTo(
          ".hero-image",
          { autoAlpha: 0, filter: "blur(10px)" },
          { autoAlpha: 1, filter: "blur(0px)", duration: IMAGE_DURATION },
        );

        if (title) {
          revealWords(title, { timeline: tl, position: 0.1 });
        }

        tl.fromTo(
          ".hero-description",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: DESCRIPTION_DURATION },
          "-=0.2",
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
        gsap.set(".hero-image, .hero-title, .hero-description, .hero-ctas", {
          autoAlpha: 1,
        });
      });

      return () => mm.revert();
    },
    { scope },
  );
}
