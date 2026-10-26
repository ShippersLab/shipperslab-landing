import "@/components/ui/iso/iso.css";
import "@/components/sections/services/figures/bots/bots.css";

import {
  ANTENNA,
  BASE,
  BODY,
  SHOULDER_BACK,
  STATION,
} from "@/components/sections/services/figures/bots/art";
import { BotsLive } from "@/components/sections/services/figures/bots/live";
import { IDLE_TEXT } from "@/components/sections/services/figures/bots/model";
import { Plate } from "@/components/ui/iso/react/draw";

export function BotsFigure() {
  return (
    <div className="iso bots" data-theme="light">
      <Plate
        fig="Fig 3"
        title="Atención 24/7"
        hint="Tocá para mandar un mensaje"
        readout={IDLE_TEXT}
      >
        <BotsLive
          base={BASE}
          body={BODY}
          shoulder={SHOULDER_BACK}
          station={STATION}
          antenna={ANTENNA}
        />
      </Plate>
    </div>
  );
}
