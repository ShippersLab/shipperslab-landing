import { PolaroidImageCard } from "@/components/sections/events/polaroid-image-card";
import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";

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

export function PolaroidGallery({ items, delay = 0 }: PolaroidGalleryProps) {
  return (
    <StaggerReveal
      delay={delay}
      className="flex flex-wrap items-start justify-center gap-6 sm:justify-start"
    >
      {items.map((item, index) => (
        <PolaroidImageCard
          key={item.caption ?? item.imageAlt}
          image={item.image}
          imageAlt={item.imageAlt ?? item.caption ?? ""}
          caption={item.caption}
          label={item.label}
          rotate={index % 2 === 0}
        />
      ))}
    </StaggerReveal>
  );
}
