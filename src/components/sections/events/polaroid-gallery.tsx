"use client";

import { PolaroidImageCard } from "@/components/sections/events/polaroid-image-card";
import { Reveal } from "@/components/ui/animation/reveal";

type PolaroidItem = {
  image?: string;
  imageAlt?: string;
  caption?: string;
  label?: string;
};

type PolaroidGalleryProps = {
  items: PolaroidItem[];
  delay?: number;
};

const ITEM_STAGGER = 0.1;

export function PolaroidGallery({ items, delay = 0 }: PolaroidGalleryProps) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6 sm:justify-start">
      {items.map((item, index) => (
        <Reveal key={item.caption ?? item.imageAlt} delay={(delay + index * ITEM_STAGGER) * 1000}>
          <PolaroidImageCard
            image={item.image}
            imageAlt={item.imageAlt ?? item.caption ?? ""}
            caption={item.caption}
            label={item.label}
            rotate={index % 2 === 0}
          />
        </Reveal>
      ))}
    </div>
  );
}
