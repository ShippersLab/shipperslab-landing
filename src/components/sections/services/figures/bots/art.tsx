import * as React from "react";

import {
  ANTENNA_ART,
  BASE_ART,
  BODY_ART,
  STATION_ART,
} from "@/components/sections/services/figures/bots/geometry";
import { Dots, Line, Solid } from "@/components/ui/iso/react/draw";

export const BASE = (
  <g key="base">
    <path className="iso-halo" d={BASE_ART.halo} />
    {BASE_ART.feet.map((paths, index) => (
      <Solid key={index} paths={paths} tone="lo" crease="faint" />
    ))}
    <Solid paths={BASE_ART.slab} tone="mid" crease="faint" />
    <Line d={BASE_ART.groove} tone="faint" />
    <Line d={BASE_ART.screwRings} tone="lo" />
    <Dots points={BASE_ART.screws} size={0.5} tone="mid" />
    <Solid paths={BASE_ART.label} tone="lo" crease="none" />
    <Line d={BASE_ART.labelRules} tone="lo" free />
    <Dots points={BASE_ART.labelDots} size={0.4} tone="mid" />
    <Solid paths={BASE_ART.ruler} tone="lo" crease="none" />
    <Line d={BASE_ART.rulerMinor} tone="lo" />
    <Line d={BASE_ART.rulerMajor} tone="mid" />
    <Line d={BASE_ART.cable} tone="mid" />
    <Dots points={BASE_ART.cableEnds} size={1.1} tone="hi" />
  </g>
);

export const BODY = (
  <g key="body">
    <Solid
      paths={BODY_ART.pedestal}
      tone="mid"
      crease="faint"
      inner={<Line d={BODY_ART.pedestalSeam} tone="faint" />}
    />
    <Dots points={BODY_ART.rivets} size={0.45} tone="mid" />
    <Solid
      paths={BODY_ART.torso}
      tone="hi"
      crease="faint"
      inner={<Line d={BODY_ART.seam} tone="faint" />}
    />
    <Line d={BODY_ART.panel} tone="lo" />
    <Line d={BODY_ART.panelInner} tone="faint" />
    <Dots points={BODY_ART.screwsFront} size={0.5} tone="mid" />
    <path className="bots-glass" d={BODY_ART.window} />
    <Line d={BODY_ART.window} tone="mid" />
    <path className="bots-glass" d={BODY_ART.slot} />
    <Line d={BODY_ART.slot} tone="mid" />
    <Line d={BODY_ART.slotLip} tone="lo" />
    <Line d={BODY_ART.slits} tone="lo" />
    <Line d={BODY_ART.sidePanel} tone="lo" />
    <Line d={BODY_ART.sideGrooves} tone="faint" />
    <Dots points={BODY_ART.sideScrews} size={0.45} tone="mid" />
    <Dots points={BODY_ART.topScrews} size={0.45} tone="mid" />
    <Solid paths={BODY_ART.neck} tone="mid" crease="faint" />
    <Solid paths={BODY_ART.collar} tone="hi" crease="faint" />
    <Solid paths={BODY_ART.shoulderR} tone="hi" crease="faint" />
    <Line d={BODY_ART.shoulderRCap} tone="lo" />
  </g>
);

export const SHOULDER_BACK = (
  <g key="shoulder-back">
    <Solid paths={BODY_ART.shoulderL} tone="hi" crease="faint" />
    <Line d={BODY_ART.shoulderLCap} tone="lo" />
  </g>
);

export const STATION = (
  <g key="station">
    <Solid
      paths={STATION_ART.block}
      tone="mid"
      crease="faint"
      inner={<Line d={STATION_ART.seam} tone="faint" />}
    />
    <path className="bots-glass" d={STATION_ART.slotFill} />
    <Line d={STATION_ART.slot} tone="mid" />
    <Line d={STATION_ART.ticksMinor} tone="lo" />
    <Line d={STATION_ART.ticksMajor} tone="mid" />
    {STATION_ART.stops.map((paths, index) => (
      <Solid key={index} paths={paths} tone="hi" crease="faint" />
    ))}
    <Line d={STATION_ART.plate} tone="lo" />
    <Line d={STATION_ART.plateSlits} tone="lo" />
    <Dots points={STATION_ART.plateScrews} size={0.45} tone="mid" />
    <Line d={STATION_ART.sidePlate} tone="lo" />
    <Line d={STATION_ART.sideLines} tone="faint" />
    <Dots points={STATION_ART.topScrews} size={0.45} tone="mid" />
    <Solid paths={STATION_ART.boot} tone="hi" crease="faint" />
    <Line d={STATION_ART.bootRing} tone="lo" />
  </g>
);

export const ANTENNA = (
  <g key="antenna">
    <Solid paths={ANTENNA_ART.base} tone="mid" crease="faint" />
    <Line d={ANTENNA_ART.baseRing} tone="lo" />
    <Solid paths={ANTENNA_ART.rod} tone="mid" crease="none" />
    <Solid paths={ANTENNA_ART.tip} tone="hi" crease="faint" />
  </g>
);
