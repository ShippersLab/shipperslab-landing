"use client";

import { mixHex, useDesignTokens } from "@/components/ui/background/design-tokens";
import { Dither } from "@/components/ui/background/dither";

const WAVE_TOWARD_SURFACE = 0.78;

export function ServiceHeroDither() {
  const tokens = useDesignTokens();
  if (!tokens) return null;

  return (
    <Dither
      backgroundColor={tokens.surface}
      waveColor={mixHex(tokens.accent, tokens.surface, WAVE_TOWARD_SURFACE)}
      colorNum={10}
      pixelSize={4}
      waveSpeed={0.015}
      waveFrequency={3}
      waveAmplitude={0.3}
      scale={2}
      contrast={0.55}
      brightness={-0.12}
      ditherMode="bayer"
      enableMouseInteraction
      mouseEffect="erase"
      mouseRadius={0.5}
      mouseStrength={0.3}
      trail={0.4}
      clickRipple={false}
    />
  );
}
