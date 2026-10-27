function hash(x: number, y: number, z: number) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function fade(t: number) {
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const u = fade(x - xi);
  const v = fade(y - yi);
  const w = fade(z - zi);

  const x00 = mix(hash(xi, yi, zi), hash(xi + 1, yi, zi), u);
  const x10 = mix(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u);
  const x01 = mix(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u);
  const x11 = mix(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u);

  return mix(mix(x00, x10, v), mix(x01, x11, v), w);
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
