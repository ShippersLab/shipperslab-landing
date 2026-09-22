"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis();

    let frame: number;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    function scrollToHash(hash: string, immediate: boolean) {
      const target = document.querySelector(hash);
      if (!(target instanceof HTMLElement)) return;

      lenis.scrollTo(target, { immediate });
    }

    if (window.location.hash) {
      scrollToHash(window.location.hash, true);
    }

    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const url = new URL(anchor.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      event.preventDefault();
      scrollToHash(url.hash, false);
      history.pushState(null, "", url.hash);
    }

    document.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
