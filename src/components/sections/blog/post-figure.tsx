import { BlurInImage } from "@/components/ui/animation/blur-in-image";

type BlogPostFigureProps = {
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  };
};

export function BlogPostFigure({ image }: BlogPostFigureProps) {
  return (
    <figure className="mt-6">
      <BlurInImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1024px) 672px, 100vw"
        className="h-auto w-full rounded-lg border border-border bg-paper"
      />
      <figcaption className="mt-3 text-sm leading-relaxed text-muted">{image.caption}</figcaption>
    </figure>
  );
}
