import type { ComponentType } from "react";

import { BotsFigure } from "@/components/sections/services/figures/bots";
import { IntegrationsFigure } from "@/components/sections/services/figures/integrations";
import { PresenceFigure } from "@/components/sections/services/figures/presence";
import { SystemsFigure } from "@/components/sections/services/figures/systems";

export const SERVICE_FIGURES: Record<string, ComponentType> = {
  systems: SystemsFigure,
  presence: PresenceFigure,
  bots: BotsFigure,
  integrations: IntegrationsFigure,
};
