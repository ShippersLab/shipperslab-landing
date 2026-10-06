import eventopsHero from "@/assets/images/eventops-hero.webp";
import { LinkPreview } from "@/components/ui/link-preview";
import { site } from "@/lib/site";

const LINK_TOKEN = /\{([^}]+)\}/;

type DescriptionWithLinkProps = {
  text: string;
  opensNewTab: string;
  previewAlt: string;
};

export function DescriptionWithLink({ text, opensNewTab, previewAlt }: DescriptionWithLinkProps) {
  const [before, label, after] = text.split(LINK_TOKEN);

  if (!label) {
    return text;
  }

  return (
    <>
      {before}
      <LinkPreview
        url={site.eventopsUrl}
        imageSrc={eventopsHero}
        alt={previewAlt}
        width={320}
        height={200}
        className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {label}
        <span className="sr-only"> ({opensNewTab})</span>
      </LinkPreview>
      {after}
    </>
  );
}
