"use client";

import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

const UNIT = 26;
const COS = 0.866;
const GRID = 24;

type Point = readonly [number, number, number];

function project([x, y, z]: Point) {
  return [(x - y) * COS * UNIT, (x + y) * 0.5 * UNIT - z * UNIT] as const;
}

function polygon(points: readonly Point[]) {
  return points.map((point) => project(point).join(",")).join(" ");
}

function line(from: Point, to: Point) {
  const [x1, y1] = project(from);
  const [x2, y2] = project(to);
  return `M${x1} ${y1}L${x2} ${y2}`;
}

type Box = { x: number; y: number; z: number; w: number; d: number; h: number };

type CuboidProps = Box & { topClass?: string };

function Cuboid({ x, y, z, w, d, h, topClass = "fill-paper" }: CuboidProps) {
  const top = polygon([
    [x, y, z + h],
    [x + w, y, z + h],
    [x + w, y + d, z + h],
    [x, y + d, z + h],
  ]);
  const left = polygon([
    [x, y + d, z],
    [x + w, y + d, z],
    [x + w, y + d, z + h],
    [x, y + d, z + h],
  ]);
  const right = polygon([
    [x + w, y, z],
    [x + w, y + d, z],
    [x + w, y + d, z + h],
    [x + w, y, z + h],
  ]);

  return (
    <g strokeLinejoin="round" className="stroke-muted/45">
      <polygon points={left} className="fill-ink/3" />
      <polygon points={right} className="fill-ink/6" />
      <polygon points={top} className={topClass} />
    </g>
  );
}

const CELL = 1.4;
const SLAB = { x: 7, y: 9, z: 0, w: CELL * 7, d: CELL * 5, h: 0.5 };

const COLUMNS = 7;
const ROWS = 5;
const TILE_COUNT = COLUMNS * ROWS;
const TILE_HEIGHT = 0.3;
const MIN_BOOKED = 3;
const MAX_BOOKED = 8;
const TICK_MS = 1600;

const INITIAL_BOOKED = [8, 17, 4, 16, 27, 21, 34];

const TILES = Array.from({ length: TILE_COUNT }, (_, index) => ({
  index,
  column: index % COLUMNS,
  row: Math.floor(index / COLUMNS),
})).sort((a, b) => a.column + a.row - (b.column + b.row));

