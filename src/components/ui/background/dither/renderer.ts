import { DITHER_FRAGMENT, VERTEX, WAVE_FRAGMENT } from "@/components/ui/background/dither/shaders";
import {
  clamp,
  MAX_PALETTE,
  type DitherColor,
  type DitherSettings,
} from "@/components/ui/background/dither/types";
import {
  createCssColorParser,
  linkProgram,
  srgbToLinear,
} from "@/components/ui/background/webgl-program";

type DitherView = {
  width: number;
  height: number;
  ratio: number;
  cell: number;
  cellCss: number;
  cols: number;
  rows: number;
};

export type DitherFrame = {
  settings: DitherSettings;
  time: number;
  trail: Float32Array;
  trailCount: number;
  ripples: Float32Array;
  rippleCount: number;
  reveal: number;
};

const MAX_DPR = 2;

export function createDitherRenderer(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
  const wave = linkProgram(gl, VERTEX, WAVE_FRAGMENT, "aPosition");
  const dither = linkProgram(gl, VERTEX, DITHER_FRAGMENT, "aPosition");
  if (!wave || !dither) return null;

  const buffer = gl.createBuffer();
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const field = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, field);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const framebuffer = gl.createFramebuffer();

  const parseCss = createCssColorParser();
  const linearCache = new Map<string, number[]>();
  const toColor = (value: DitherColor): number[] => {
    if (Array.isArray(value)) return [0, 1, 2].map((i) => clamp(Number(value[i]) || 0, 0, 1));
    const cached = linearCache.get(value);
    if (cached) return cached;
    const rgb = parseCss(value).map(srgbToLinear);
    linearCache.set(value, rgb);
    return rgb;
  };

  const paletteData = new Float32Array(MAX_PALETTE * 3);
  const view: DitherView = {
    width: 1,
    height: 1,
    ratio: 1,
    cell: 1,
    cellCss: 1,
    cols: 1,
    rows: 1,
  };

  const allocate = (pixelSize: number) => {
    view.cell = Math.max(1, Math.round(pixelSize * view.ratio));
    view.cellCss = view.cell / view.ratio;
    view.cols = Math.max(1, Math.ceil(canvas.width / view.cell));
    view.rows = Math.max(1, Math.ceil(canvas.height / view.cell));
    gl.bindTexture(gl.TEXTURE_2D, field);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA8,
      view.cols,
      view.rows,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, field, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };

  const resize = (width: number, height: number, pixelSize: number) => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    view.width = width;
    view.height = height;
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    view.ratio = canvas.width / width;
    allocate(pixelSize);
  };

  const render = (frame: DitherFrame) => {
    const s = frame.settings;
    const expected = Math.max(1, Math.round(s.pixelSize * view.ratio));
    if (expected !== view.cell) allocate(s.pixelSize);

    gl.bindVertexArray(vao);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.viewport(0, 0, view.cols, view.rows);
    gl.useProgram(wave.program);
    const w = wave.uniforms;
    gl.uniform2f(w.uResolution, canvas.width / view.ratio, canvas.height / view.ratio);
    gl.uniform1f(w.uCell, view.cellCss);
    gl.uniform1f(w.uTime, frame.time);
    gl.uniform1f(w.uWaveSpeed, s.waveSpeed);
    gl.uniform1f(w.uWaveFrequency, s.waveFrequency);
    gl.uniform1f(w.uWaveAmplitude, s.waveAmplitude);
    gl.uniform1f(w.uScale, s.scale);
    gl.uniform1f(w.uContrast, s.contrast);
    gl.uniform1f(w.uBrightness, s.brightness);
    gl.uniform1i(w.uEffect, s.effect);
    gl.uniform1f(w.uRadius, s.mouseRadius);
    gl.uniform1f(w.uStrength, s.mouseStrength);
    gl.uniform3fv(w.uTrail, frame.trail);
    gl.uniform1i(w.uTrailCount, frame.trailCount);
    gl.uniform4fv(w.uRipples, frame.ripples);
    gl.uniform1i(w.uRippleCount, frame.rippleCount);
    gl.uniform1f(w.uIntro, frame.reveal);
    gl.uniform1f(w.uReach, 0.5 * Math.hypot(view.width / view.height, 1) + 0.45);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(dither.program);
    const d = dither.uniforms;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, field);
    gl.uniform1i(d.uField, 0);
    gl.uniform2i(d.uFieldSize, view.cols, view.rows);
    gl.uniform1f(d.uCellDevice, view.cell);
    gl.uniform1i(d.uMode, s.mode);
    gl.uniform1f(d.uColorNum, s.colorNum);
    gl.uniform3fv(d.uWave, toColor(s.waveColor));
    const transparent = s.backgroundColor === "transparent";
    gl.uniform3fv(d.uBackground, transparent ? [0, 0, 0] : toColor(s.backgroundColor));
    gl.uniform1f(d.uTransparent, transparent ? 1 : 0);
    s.palette.forEach((value, index) => paletteData.set(toColor(value), index * 3));
    gl.uniform3fv(d.uPalette, paletteData);
    gl.uniform1i(d.uPaletteCount, s.palette.length);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const dispose = () => {
    gl.deleteProgram(wave.program);
    gl.deleteProgram(dither.program);
    gl.deleteBuffer(buffer);
    gl.deleteVertexArray(vao);
    gl.deleteTexture(field);
    gl.deleteFramebuffer(framebuffer);
  };

  return { view, resize, render, dispose };
}
