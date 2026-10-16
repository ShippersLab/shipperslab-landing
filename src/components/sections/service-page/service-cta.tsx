import Link from "next/link";

import { Reveal } from "@/components/ui/animation/reveal";
import { TextureButton } from "@/components/ui/button/texture-button";

const CTA_DELAY = 0.2;

type ServiceCtaProps = {
  title: string;
  description: string;
  button: string;
};

export function ServiceCta({ title, description, button }: ServiceCtaProps) {
  return (
    <Reveal
      delay={CTA_DELAY * 1000}
      className="mt-16 flex w-full flex-col items-start gap-5 rounded-lg border border-border p-8 sm:mt-20 sm:p-10"
    >
      <h2 className="text-2xl text-ink">{title}</h2>
      <p className="max-w-2xl text-base text-muted">{description}</p>
      <TextureButton asChild variant="primary" size="pill" className="w-full sm:w-auto">
        <Link href="/empecemos">{button}</Link>
      </TextureButton>
    </Reveal>
  );
}