function pickRandom(candidates: readonly number[]) {
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function nextBooked(booked: ReadonlySet<number>) {
  const all = Array.from({ length: TILE_COUNT }, (_, index) => index);
  const free = all.filter((index) => !booked.has(index));
  const taken = all.filter((index) => booked.has(index));
  const next = new Set(booked);

  if (booked.size <= MIN_BOOKED) next.add(pickRandom(free));
  else if (booked.size >= MAX_BOOKED) next.delete(pickRandom(taken));
  else if (Math.random() < 0.5) next.add(pickRandom(free));
  else next.delete(pickRandom(taken));

  return next;
}

const OBJECTS: readonly Box[] = [
  { x: 2, y: 10, z: 0, w: 2.4, d: 2.4, h: 5 },
  { x: 3, y: 3, z: 0, w: 1.6, d: 1.6, h: 1.6 },
  { x: 19, y: 6, z: 0, w: 2, d: 2, h: 2 },
  { x: 20.5, y: 14, z: 0, w: 1.4, d: 1.4, h: 1.4 },
  { x: 11, y: 3.5, z: 0, w: 1.2, d: 1.2, h: 1.2 },
  { x: 14, y: 19, z: 0, w: 1.2, d: 1.2, h: 3 },
];

function depth(box: Box) {
  return box.x + box.w / 2 + box.y + box.d / 2;
}

const SORTED_OBJECTS = [...OBJECTS].sort((a, b) => depth(a) - depth(b));
const BEFORE_SLAB = SORTED_OBJECTS.filter((box) => depth(box) < depth(SLAB));
const AFTER_SLAB = SORTED_OBJECTS.filter((box) => depth(box) >= depth(SLAB));

const GRID_LINES = Array.from({ length: GRID + 1 }, (_, index) => index);

const RING = Array.from({ length: 48 }, (_, index) => {
  const angle = (index / 48) * Math.PI * 2;
  return [18 + Math.cos(angle) * 2.2, 19 + Math.sin(angle) * 2.2, 0] as const;
});

const CELL_LINES = Array.from({ length: 8 }, (_, index) => index);

export function CaseArt() {
  const [booked, setBooked] = useState<ReadonlySet<number>>(() => new Set(INITIAL_BOOKED));
  const [paused, setPaused] = useState(false);
  const maskId = useId();
  const gradientId = useId();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;
    const timer = window.setInterval(() => setBooked(nextBooked), TICK_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  function toggle(index: number) {
    setBooked((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  const arcStart = project([3.2, 11.2, 5]);
  const arcEnd = project([20.5, 14.7, 1.4]);
  const arcPeak = project([12, 9, 11]);

  return (
    <svg
      viewBox="-540 0 1080 390"
      aria-hidden
      className="block h-auto w-full"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      fill="none"
      strokeWidth={1}
    >
      <defs>
        <radialGradient id={gradientId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.35" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-540" y="0" width="1080" height="390">
          <ellipse cx="0" cy="330" rx="540" ry="330" fill={`url(#${gradientId})`} />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`} className="stroke-border">
        {GRID_LINES.map((index) => (
          <g key={index}>
            <path d={line([index, 0, 0], [index, GRID, 0])} />
            <path d={line([0, index, 0], [GRID, index, 0])} />
          </g>
        ))}
        <polygon
          points={polygon([
            [5.5, 7.5, 0],
            [18.5, 7.5, 0],
            [18.5, 18, 0],
            [5.5, 18, 0],
          ])}
          strokeDasharray="3 5"
          className="stroke-muted/50"
        />
        <polygon points={polygon(RING)} strokeDasharray="2 4" className="stroke-muted/50" />
      </g>

      {BEFORE_SLAB.map((box) => (
        <Cuboid key={`${box.x}-${box.y}`} {...box} />
      ))}

      <Cuboid {...SLAB} />
      <g className="stroke-muted/35">
        {CELL_LINES.map((index) => (
          <path
            key={`x-${index}`}
            d={line(
              [SLAB.x + index * CELL, SLAB.y, SLAB.h],
              [SLAB.x + index * CELL, SLAB.y + SLAB.d, SLAB.h],
            )}
          />
        ))}
        {CELL_LINES.slice(0, 6).map((index) => (
          <path
            key={`y-${index}`}
            d={line(
              [SLAB.x, SLAB.y + index * CELL, SLAB.h],
              [SLAB.x + SLAB.w, SLAB.y + index * CELL, SLAB.h],
            )}
          />
        ))}
      </g>
      {TILES.map(({ index, column, row }) => (
        <g
          key={index}
          onClick={() => toggle(index)}
          className={cn(
            "cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-2",
            booked.has(index) && "-translate-y-6",
          )}
        >
          <Cuboid
            x={SLAB.x + column * CELL + 0.12}
            y={SLAB.y + row * CELL + 0.12}
            z={SLAB.h}
            w={CELL - 0.24}
            d={CELL - 0.24}
            h={TILE_HEIGHT}
            topClass={booked.has(index) ? "fill-accent/20" : "fill-paper"}
          />
        </g>
      ))}

      {AFTER_SLAB.map((box) => (
        <Cuboid key={`${box.x}-${box.y}`} {...box} />
      ))}

      <path
        d={`M${arcStart.join(" ")}Q${arcPeak.join(" ")} ${arcEnd.join(" ")}`}
        strokeDasharray="2 5"
        className="stroke-muted"
      />
      <circle cx={arcStart[0]} cy={arcStart[1]} r="3" className="fill-ink" />
      <circle cx={arcEnd[0]} cy={arcEnd[1]} r="3" className="fill-accent" />
    </svg>
  );
}
