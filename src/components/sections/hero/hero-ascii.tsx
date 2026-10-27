"use client";

import { useEffect, useRef } from "react";

import { noise3, smoothstep } from "@/components/sections/hero/ascii-noise";
import { coverBox, loadSkyline, type Skyline } from "@/components/sections/hero/ascii-skyline";

const SKYLINE_SRC = "/_next/image?url=%2Fimages%2Fhero-illustration.webp&w=640&q=75";
const IMAGE_WIDTH = 1916;
const IMAGE_HEIGHT = 821;
const CELL_WIDTH = 10;
const CELL_HEIGHT = 16;
const FONT_SIZE = 12;
const GLYPHS = " .:-=+*#";
const SKY_MARGIN = 10;
const SKY_FADE = 60;
const NAVBAR_CLEARANCE = 56;
const MIN_ALPHA = 0.07;
const ALPHA_RANGE = 0.24;
const FRAME_INTERVAL = 1000 / 30;
const POINTER_RADIUS = 140;
const POINTER_FOLLOW = 0.2;
const POINTER_EASE = 0.08;
const SHIMMER_PERIOD = 9;
const SHIMMER_DURATION = 2.6;
const SHIMMER_WIDTH = 80;
const STATIC_TIME = 12;
const SM_BREAKPOINT = 640;
const MOBILE_POSITION_X = 0.22;
const DESKTOP_POSITION_X = 0.5;
const MIN_CORES_TO_ANIMATE = 6;
const IDLE_DELAY = 500;

export function HeroAscii() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = (navigator.hardwareConcurrency ?? MIN_CORES_TO_ANIMATE) < MIN_CORES_TO_ANIMATE;
    const animated = !reducedMotion && !lowPower;
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#fe5634";
    const family = getComputedStyle(canvas).fontFamily;

    let skyline: Skyline | null = null;
    let limits = new Float32Array(0);
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let visible = true;
    let frameId = 0;
    let lastFrame = 0;
    let cancelled = false;
    const navbar = document.querySelector("header");
    const startTime = performance.now();
    const pointer = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, strength: 0, target: 0 };

    const layout = () => {
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(width / CELL_WIDTH);
      rows = Math.ceil(height / CELL_HEIGHT);

      if (!skyline) return;

      const box = coverBox(
        width,
        height,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        width < SM_BREAKPOINT ? MOBILE_POSITION_X : DESKTOP_POSITION_X,
        0,
      );
      limits = new Float32Array(columns);

      for (let column = 0; column < columns; column++) {
        const u = ((column + 0.5) * CELL_WIDTH - box.offsetX) / box.drawnWidth;
        const source = Math.min(skyline.columns - 1, Math.max(0, Math.floor(u * skyline.columns)));
        limits[column] =
          box.offsetY + (skyline.tops[source] / skyline.rows) * box.drawnHeight - SKY_MARGIN;
      }
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      if (!skyline) return;

      const time = animated ? (now - startTime) / 1000 : STATIC_TIME;
      const cycle = time % SHIMMER_PERIOD;
      const shimmerCenter =
        cycle <= SHIMMER_DURATION
          ? (cycle / SHIMMER_DURATION) * (width + 400) - 200
          : Number.NEGATIVE_INFINITY;

      pointer.x += (pointer.targetX - pointer.x) * POINTER_FOLLOW;
      pointer.y += (pointer.targetY - pointer.y) * POINTER_FOLLOW;
      pointer.strength += (pointer.target - pointer.strength) * POINTER_EASE;

      const canvasRect = canvas.getBoundingClientRect();
      const navRect = navbar?.getBoundingClientRect();
      const navLeft = navRect ? navRect.left - canvasRect.left : 0;
      const navRight = navRect ? navRect.right - canvasRect.left : 0;
      const navTop = navRect ? navRect.top - canvasRect.top : 0;
      const navBottom = navRect ? navRect.bottom - canvasRect.top : 0;

      context.font = `${FONT_SIZE}px ${family}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = accent;

      for (let column = 0; column < columns; column++) {
        const x = (column + 0.5) * CELL_WIDTH;

        for (let row = 0; row < rows; row++) {
          const y = (row + 0.5) * CELL_HEIGHT;
          const room = limits[column] - y;
          if (room <= 0) break;

          const navDistance = navRect
            ? Math.hypot(
                Math.max(navLeft - x, 0, x - navRight),
                Math.max(navTop - y, 0, y - navBottom),
              )
            : NAVBAR_CLEARANCE;
          const edge = smoothstep(0, SKY_FADE, room) * smoothstep(0, NAVBAR_CLEARANCE, navDistance);
          if (edge === 0) continue;
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const influence = pointer.strength * Math.max(0, 1 - distance / POINTER_RADIUS) ** 2;
          const push = distance > 0 ? (influence * 4) / distance : 0;
          const sampleX = column + dx * push;
          const sampleY = row + dy * push;

          const base = noise3(sampleX * 0.085, sampleY * 0.13, time * 0.18);
          const detail = noise3(sampleX * 0.19 + 20, sampleY * 0.27 + 20, time * 0.3);
          const cloud = smoothstep(0.46, 0.82, base * 0.7 + detail * 0.3);
          const band = Math.exp(-(((x + y * 0.45 - shimmerCenter) / SHIMMER_WIDTH) ** 2));
          const density = Math.min(1, (cloud + influence * 0.55 + band * 0.7) * edge);
          const glyph = Math.min(GLYPHS.length - 1, Math.floor(density * GLYPHS.length));
          if (glyph === 0) continue;

          context.globalAlpha = MIN_ALPHA + density * ALPHA_RANGE;
          context.fillText(GLYPHS[glyph], x, y);
        }
      }

      context.globalAlpha = 1;
    };

    const frame = (now: number) => {
      frameId = requestAnimationFrame(frame);
      if (!visible || document.hidden || now - lastFrame < FRAME_INTERVAL) return;
      lastFrame = now;
      draw(now);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!animated || event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      if (pointer.target === 0) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
      pointer.target = 1;
    };

    const handlePointerLeave = () => {
      pointer.target = 0;
    };

    const resizeObserver = new ResizeObserver(() => {
      layout();
      if (!animated) draw(performance.now());
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    const begin = () => {
      loadSkyline(SKYLINE_SRC)
        .then((result) => {
          if (cancelled) return;
          skyline = result;
          layout();
          draw(performance.now());
          canvas.dataset.ready = "true";
          resizeObserver.observe(host);
          intersectionObserver.observe(host);
          host.addEventListener("pointermove", handlePointerMove);
          host.addEventListener("pointerleave", handlePointerLeave);
          if (animated) frameId = requestAnimationFrame(frame);
        })
        .catch(() => undefined);
    };

    let idleId = 0;

    const scheduleBegin = () => {
      idleId = window.setTimeout(begin, IDLE_DELAY);
    };

    if (document.readyState === "complete") {
      scheduleBegin();
    } else {
      window.addEventListener("load", scheduleBegin, { once: true });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(idleId);
      window.removeEventListener("load", scheduleBegin);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full font-mono opacity-0 transition-opacity duration-700 ease-out data-[ready=true]:opacity-100"
    />
  );
}
