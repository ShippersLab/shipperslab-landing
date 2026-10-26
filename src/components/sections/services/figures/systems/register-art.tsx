import * as React from "react";

import { DRAWERS } from "@/components/sections/services/figures/systems/model";
import {
  CELLS,
  CELL_W,
  CRANK_HUB,
  CRANK_PATH,
  CRANK_STEM,
  GLASS_H,
  GLASS_W,
  KEYS_DEPT,
  KEYS_PAD,
  LAMPS,
  LINE_H,
  REGISTER_ART,
  crankOf,
} from "@/components/sections/services/figures/systems/register";
import { Dots, Line, Solid } from "@/components/ui/iso/react/draw";

const DIGIT_RUN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1];
const CELLS_AT = (GLASS_W - CELLS * CELL_W) / 2;
const REST = crankOf(0);

function Window() {
  return (
    <g>
      <defs>
        <clipPath id="sys-window-clip">
          <rect width={GLASS_W} height={GLASS_H} rx={0.8} />
        </clipPath>
        <linearGradient id="sys-drum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ink)" stopOpacity="0.92" />
          <stop offset="0.3" stopColor="var(--ink)" stopOpacity="0" />
          <stop offset="0.7" stopColor="var(--ink)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--ink)" stopOpacity="0.92" />
        </linearGradient>
      </defs>
      <g transform={REGISTER_ART.glassMatrix}>
        <rect className="sys-window" width={GLASS_W} height={GLASS_H} rx={0.8} />
        <g clipPath="url(#sys-window-clip)">
          {Array.from({ length: CELLS }, (_, cell) => (
            <g key={cell} transform={`translate(${CELLS_AT + cell * CELL_W} 0)`}>
              <g data-cell={cell}>
                {DIGIT_RUN.map((digit, row) => (
                  <text
                    key={row}
                    className="sys-digit"
                    x={CELL_W / 2}
                    y={row * LINE_H + LINE_H * 0.76}
                    fontSize={LINE_H * 0.78}
                    textAnchor="middle"
                  >
                    {digit}
                  </text>
                ))}
              </g>
            </g>
          ))}
          <rect width={GLASS_W} height={GLASS_H} fill="url(#sys-drum)" />
        </g>
        {Array.from({ length: CELLS + 1 }, (_, cell) => (
          <line
            key={cell}
            className="sys-cell-line"
            x1={CELLS_AT + cell * CELL_W}
            x2={CELLS_AT + cell * CELL_W}
            y1={0}
            y2={GLASS_H}
          />
        ))}
      </g>
    </g>
  );
}

function Lamps() {
  return (
    <g transform={REGISTER_ART.lampMatrix}>
      {LAMPS.map((x, index) => (
        <circle
          key={DRAWERS[index]}
          className="sys-lamp"
          data-lamp={index}
          data-on={index === 0 ? "" : undefined}
          cx={x}
          cy={0}
          r={1.5}
        />
      ))}
    </g>
  );
}

export function RegisterArt() {
  return (
    <g key="register">
      <path className="iso-halo" d={REGISTER_ART.halo} />
      <Solid
        paths={REGISTER_ART.desk}
        tone="mid"
        crease="faint"
        inner={<Line d={REGISTER_ART.deskSeam} tone="faint" />}
      />
      <Dots points={REGISTER_ART.deskScrews} size={0.5} tone="mid" />
      <Solid paths={REGISTER_ART.plate} tone="lo" crease="none" />
      <Line d={REGISTER_ART.plateRules} tone="lo" free />
      <Solid paths={REGISTER_ART.slot} tone="lo" crease="none" />
      <Solid paths={REGISTER_ART.bed} tone="lo" crease="none" />
      <Line d={REGISTER_ART.bedLine} tone="faint" />
      <Solid
        paths={REGISTER_ART.housing}
        tone="hi"
        crease="faint"
        inner={<Line d={REGISTER_ART.housingSeam} tone="faint" />}
      />
      <Line d={REGISTER_ART.housingGroove} tone="faint" />
      <Line d={REGISTER_ART.vents} tone="lo" />
      <Dots points={REGISTER_ART.rivets} size={0.45} tone="mid" />
      <Solid paths={REGISTER_ART.frame} tone="mid" crease="faint" />
      <Dots points={REGISTER_ART.frameScrews} size={0.45} tone="mid" />
      <Window />
      <Lamps />
      {REGISTER_ART.bell.map((paths, index) => (
        <Solid key={index} paths={paths} tone={index === 2 ? "hi" : "mid"} crease="faint" />
      ))}
      <Line d={REGISTER_ART.bellRing} tone="lo" />
      <Solid paths={REGISTER_ART.hubBoss} tone="mid" crease="faint" />
      <g data-crank="">
        <Line d={CRANK_PATH} tone="faint" />
        <Line d={CRANK_STEM} tone="mid" />
        <Line d={CRANK_HUB} tone="hi" />
        <path className="iso-line sys-arm" data-tone="hi" d={REST.arm} />
        <circle className="sys-knob" cx={REST.tip[0]} cy={REST.tip[1]} r={1.9} />
      </g>
      {KEYS_PAD.map((key) => (
        <g key={key.x}>
          <Solid paths={key.solid} tone="mid" crease="faint" />
          <Line d={key.ring} tone="lo" />
        </g>
      ))}
      {KEYS_DEPT.map((key) => (
        <g key={key.x} data-key={key.index}>
          <Solid paths={key.solid} tone="hi" crease="faint" />
          <Line d={key.ring} tone="lo" />
        </g>
      ))}
    </g>
  );
}
