import {
  leftArm,
  leverAngle,
  leverFrame,
  rightArm,
  type ArmFrame,
} from "@/components/sections/services/figures/bots/arms";
import { paint, setD } from "@/components/sections/services/figures/bots/dyn";
import { headFrame } from "@/components/sections/services/figures/bots/head";
import { type Pose } from "@/components/sections/services/figures/bots/model";
import { LED_COUNT, SLIP_REACH } from "@/components/sections/services/figures/bots/slip";
import { P, fine } from "@/components/sections/services/figures/bots/view";
import { translateAlong } from "@/components/ui/iso/iso-kit";

export type Nodes = Record<string, SVGElement | null | undefined>;

export interface Look {
  pose: Pose;
  clock: number;
  yaw: number;
  gx: number;
  gy: number;
  blink: number;
  idleTip: number;
}

const moveTo = ([x, y]: [number, number]) => translateAlong(P, [x, y, 0]);

function applyArm(nodes: Nodes, side: "l" | "r", frame: ArmFrame) {
  paint(nodes[`${side}Upper`], frame.upper.solid);
  setD(nodes[`${side}UpperGroove`], frame.upper.groove);
  paint(nodes[`${side}Fore`], frame.fore.solid);
  setD(nodes[`${side}ForeGroove`], frame.fore.groove);
  paint(nodes[`${side}Prong0`], frame.prongs[0]);
  paint(nodes[`${side}Prong1`], frame.prongs[1]);
  nodes[`${side}Elbow`]?.setAttribute("transform", moveTo(frame.elbow));
  nodes[`${side}Palm`]?.setAttribute("transform", moveTo(frame.hand));
}

export function applyFrame(nodes: Nodes, { pose, clock, yaw, gx, gy, blink, idleTip }: Look) {
  const head = headFrame({ yaw, gx, gy, blink, smile: pose.smile });
  paint(nodes.head, head.body);
  paint(nodes.earL, head.earL);
  paint(nodes.earR, head.earR);
  setD(nodes.earRings, head.earRings);
  setD(nodes.hatch, head.hatch);
  setD(nodes.vents, head.vents);
  setD(nodes.sideVents, head.sideVents);
  setD(nodes.bezel, head.bezel);
  setD(nodes.screen, head.screen);
  setD(nodes.glare, head.glare);
  setD(nodes.eyeL, head.eyes[0]);
  setD(nodes.eyeR, head.eyes[1]);
  setD(nodes.mouth, head.mouth);

  applyArm(nodes, "l", leftArm(pose.wave, clock));
  applyArm(nodes, "r", rightArm(pose.reach, pose.pull));

  const lever = leverFrame(leverAngle(pose.pull));
  setD(nodes.leverFill, lever.silhouette);
  setD(nodes.leverEdge, lever.silhouette);
  setD(nodes.leverFaceY, lever.faceY);
  setD(nodes.leverFaceX, lever.faceX);
  setD(nodes.leverGroove, lever.groove);
  nodes.knob?.setAttribute("cx", `${fine(lever.knob[0])}`);
  nodes.knob?.setAttribute("cy", `${fine(lever.knob[1])}`);
  nodes.knobHi?.setAttribute("cx", `${fine(lever.knobHighlight[0])}`);
  nodes.knobHi?.setAttribute("cy", `${fine(lever.knobHighlight[1])}`);
  if (nodes.lens) nodes.lens.style.opacity = `${pose.lamp}`;

  nodes.slip?.setAttribute("transform", translateAlong(P, [0, pose.slip * SLIP_REACH, 0]));
  for (let index = 0; index < LED_COUNT; index++) {
    const led = nodes[`led${index}`];
    if (led) led.style.opacity = `${index < pose.leds * LED_COUNT ? 1 : 0.16}`;
  }

  const tip = Math.max(pose.tip, idleTip);
  if (nodes.tipLit) nodes.tipLit.style.opacity = `${tip}`;
  if (nodes.tipTop) nodes.tipTop.style.opacity = `${tip}`;
  if (nodes.glow) nodes.glow.style.opacity = `${pose.tip * 0.7}`;
}
