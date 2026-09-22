"use client";

import { useRef, type ReactNode } from "react";

import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";

declare global {
  interface Window {
    __initialHash?: string;
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollSmoother.get()?.kill();

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: "#smooth-content",
        smooth: 1.1,
        normalizeScroll: true,
      });

      ScrollTrigger.refresh();

      const scrollToHash = () => {
        const hash = window.__initialHash;
        if (!hash) return;

        const target = document.querySelector(hash);
        if (!target) return;

        ScrollTrigger.refresh();
        smoother.scrollTo(target, false, "top top");
        history.replaceState(null, "", hash);
      };

      if (document.readyState === "complete") {
        scrollToHash();
      } else {
        window.addEventListener("load", scrollToHash, { once: true });
      }

      const handleAnchorClick = (event: MouseEvent) => {
        const anchor = (event.target as HTMLElement).closest("a");
        if (!(anchor instanceof HTMLAnchorElement)) return;

        const url = new URL(anchor.href);
        if (url.pathname !== window.location.pathname || !url.hash) return;

        const target = document.querySelector(url.hash);
        if (!target) return;

        event.preventDefault();
        smoother.scrollTo(target, true, "top top");
        history.pushState(null, "", url.hash);
      };

      document.addEventListener("click", handleAnchorClick);

      return () => {
        window.removeEventListener("load", scrollToHash);
        document.removeEventListener("click", handleAnchorClick);
        smoother.kill();
      };
    });

    return () => mm.revert();
  });

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div id="smooth-content" className="relative flex min-h-screen flex-col bg-paper px-4 pt-4">
        {children}
      </div>
    </div>
  );
}
