"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonImage({ className, onLoad, onError, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  const imageRef = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <>
      <Skeleton
        className={cn(
          "absolute inset-0 rounded-none transition-opacity duration-500 ease-out",
          loaded && "animate-none opacity-0",
        )}
      />
      <Image
        ref={imageRef}
        {...props}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoaded(true);
          onError?.(event);
        }}
        className={cn(
          "transition-[opacity,filter] duration-700 ease-out",
          loaded ? "opacity-100 blur-none" : "opacity-0 blur-md",
          className,
        )}
      />
    </>
  );
}
