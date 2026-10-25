"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const READING_BAND_MARGIN = "0px 0px -70% 0px";
const RELEASE_EVENTS = ["wheel", "touchstart", "keydown"] as const;

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const lockedIdRef = useRef<string | null>(null);
  const inBandRef = useRef(new Set<string>());
  const footerVisibleRef = useRef(false);
  const releaseRef = useRef<() => void>(() => {});
  const idsKey = ids.join("|");

  const select = useCallback(
    (id: string) => {
      releaseRef.current();
      setActiveId(id);

      const lastId = idsKey.split("|").pop();
      const reached = inBandRef.current.has(id) || (footerVisibleRef.current && id === lastId);
      if (reached) {
        return;
      }

      lockedIdRef.current = id;

      function release() {
        lockedIdRef.current = null;
        RELEASE_EVENTS.forEach((name) => window.removeEventListener(name, release));
        releaseRef.current = () => {};
      }

      releaseRef.current = release;
      RELEASE_EVENTS.forEach((name) =>
        window.addEventListener(name, release, { once: true, passive: true }),
      );
    },
    [idsKey],
  );

  useEffect(() => {
    const sectionIds = idsKey.split("|");
    const lastId = sectionIds[sectionIds.length - 1];
    const inBand = inBandRef.current;
    inBand.clear();
    footerVisibleRef.current = false;

    function resolve() {
      const lockedId = lockedIdRef.current;
      if (lockedId) {
        const reached = inBand.has(lockedId) || (footerVisibleRef.current && lockedId === lastId);
        if (!reached) {
          return;
        }
        releaseRef.current();
        setActiveId(lockedId);
        return;
      }
      if (footerVisibleRef.current) {
        setActiveId(lastId);
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
      footerVisibleRef.current = entries.some((entry) => entry.isIntersecting);
      resolve();
    });
    if (footer) {
      footerObserver.observe(footer);
    }

    return () => {
      bandObserver.disconnect();
      footerObserver.disconnect();
      releaseRef.current();
    };
  }, [idsKey]);

  return { activeId, select };
}
