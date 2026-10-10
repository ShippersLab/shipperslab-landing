import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { FramedImage } from "@/components/sections/casos/framed-image";
import { ArrowRightIcon } from "@/components/ui/icons";

type ProjectCardProps = {
  href: string;
  image: StaticImageData;
  imageAlt: string;
  title: string;
  summary: string;
  tags: readonly string[];
};

export function ProjectCard({ href, image, imageAlt, title, summary, tags }: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <FramedImage tabs={tags}>
        <div className="relative aspect-video overflow-hidden rounded-md bg-ink">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1200px) 560px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </FramedImage>
      <div className="mt-5 flex flex-1 items-start justify-between gap-6 px-1">
        <div>
          <h2 className="font-pixel text-2xl text-ink">{title}</h2>
          <p className="mt-2 text-base text-muted">{summary}</p>
        </div>
        <ArrowRightIcon className="mt-1.5 size-6 shrink-0 text-ink transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
