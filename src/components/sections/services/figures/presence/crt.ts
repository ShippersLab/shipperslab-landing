import { ease } from "@/components/sections/services/figures/presence/model";

export function crtState(t: number, power: boolean) {
  let sx = 1;
  let sy = 1;
  let beamAt = 0;
  let dotAt = 0;
  let lit = power;
  if (power) {
    if (t < 0.14) {
      sx = ease(t / 0.14);
      sy = 0.012;
      beamAt = 1;
    } else if (t < 0.36) {
      sy = 0.012 + 0.988 * ease((t - 0.14) / 0.22);
      beamAt = 1 - ease((t - 0.14) / 0.22);
    }
  } else if (t < 0.1) {
    sy = 1 - 0.988 * ease(t / 0.1);
    beamAt = ease(t / 0.1);
    lit = true;
  } else if (t < 0.26) {
    sy = 0.012;
    sx = 1 - ease((t - 0.1) / 0.16);
    beamAt = 1;
    lit = true;
  } else {
    sx = 0;
    sy = 0;
    dotAt = Math.max(0, 1 - (t - 0.26) / 0.5);
  }
  return { sx, sy, beamAt, dotAt, lit };
}
