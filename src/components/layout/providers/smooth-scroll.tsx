"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/animation/gsap";

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({ anchors: true, lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function tick(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const navigated = previousPathname.current !== null && previousPathname.current !== pathname;
    previousPathname.current = pathname;
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    const lenis = lenisRef.current;

    if (target instanceof HTMLElement) {
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else target.scrollIntoView();
    } else if (navigated && lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
