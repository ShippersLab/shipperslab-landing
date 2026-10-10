"use client";

import Image, { type ImageProps } from "next/image";
import type { ImgHTMLAttributes } from "react";
import Zoom, { type UncontrolledProps } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { cn } from "@/lib/utils";

export interface ImageZoomProps extends ImageProps {
  zoomInProps?: ImgHTMLAttributes<HTMLImageElement>;
  zoomProps?: Omit<UncontrolledProps, "children">;
}

function getImageSrc(src: ImageProps["src"]): string {
  if (typeof src === "string") return src;
  if ("default" in src) return src.default.src;
  return src.src;
}

export function ImageZoom({ zoomInProps, zoomProps, className, ...props }: ImageZoomProps) {
  return (
    <Zoom
      zoomMargin={20}
      wrapElement="span"
      {...zoomProps}
      zoomImg={{
        src: getImageSrc(props.src),
        sizes: undefined,
        className: cn("cursor-zoom-out", zoomInProps?.className),
        ...zoomInProps,
      }}
    >
      <Image className={cn("cursor-zoom-in", className)} {...props} />
    </Zoom>
  );
}
