import "@/components/ui/iso/iso.css";
import "@/components/sections/services/figures/integrations/integrations.css";

import {
  BASE,
  FOCUS_RINGS,
  LAMP,
  LAMP_RING,
  PLATE,
  PLUG,
  RELAY,
  TRACES,
} from "@/components/sections/services/figures/integrations/art";
import { IntegrationsLive } from "@/components/sections/services/figures/integrations/live";
import { START, restText } from "@/components/sections/services/figures/integrations/model";
import { Plate } from "@/components/ui/iso/react/draw";

export function IntegrationsFigure() {
  return (
    <div className="iso ig mx-auto w-full max-w-[560px]" data-theme="light">
      <Plate
        fig="Fig 4"
        title="Tablero de conexiones"
        hint="Tocá un cable"
        readout={restText(START)}
      >
        <IntegrationsLive
          label="Tablero"
          base={BASE}
          traces={TRACES}
          relay={RELAY}
          plate={PLATE}
          lamp={LAMP}
          lampRing={LAMP_RING}
          plug={PLUG}
          focusRings={FOCUS_RINGS}
        />
      </Plate>
    </div>
  );
}
