import { LinkPreview } from "@/components/ui/link-preview";
import { eventopsImages } from "@/lib/projects/eventops";
import { tuturneroImages } from "@/lib/projects/tuturnero";
import { site } from "@/lib/site";

const LINK_TOKEN = /\{([^}]+)\}/;

const PROJECTS = {
  EventOps: { url: site.eventopsUrl, image: eventopsImages.hero },
  Tuturnero: { url: site.tuturneroUrl, image: tuturneroImages.hero },
} as const;

type ProjectLabel = keyof typeof PROJECTS;

type DescriptionWithLinkProps = {
  text: string;
  opensNewTab: string;
  previewAlts: Record<ProjectLabel, string>;
};

function isProjectLabel(label: string): label is ProjectLabel {
  return label in PROJECTS;
}

export function DescriptionWithLink({ text, opensNewTab, previewAlts }: DescriptionWithLinkProps) {
  const [before, label, after] = text.split(LINK_TOKEN);

  if (!label) {
    return text;
  }

  if (!isProjectLabel(label)) {
    return `${before}${label}${after}`;
  }

  const project = PROJECTS[label];

  return (
    <>
      {before}
      <LinkPreview
        url={project.url}
        imageSrc={project.image}
        alt={previewAlts[label]}
        width={320}
        height={180}
        className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {label}
        <span className="sr-only"> ({opensNewTab})</span>
      </LinkPreview>
      {after}
    </>
  );
}
