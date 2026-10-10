import { FramedImage } from "@/components/sections/casos/framed-image";
import { PlusIcon } from "@/components/ui/icons";

type SoonCardProps = {
  label: string;
  title: string;
  description: string;
};

export function SoonCard({ label, title, description }: SoonCardProps) {
  return (
    <div className="flex h-full flex-col">
      <FramedImage tabs={[label]} frameClassName="border-dashed">
        <div className="flex aspect-video items-center justify-center rounded-md bg-ink/5">
          <PlusIcon className="size-10 text-ink/30" />
        </div>
      </FramedImage>
      <div className="mt-5 flex-1 px-1">
        <h2 className="font-pixel text-2xl text-ink">{title}</h2>
        <p className="mt-2 text-base text-muted">{description}</p>
      </div>
    </div>
  );
}
