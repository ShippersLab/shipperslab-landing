import { PlusIcon } from "@/components/ui/icons";
import { TextureButton } from "@/components/ui/button/texture-button";
import { LocalizedLink } from "@/i18n/link";

type SoonCardProps = {
  title: string;
  description: string;
  cta: string;
};

export function SoonCard({ title, description, cta }: SoonCardProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-muted/35 px-6 py-16 text-center sm:py-20">
      <span className="flex size-12 items-center justify-center rounded-md border border-muted/35">
        <PlusIcon className="size-6 text-muted" />
      </span>
      <h2 className="mt-6 font-heading text-2xl text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-base text-muted">{description}</p>
      <TextureButton asChild variant="primary" size="square" className="mt-8 w-full sm:w-auto">
        <LocalizedLink href="/empecemos">{cta}</LocalizedLink>
      </TextureButton>
    </div>
  );
}
