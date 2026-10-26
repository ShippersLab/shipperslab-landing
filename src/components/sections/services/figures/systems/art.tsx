import * as React from "react";

import {
  BASE_ART,
  CABINET_ART,
  CARD_ART,
  PANEL_ART,
  VOIDS,
  trayOf,
} from "@/components/sections/services/figures/systems/geometry";
import { DRAWERS, LABELS } from "@/components/sections/services/figures/systems/model";
import { RegisterArt } from "@/components/sections/services/figures/systems/register-art";
import { PAINT_ORDER, P, SLOTS_OF } from "@/components/sections/services/figures/systems/view";
import { translateAlong } from "@/components/ui/iso/iso-kit";
import { Dots, Line, Solid } from "@/components/ui/iso/react/draw";

const BASE = (
  <g key="base">
    <path className="iso-halo" d={BASE_ART.halo} />
    {BASE_ART.feet.map((foot, index) => (
      <g key={index}>
        <Solid paths={foot.flange} tone="lo" crease="faint" />
        <Solid paths={foot.foot} tone="mid" crease="none" />
      </g>
    ))}
    <Solid paths={BASE_ART.slab} tone="mid" crease="faint" />
    <Line d={BASE_ART.groove} tone="faint" />
    <Line d={BASE_ART.screwRings} tone="lo" />
    <Dots points={BASE_ART.screws} size={0.5} tone="mid" />
    <Solid paths={BASE_ART.strip} tone="lo" crease="none" />
    <Line d={BASE_ART.stripMinor} tone="lo" />
    <Line d={BASE_ART.stripMajor} tone="mid" />
  </g>
);

const CABINET = (
  <g key="cabinet">
    <Solid
      paths={CABINET_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={CABINET_ART.seams} tone="faint" />}
    />
    <Dots points={CABINET_ART.frontScrews} size={0.5} tone="mid" />
    <Line d={CABINET_ART.sidePanel} tone="lo" />
    <Line d={CABINET_ART.sidePanelInner} tone="faint" />
    {CABINET_ART.sidePosts.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <Solid paths={CABINET_ART.sideRail} tone="hi" crease="faint" />
    <Dots points={CABINET_ART.sideScrews} size={0.45} tone="mid" />
    <Solid paths={CABINET_ART.cap} tone="mid" crease="faint" />
    <Line d={CABINET_ART.capGroove} tone="faint" />
    <Dots points={CABINET_ART.capScrews} size={0.5} tone="mid" />
    {VOIDS.map((hole) => (
      <path key={hole.key} className="sys-void" d={hole.d} />
    ))}
  </g>
);

function Drawer({ index }: { index: number }) {
  const slot = SLOTS_OF[index]!;
  const tray = trayOf(0);
  const word = LABELS[slot.key];
  return (
    <g data-drawer={index} transform={translateAlong(P, [slot.cx, 0, slot.z])}>
      <g data-tray="back" display="none">
        <Solid paths={tray.floor} tone="lo" crease="faint" />
        <Solid paths={tray.left} tone="mid" crease="faint" />
      </g>
      <g data-cards="" display="none">
        {[...CARD_ART].reverse().map((card, order) => {
          const slotIndex = CARD_ART.length - 1 - order;
          return (
            <g key={slotIndex} data-card={slotIndex}>
              <Solid paths={card.body} tone="hi" crease="faint" />
              <Line d={card.rules} tone="faint" free />
              <g data-tab="">
                <Solid paths={card.tab} tone="hi" crease="faint" />
              </g>
            </g>
          );
        })}
      </g>
      <g data-dropper="" opacity="0">
        <Solid paths={CARD_ART[0]!.body} tone="hi" crease="faint" />
        <Line d={CARD_ART[0]!.rules} tone="faint" free />
        <g data-tab="">
          <Solid paths={CARD_ART[0]!.tab} tone="hi" crease="faint" />
        </g>
      </g>
      <g data-tray="front" display="none">
        <Solid paths={tray.right} tone="mid" crease="faint" />
      </g>
      <g data-panel="">
        <Solid paths={PANEL_ART.panel} tone="mid" crease="faint" />
        <Line d={PANEL_ART.inset} tone="faint" />
        <Dots points={PANEL_ART.rivets} size={0.45} tone="mid" />
        {PANEL_ART.pullPosts.map((paths, post) => (
          <Solid key={post} paths={paths} tone="mid" crease="none" />
        ))}
        <Solid paths={PANEL_ART.pull} tone="hi" crease="faint" />
        <Line d={PANEL_ART.cup} tone="lo" />
        <Solid paths={PANEL_ART.holder} tone="lo" crease="none" />
        <Dots points={PANEL_ART.holderScrews} size={0.4} tone="mid" />
        <g className="sys-label" data-label={slot.key} data-on={index === 0 ? "" : undefined}>
          <Solid paths={PANEL_ART.label} tone="mid" crease="none" />
        </g>
        <text
          className="iso-face-text sys-label-text"
          data-tone="hi"
          transform={PANEL_ART.labelText}
          x={0}
          y={5.6}
          fontSize={4.6}
          textAnchor="middle"
        >
          {word}
        </text>
      </g>
    </g>
  );
}

const DRAWER_ELEMENTS = PAINT_ORDER.map((index) => <Drawer key={DRAWERS[index]} index={index} />);

export const ART = (
  <React.Fragment key="systems-art">
    {BASE}
    {CABINET}
    {DRAWER_ELEMENTS}
    <RegisterArt />
  </React.Fragment>
);
