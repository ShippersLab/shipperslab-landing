import "@/components/ui/iso/iso.css";
import "@/components/sections/services/figures/presence/presence.css";

import { PresenceArt } from "@/components/sections/services/figures/presence/art";
import { PresenceLive } from "@/components/sections/services/figures/presence/live";
import { readoutOf } from "@/components/sections/services/figures/presence/model";
import { TEXT_X } from "@/components/sections/services/figures/presence/screen";
import { CRT_MID, DOWN_VECTOR } from "@/components/sections/services/figures/presence/view";
import { Plate } from "@/components/ui/iso/react/draw";

const LABEL =
  "Computadora de escritorio con una web, un turnero y un catálogo en la pantalla. Tocá para cambiar de pantalla, escribí para buscar, Escape apaga.";

export function PresenceFigure() {
  return (
    <div className="iso pf" data-theme="light">
      <Plate
        fig="Fig 2"
        title="Tu presencia"
        hint="Tocá para cambiar"
        readout={readoutOf(0, "", true)}
      >
        <PresenceLive
          art={<PresenceArt />}
          down={DOWN_VECTOR}
          crtMid={CRT_MID}
          textX={TEXT_X}
          label={LABEL}
        />
      </Plate>
    </div>
  );
}
