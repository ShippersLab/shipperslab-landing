import * as React from "react";

import {
  LEVER_REST,
  leftArm,
  leverFrame,
  rightArm,
} from "@/components/sections/services/figures/bots/arms";
import { DynSolid, type Bind } from "@/components/sections/services/figures/bots/dyn";
import {
  JOINT_ART,
  STATION_ART,
  ANTENNA_ART,
} from "@/components/sections/services/figures/bots/geometry";
import { YAW_REST, headFrame } from "@/components/sections/services/figures/bots/head";
import { LED_PATHS, SLIP_ART, SLIP_CLIP } from "@/components/sections/services/figures/bots/slip";
import { FRONT_Y, P } from "@/components/sections/services/figures/bots/view";
import { sideMatrix, translateAlong } from "@/components/ui/iso/iso-kit";
import { Line, Solid } from "@/components/ui/iso/react/draw";

const REST_HEAD = headFrame({
  yaw: YAW_REST,
  gx: 0,
  gy: 0,
  blink: 0,
  smile: 0,
});
const REST_LEFT = leftArm(0, 0);
const REST_RIGHT = rightArm(0, 0);
const REST_LEVER = leverFrame(LEVER_REST);
const REST_TICKER = "En línea";
const REST_SLIP = { title: "Pedido", time: "02:14" };

const moveTo = ([x, y]: [number, number]) => translateAlong(P, [x, y, 0]);

interface ArmProps {
  bind: Bind;
  side: "l" | "r";
}

export function ArmUpper({ bind, side }: ArmProps) {
  const frame = side === "l" ? REST_LEFT : REST_RIGHT;
  return (
    <g>
      <DynSolid id={`${side}Upper`} bind={bind} paths={frame.upper.solid} tone="mid" />
      <path
        ref={bind(`${side}UpperGroove`)}
        className="iso-line"
        data-tone="lo"
        d={frame.upper.groove}
      />
    </g>
  );
}

export function ArmLower({ bind, side }: ArmProps) {
  const frame = side === "l" ? REST_LEFT : REST_RIGHT;
  return (
    <g>
      <g ref={bind(`${side}Elbow`)} transform={moveTo(frame.elbow)}>
        <Solid paths={JOINT_ART.elbow} tone="hi" crease="faint" />
        <Line d={JOINT_ART.elbowRing} tone="lo" />
      </g>
      <DynSolid id={`${side}Fore`} bind={bind} paths={frame.fore.solid} tone="mid" />
      <path
        ref={bind(`${side}ForeGroove`)}
        className="iso-line"
        data-tone="lo"
        d={frame.fore.groove}
      />
      <DynSolid id={`${side}Prong0`} bind={bind} paths={frame.prongs[0]} tone="hi" />
      <DynSolid id={`${side}Prong1`} bind={bind} paths={frame.prongs[1]} tone="hi" />
      <g ref={bind(`${side}Palm`)} transform={moveTo(frame.hand)}>
        <Solid paths={JOINT_ART.palm} tone="hi" crease="faint" />
      </g>
    </g>
  );
}

export function Ticker({ bind }: { bind: Bind }) {
  return (
    <g>
      <text
        ref={bind("ticker")}
        className="iso-face-text bots-ticker"
        transform={sideMatrix([-28.6, FRONT_Y + 0.05], 34.3, P, "left")}
        fontSize={2.7}
      >
        {REST_TICKER}
      </text>
      {LED_PATHS.map((d, index) => (
        <path key={index} ref={bind(`led${index}`)} className="bots-led" d={d} />
      ))}
    </g>
  );
}

