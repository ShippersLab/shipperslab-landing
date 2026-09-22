import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

export function useBuildIn(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) return;

        const dots = root.querySelectorAll<HTMLElement>(".build-dot");
        const bars = root.querySelectorAll<HTMLElement>(".build-bar");
        const pops = root.querySelectorAll<HTMLElement>(".build-pop");

        const scrollTrigger = { trigger: root, start: "top 85%", once: true };
        const tl = gsap.timeline({ scrollTrigger, defaults: { ease: "power3.out" } });

        if (dots.length) {
          tl.from(dots, { autoAlpha: 0, scale: 0.4, stagger: 0.06, duration: 0.35 });
        }
        if (bars.length) {
          tl.from(
            bars,
            {
              autoAlpha: 0,
              scaleX: 0,
              transformOrigin: "left center",
              stagger: 0.1,
              duration: 0.45,
            },
            tl.duration() ? "-=0.1" : undefined,
          );
        }
        if (pops.length) {
          tl.from(
            pops,
            { autoAlpha: 0, scale: 0.7, stagger: 0.1, duration: 0.35 },
            tl.duration() ? "-=0.3" : undefined,
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".build-dot, .build-bar, .build-pop", { autoAlpha: 1, scale: 1, scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope },
  );
}
