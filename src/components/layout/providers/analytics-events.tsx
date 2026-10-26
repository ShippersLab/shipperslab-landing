"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

const EVENT_BY_HREF = [
  { match: /^https:\/\/(wa\.me|api\.whatsapp\.com)\//, event: "whatsapp_click" },
  { match: /^mailto:/, event: "email_click" },
  { match: /^https:\/\/cal\.com\//, event: "call_click" },
  { match: /\/empecemos$/, event: "cta_click" },
] as const;

export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }
      const link = event.target.closest("a[href]");
      if (!link) {
        return;
      }
      const href = link.getAttribute("href") ?? "";
      const found = EVENT_BY_HREF.find((item) => item.match.test(href));
      if (found) {
        track(found.event, { page: window.location.pathname });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
