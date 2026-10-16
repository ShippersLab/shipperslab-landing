"use client";

import { useEffect, useRef, type RefObject } from "react";

import { createDitherRenderer } from "@/components/ui/background/dither/renderer";
import {
  clamp,
  INTRO_SECONDS,
  MAX_RIPPLES,
  MAX_TRAIL,
  RIPPLE_SECONDS,
  type DitherSettings,
} from "@/components/ui/background/dither/types";

type TrailPoint = { x: number; y: number; weight: number };
type Ripple = { x: number; y: number; age: number };

export function useDither(
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  settings: DitherSettings,
) {
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const wakeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!container || !canvas || !gl) return undefined;
    const renderer = createDitherRenderer(gl, canvas);
    if (!renderer) return undefined;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const pointer = { x: 0, y: 0, inside: false, set: false };
    const trailPoints: TrailPoint[] = [];
    const ripples: Ripple[] = [];
    const trailData = new Float32Array(MAX_TRAIL * 3);
    const rippleData = new Float32Array(MAX_RIPPLES * 4);
    const state = {
      time: 0,
      hx: 0,
      hy: 0,
      presence: 0,
      reveal: settingsRef.current.intro && !reduce ? 0 : 1,
    };
    let raf = 0;
    let last = 0;
    let visible = true;

    const toUv = (x: number, y: number): [number, number] => {
      const { width, height } = renderer.view;
      return [(x / width - 0.5) * (width / height), -(y / height - 0.5)];
    };

    const render = () => {
      const s = settingsRef.current;
      let trailCount = 0;
      for (let i = 0; i < trailPoints.length && trailCount < MAX_TRAIL; i += 1) {
        const point = trailPoints[i];
        if (point.weight <= 0.01) continue;
        trailData.set([point.x, point.y, point.weight], trailCount * 3);
        trailCount += 1;
      }
      let rippleCount = 0;
      for (let i = ripples.length - 1; i >= 0 && rippleCount < MAX_RIPPLES; i -= 1) {
        rippleData.set([ripples[i].x, ripples[i].y, ripples[i].age, 1], rippleCount * 4);
        rippleCount += 1;
      }
      const eased = s.intro && !reduce ? state.reveal * state.reveal * (3 - 2 * state.reveal) : 1;
      renderer.render({
        settings: s,
        time: state.time,
        trail: trailData,
        trailCount,
        ripples: rippleData,
        rippleCount,
        reveal: eased,
      });
    };

    const followPointer = (dt: number, s: DitherSettings) => {
      const [tx, ty] = toUv(pointer.x, pointer.y);
      const follow = 1 - Math.exp(-dt / 0.06);
      const moved = Math.hypot(tx - state.hx, ty - state.hy);
      state.hx += (tx - state.hx) * follow;
      state.hy += (ty - state.hy) * follow;
      const decay = Math.exp(-dt / (0.08 + s.trail * 0.7));
      trailPoints.forEach((point) => {
        point.weight *= decay;
      });
      const head = trailPoints[0];
      if (!head || Math.hypot(head.x - state.hx, head.y - state.hy) > 0.012 || moved > 0.012) {
        trailPoints.unshift({ x: state.hx, y: state.hy, weight: state.presence });
      } else {
        head.x = state.hx;
        head.y = state.hy;
        head.weight = state.presence;
      }
      if (s.trail <= 0.001) trailPoints.length = Math.min(trailPoints.length, 1);
      while (
        trailPoints.length > MAX_TRAIL ||
        (trailPoints.length > 1 && trailPoints[trailPoints.length - 1].weight < 0.01)
      ) {
        trailPoints.pop();
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const s = settingsRef.current;
      const dt = last ? clamp((now - last) / 1000, 0.0005, 0.05) : 1 / 60;
      last = now;
      if (!s.disableAnimation && !reduce) state.time += dt;

      const engaged = s.enableMouseInteraction && pointer.inside && !reduce;
      state.presence +=
        ((engaged ? 1 : 0) - state.presence) * (1 - Math.exp(-dt / (engaged ? 0.12 : 0.35)));
      if (pointer.set) followPointer(dt, s);

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        ripples[i].age += dt;
        if (ripples[i].age >= RIPPLE_SECONDS) ripples.splice(i, 1);
      }

      if (!s.intro || reduce) state.reveal = 1;
      else if (state.reveal < 1) state.reveal = Math.min(1, state.reveal + dt / INTRO_SECONDS);

      render();
      const busy =
        !s.disableAnimation ||
        state.reveal < 1 ||
        ripples.length > 0 ||
        state.presence > 0.002 ||
        trailPoints.some((point) => point.weight > 0.01);
      if (busy && !reduce) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      renderer.resize(
        Math.max(1, container.clientWidth),
        Math.max(1, container.clientHeight),
        settingsRef.current.pixelSize,
      );
      render();
      wake();
    };

    const locate = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
      if (pointer.inside && !pointer.set) {
        const [x, y] = toUv(pointer.x, pointer.y);
        state.hx = x;
        state.hy = y;
        pointer.set = true;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      locate(event);
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      const s = settingsRef.current;
      locate(event);
      if (!pointer.inside || !s.clickRipple || reduce) return;
      const [x, y] = toUv(pointer.x, pointer.y);
      ripples.push({ x, y, age: 0 });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
      wake();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") pointer.inside = false;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
    };

    const onVisibility = () => {
      last = 0;
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        last = 0;
        wake();
      }
    });
    intersection.observe(container);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    wakeRef.current = () => {
      if (!raf) render();
      wake();
    };

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.dispose();
    };
  }, [containerRef, canvasRef]);

  useEffect(() => {
    wakeRef.current?.();
  });
}
