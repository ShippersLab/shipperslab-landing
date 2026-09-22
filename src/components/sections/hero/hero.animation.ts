import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { revealWords } from "@/lib/text-reveal";

const IMAGE_DURATION = 0.6;

export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = scope.current?.querySelector<HTMLElement>(".hero-title");
        const description = scope.current?.querySelector<HTMLElement>(".hero-description");

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.fromTo(
          ".hero-image",
          { autoAlpha: 0, filter: "blur(24px)" },
          { autoAlpha: 1, filter: "blur(0px)", duration: IMAGE_DURATION },
        );

        if (title) {
          revealWords(title, { timeline: tl, position: `-=${IMAGE_DURATION * 0.5}` });
        }

        if (description) {
          revealWords(description, { timeline: tl, position: "-=0.15" });
        }

        tl.fromTo(
          ".hero-ctas",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.3 },
          "-=0.1",
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
