import { type StaticImageData } from "next/image";

import { TagTabs } from "@/components/sections/casos/tag-tabs";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { LocalizedLink } from "@/i18n/link";

type ProjectCardProps = {
  href: string;
  image: StaticImageData;
  imageAlt: string;
  tags: readonly string[];
  title: string;
  summary: string;
  priority?: boolean;
};

export function ProjectCard({
  href,
  image,
  imageAlt,
  tags,
  title,
  summary,
  priority,
}: ProjectCardProps) {
  return (
    <LocalizedLink
      href={href}
      className="group flex h-full flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <TagTabs tags={tags} />
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <SkeletonImage
          src={image}
          alt={imageAlt}
          fill
          preload={priority}
          fetchPriority={priority ? "high" : "auto"}
          quality={90}
          sizes="(min-width: 1200px) 544px, (min-width: 768px) calc((100vw - 112px) / 2), 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-6 flex flex-1 items-start justify-between gap-8">
        <div>
          <h2 className="font-heading text-2xl text-ink">{title}</h2>
          <p className="mt-2 text-base text-muted">{summary}</p>
        </div>
        <ArrowUpRightIcon className="mt-1 size-6 shrink-0 text-muted transition-[color,translate] duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
      </div>
    </LocalizedLink>
  );
}
