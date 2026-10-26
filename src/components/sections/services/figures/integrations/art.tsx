import * as React from "react";

import {
  BASE_ART,
  BEZEL_ART,
  DECK_ART,
  LABEL_ART,
  PLATE_ART,
  PLUG_ART,
  RELAY_ART,
  TRACE_ART,
} from "@/components/sections/services/figures/integrations/geometry";
import { JACKS } from "@/components/sections/services/figures/integrations/model";
import { Dots, FaceText, Line, Solid } from "@/components/ui/iso/react/draw";

export const BASE = (
  <g key="base">
    {BASE_ART.feet.map((paths, index) => (
      <Solid key={index} paths={paths} tone="lo" crease="faint" />
    ))}
    <Solid
      paths={BASE_ART.slab}
      tone="mid"
      crease="faint"
      inner={<Line d={BASE_ART.seam} tone="faint" />}
    />
    <Solid paths={DECK_ART.slab} tone="mid" crease="faint" />
    <Line d={DECK_ART.groove} tone="faint" />
    <Line d={DECK_ART.screwRings} tone="lo" />
    <Dots points={DECK_ART.screws} size={0.5} tone="mid" />
    <Line d={DECK_ART.rulerBase} tone="faint" />
    <Line d={DECK_ART.rulerMinor} tone="lo" />
    <Line d={DECK_ART.rulerMajor} tone="mid" />
    <Solid paths={DECK_ART.serial} tone="lo" crease="none" />
    <Line d={DECK_ART.serialRules} tone="lo" free />
    <Dots points={DECK_ART.serialScrews} size={0.45} tone="mid" />
  </g>
);

export const TRACES = (
  <g key="traces">
    <Line d={TRACE_ART.lines} tone="lo" />
    <Dots points={TRACE_ART.tracePads} size={0.7} tone="mid" />
  </g>
);

export const RELAY = (
  <g key="relay">
    <Solid
      paths={RELAY_ART.body}
      tone="hi"
      crease="faint"
      inner={<Line d={RELAY_ART.seam} tone="faint" />}
    />
    <Line d={TRACE_ART.risers} tone="lo" />
    <Dots points={TRACE_ART.ports} size={0.8} tone="hi" />
    <Line d={RELAY_ART.slots} tone="lo" />
    <FaceText transform={RELAY_ART.plate} size={4.6} tone="mid">
      RELÉ
    </FaceText>
    <Line d={RELAY_ART.plateRule} tone="faint" />
    <Solid paths={RELAY_ART.lid} tone="mid" crease="faint" />
    <Line d={RELAY_ART.lidRings} tone="lo" />
    <Dots points={RELAY_ART.lidScrews} size={0.5} tone="mid" />
    <Solid paths={RELAY_ART.lampBase} tone="mid" crease="faint" />
  </g>
);

export const PLATE = (
  <g key="plate">
    <Solid paths={PLATE_ART.slab} tone="mid" crease="faint" />
    <Line d={PLATE_ART.inlay} tone="faint" />
    <Line d={PLATE_ART.screwRings} tone="lo" />
    <Dots points={PLATE_ART.screws} size={0.5} tone="mid" />
    {LABEL_ART.map((label, index) => (
      <g key={index}>
        <Solid paths={label.slab} tone="lo" crease="none" />
        <Line d={label.rule} tone="faint" />
        <FaceText transform={label.text} size={5.4} tone="hi" anchor="middle">
          {JACKS[index]}
        </FaceText>
        <FaceText transform={label.number} size={3.6} tone="mid">
          {`0${index + 1}`}
        </FaceText>
      </g>
    ))}
    {BEZEL_ART.map((bezel, index) => (
      <g key={index}>
        <Solid paths={bezel.collar} tone="mid" crease="faint" />
        <Line d={bezel.knurl} tone="lo" />
        <Line d={bezel.seat} tone="lo" />
      </g>
    ))}
  </g>
);

export const LAMP = (
  <g key="lamp">
    <Solid paths={RELAY_ART.lamp} tone="hi" crease="faint" />
  </g>
);

export const PLUG = (
  <g key="plug">
    <Solid paths={PLUG_ART.nut} tone="mid" crease="faint" />
    <Line d={PLUG_ART.nutKnurl} tone="lo" />
    <Solid paths={PLUG_ART.barrel} tone="hi" crease="faint" />
    <Line d={PLUG_ART.groove} tone="mid" />
    <Solid paths={PLUG_ART.ferrule} tone="mid" crease="faint" />
    <Solid paths={PLUG_ART.relief} tone="lo" crease="faint" />
  </g>
);

export const LAMP_RING = RELAY_ART.lampRing;
export const FOCUS_RINGS = BEZEL_ART.map((bezel) => bezel.focus);
