"use client";

import { BlurReveal } from "@/components/ui/animation/blur-reveal";
import { TextureButton } from "@/components/ui/button/texture-button";
import { Container } from "@/components/ui/section/container";
import { useI18n } from "@/i18n/provider";

type CaseProductProps = {
  title: string;
  description: string;
  label: string;
  href: string;
};

export function CaseProduct({ title, description, label, href }: CaseProductProps) {
  const { messages } = useI18n();

  return (
    <section className="border-t border-border py-16 sm:py-20">
      <Container>
        <BlurReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>
          </div>
          <TextureButton asChild variant="primary" size="square" className="w-full sm:w-fit">
            <a href={href} target="_blank" rel="noopener noreferrer">
              {label}
              <span className="sr-only"> ({messages.common.opensNewTab})</span>
            </a>
          </TextureButton>
        </BlurReveal>
      </Container>
    </section>
  );
}
