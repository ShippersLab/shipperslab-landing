"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import "@/components/sections/services/figures/bots/bots.css";
import "@/components/sections/services/figures/integrations/integrations.css";
import "@/components/sections/services/figures/presence/presence.css";
import "@/components/sections/services/figures/systems/systems.css";
import "@/components/ui/iso/iso.css";

function lazyFigure(load: () => Promise<ComponentType>) {
  return dynamic(load, { ssr: false });
}

export const SERVICE_FIGURES: Record<string, ComponentType> = {
  systems: lazyFigure(() =>
    import("@/components/sections/services/figures/systems").then((module) => module.SystemsFigure),
  ),
  presence: lazyFigure(() =>
    import("@/components/sections/services/figures/presence").then(
      (module) => module.PresenceFigure,
    ),
  ),
  bots: lazyFigure(() =>
    import("@/components/sections/services/figures/bots").then((module) => module.BotsFigure),
  ),
  integrations: lazyFigure(() =>
    import("@/components/sections/services/figures/integrations").then(
      (module) => module.IntegrationsFigure,
    ),
  ),
};
