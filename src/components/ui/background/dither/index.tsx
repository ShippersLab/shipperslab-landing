"use client";

import { useRef } from "react";

import { toDitherSettings, type DitherProps } from "@/components/ui/background/dither/types";
import { useDither } from "@/components/ui/background/dither/use-dither";
import { cn } from "@/lib/utils";

export type { DitherProps } from "@/components/ui/background/dither/types";

export function Dither({ className, ...props }: DitherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDither(containerRef, canvasRef, toDitherSettings(props));

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("relative size-full overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block size-full" />
    </div>
  );
}