export function Slip({ bind, clipId }: { bind: Bind; clipId: string }) {
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <path d={SLIP_CLIP} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <g ref={bind("slip")}>
          <Solid paths={SLIP_ART.card} tone="hi" crease="faint" />
          <Line d={SLIP_ART.border} tone="faint" />
          <Line d={SLIP_ART.rules} tone="lo" free />
          <path ref={bind("perf")} className="iso-line" data-tone="faint" d="" />
          <text
            ref={bind("slipTitle")}
            className="iso-face-text"
            data-tone="hi"
            transform={SLIP_ART.titleMatrix}
            fontSize={3.2}
          >
            {REST_SLIP.title}
          </text>
          <text
            ref={bind("slipTime")}
            className="iso-face-text"
            transform={SLIP_ART.timeMatrix}
            fontSize={2.6}
          >
            {REST_SLIP.time}
          </text>
        </g>
      </g>
    </g>
  );
}

export function Lever({ bind }: { bind: Bind }) {
  return (
    <g>
      <path ref={bind("leverFill")} className="iso-fill" d={REST_LEVER.silhouette} />
      <path ref={bind("leverFaceY")} className="iso-shade" data-shade={2} d={REST_LEVER.faceY} />
      <path ref={bind("leverFaceX")} className="iso-shade" data-shade={0} d={REST_LEVER.faceX} />
      <path ref={bind("leverGroove")} className="iso-line" data-tone="lo" d={REST_LEVER.groove} />
      <path
        ref={bind("leverEdge")}
        className="iso-line iso-edge"
        data-tone="hi"
        d={REST_LEVER.silhouette}
      />
      <circle
        ref={bind("knob")}
        className="bots-knob"
        cx={REST_LEVER.knob[0]}
        cy={REST_LEVER.knob[1]}
        r={REST_LEVER.knobRadius}
      />
      <circle
        ref={bind("knobHi")}
        className="bots-knob-hi"
        cx={REST_LEVER.knobHighlight[0]}
        cy={REST_LEVER.knobHighlight[1]}
        r={REST_LEVER.knobRadius * 0.28}
      />
    </g>
  );
}

export function Lamp({ bind }: { bind: Bind }) {
  return (
    <g>
      <Solid paths={STATION_ART.lamp} tone="hi" crease="faint" />
      <path className="bots-lens-rest" d={STATION_ART.lampLens} />
      <path ref={bind("lens")} className="bots-lens" d={STATION_ART.lampLens} />
    </g>
  );
}

export function Head({ bind }: { bind: Bind }) {
  return (
    <g>
      <DynSolid id="earL" bind={bind} paths={REST_HEAD.earL} tone="mid" />
      <DynSolid id="head" bind={bind} paths={REST_HEAD.body} tone="hi" />
      <DynSolid id="earR" bind={bind} paths={REST_HEAD.earR} tone="mid" />
      <path ref={bind("earRings")} className="iso-line" data-tone="lo" d={REST_HEAD.earRings} />
      <path ref={bind("hatch")} className="iso-line" data-tone="lo" d={REST_HEAD.hatch} />
      <path ref={bind("vents")} className="iso-line" data-tone="mid" d={REST_HEAD.vents} />
      <path ref={bind("sideVents")} className="iso-line" data-tone="lo" d={REST_HEAD.sideVents} />
      <path ref={bind("bezel")} className="iso-line" data-tone="hi" d={REST_HEAD.bezel} />
      <path ref={bind("screen")} className="bots-screen" d={REST_HEAD.screen} />
      <path ref={bind("glare")} className="bots-glare" d={REST_HEAD.glare} />
      <path ref={bind("eyeL")} className="bots-eye" d={REST_HEAD.eyes[0]} />
      <path ref={bind("eyeR")} className="bots-eye" d={REST_HEAD.eyes[1]} />
      <path ref={bind("mouth")} className="bots-mouth" d={REST_HEAD.mouth} />
    </g>
  );
}

export function TipGlow({ bind }: { bind: Bind }) {
  return (
    <g>
      <path ref={bind("glow")} className="bots-glow" d={ANTENNA_ART.tip.fill} />
      <path ref={bind("tipLit")} className="bots-tip" d={ANTENNA_ART.tip.fill} />
      <path className="iso-line iso-edge" data-tone="hi" d={ANTENNA_ART.tip.outline} />
      <path ref={bind("tipTop")} className="bots-tip-top" d={ANTENNA_ART.tipTop} />
    </g>
  );
}
