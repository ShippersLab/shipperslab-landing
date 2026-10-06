"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({ anchors: true });

    lenis.on("scroll", ScrollTrigger.update);

    function tick(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const target = window.location.hash ? document.querySelector(window.location.hash) : null;
    if (target instanceof HTMLElement) {
      lenis.scrollTo(target, { immediate: true });
    }

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
