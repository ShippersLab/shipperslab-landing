"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const READING_BAND_MARGIN = "0px 0px -70% 0px";
const RELEASE_EVENTS = ["wheel", "touchstart", "keydown"] as const;

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const lockedRef = useRef(false);
  const releaseRef = useRef<() => void>(() => {});
  const idsKey = ids.join("|");

  const select = useCallback((id: string) => {
    releaseRef.current();
    setActiveId(id);

    if (!("onscrollend" in window)) {
      return;
    }

    lockedRef.current = true;

    function release() {
      lockedRef.current = false;
      window.removeEventListener("scrollend", release);
      RELEASE_EVENTS.forEach((name) => window.removeEventListener(name, release));
      releaseRef.current = () => {};
    }

    releaseRef.current = release;
    window.addEventListener("scrollend", release, { once: true });
    RELEASE_EVENTS.forEach((name) =>
      window.addEventListener(name, release, { once: true, passive: true }),
    );
  }, []);

  useEffect(() => {
    const sectionIds = idsKey.split("|");
    const inBand = new Set<string>();
    let footerVisible = false;

    function resolve() {
      if (lockedRef.current) {
        return;
      }
      if (footerVisible) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }
      const current = sectionIds.filter((id) => inBand.has(id)).pop();
      if (current) {
        setActiveId(current);
      }
    }

    const bandObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inBand.add(entry.target.id);
          } else {
            inBand.delete(entry.target.id);
          }
        });
        resolve();
      },
      { rootMargin: READING_BAND_MARGIN },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        bandObserver.observe(element);
      }
    });

    const footer = document.querySelector("footer");
    const footerObserver = new IntersectionObserver((entries) => {
      footerVisible = entries.some((entry) => entry.isIntersecting);
      resolve();
    });
    if (footer) {
      footerObserver.observe(footer);
    }

    const releaseOnLock = () => {
      releaseRef.current();
      resolve();
    };
    window.addEventListener("scrollend", releaseOnLock);

    return () => {
      bandObserver.disconnect();
      footerObserver.disconnect();
      window.removeEventListener("scrollend", releaseOnLock);
      releaseRef.current();
    };
  }, [idsKey]);

  return { activeId, select };
}
