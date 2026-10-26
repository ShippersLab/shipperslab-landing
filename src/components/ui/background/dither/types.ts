export type DitherColor = string | [number, number, number];
type DitherMode =
  | "bayer"
  | "bayer4"
  | "bayer2"
  | "halftone"
  | "lines"
  | "crosshatch"
  | "noise"
  | "none";
type DitherMouseEffect = "erase" | "reveal" | "ripple";

export type DitherProps = {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: DitherColor;
  backgroundColor?: DitherColor;
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  ditherMode?: DitherMode;
  palette?: string[];
  scale?: number;
  contrast?: number;
  brightness?: number;
  mouseEffect?: DitherMouseEffect;
  mouseStrength?: number;
  trail?: number;
  clickRipple?: boolean;
  intro?: boolean;
  className?: string;
};

export type DitherSettings = {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: DitherColor;
  backgroundColor: DitherColor;
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
  mode: number;
  palette: string[];
  scale: number;
  contrast: number;
  brightness: number;
  effect: number;
  mouseStrength: number;
  trail: number;
  clickRipple: boolean;
  intro: boolean;
};

export const MAX_TRAIL = 16;
export const MAX_RIPPLES = 4;
export const MAX_PALETTE = 8;
export const INTRO_SECONDS = 1.8;
export const RIPPLE_SECONDS = 1.6;

const MODES: Record<DitherMode, number> = {
  bayer: 0,
  bayer4: 1,
  bayer2: 2,
  halftone: 3,
  lines: 4,
  crosshatch: 5,
  noise: 6,
  none: 7,
};

const EFFECTS: Record<DitherMouseEffect, number> = {
  erase: 0,
  reveal: 1,
  ripple: 2,
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function toDitherSettings({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  backgroundColor = [0, 0, 0],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
  ditherMode = "bayer",
  palette,
  scale = 1,
  contrast = 1,
  brightness = 0,
  mouseEffect = "erase",
  mouseStrength = 1,
  trail = 0.5,
  clickRipple = true,
  intro = true,
}: DitherProps): DitherSettings {
  return {
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    backgroundColor,
    colorNum: Math.max(2, colorNum),
    pixelSize: Math.max(1, pixelSize),
    disableAnimation,
    enableMouseInteraction,
    mouseRadius: Math.max(0.001, mouseRadius),
    mode: MODES[ditherMode] ?? 0,
    palette: Array.isArray(palette) ? palette.filter(Boolean).slice(0, MAX_PALETTE) : [],
    scale: Math.max(0.05, scale),
    contrast,
    brightness,
    effect: EFFECTS[mouseEffect] ?? 0,
    mouseStrength: Math.max(0, mouseStrength),
    trail: clamp(trail, 0, 1),
    clickRipple,
    intro,
  };
}
