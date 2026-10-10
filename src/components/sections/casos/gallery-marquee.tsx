"use client";

import type { StaticImageData } from "next/image";

import { ImageZoom } from "@/components/ui/image-zoom";
import { useI18n } from "@/i18n/provider";

type GalleryMarqueeProps = {
  images: readonly StaticImageData[];
  alts: readonly string[];
};

const ITEM_CLASS = "shrink-0 overflow-hidden rounded-lg border border-border bg-ink";
const IMAGE_CLASS = "block h-auto w-80 sm:w-xl lg:w-3xl";
const IMAGE_SIZES = "(min-width: 1024px) 768px, (min-width: 640px) 576px, 320px";

function removeFromTabOrder(element: HTMLElement | null) {
  element?.querySelectorAll("button").forEach((button) => button.setAttribute("tabindex", "-1"));
}

export function GalleryMarquee({ images, alts }: GalleryMarqueeProps) {
  const { messages } = useI18n();
  const zoomProps = {
    a11yNameButtonZoom: messages.common.zoomImage,
    a11yNameButtonUnzoom: messages.common.closeImage,
  };

  return (
    <div className="group overflow-hidden motion-reduce:overflow-x-auto">
      <ul className="animate-marquee-horizontal flex w-max gap-4 group-hover:[animation-play-state:paused]">
        {images.map((image, index) => (
          <li key={alts[index]} className={ITEM_CLASS}>
            <ImageZoom
              src={image}
              alt={alts[index]}
              sizes={IMAGE_SIZES}
              quality={100}
              zoomProps={zoomProps}
              className={IMAGE_CLASS}
            />
          </li>
        ))}
        {images.map((image, index) => (
          <li
            key={`${alts[index]}-copy`}
            ref={removeFromTabOrder}
            aria-hidden="true"
            className={ITEM_CLASS}
          >
            <ImageZoom
              src={image}
              alt=""
              sizes={IMAGE_SIZES}
              quality={100}
              zoomProps={zoomProps}
              className={IMAGE_CLASS}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
