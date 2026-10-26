import "@/components/ui/iso/iso.css";
import "@/components/sections/services/figures/systems/systems.css";

import { ART } from "@/components/sections/services/figures/systems/art";
import { SystemsLive } from "@/components/sections/services/figures/systems/live";
import { DRAWERS, START, readoutOf } from "@/components/sections/services/figures/systems/model";
import { Plate } from "@/components/ui/iso/react/draw";

export function SystemsFigure() {
  return (
    <div className="iso sys mx-auto w-full max-w-[560px]" data-theme="light">
      <Plate
        fig="Fig 1"
        title="Todo en un sistema"
        hint="Tocá un cajón"
        readout={readoutOf(START, DRAWERS[0]!)}
      >
        <SystemsLive art={ART} />
      </Plate>
    </div>
  );
}
