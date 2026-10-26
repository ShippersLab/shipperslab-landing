"use client";

import { ProjectCard } from "@/components/sections/casos/project-card";
import { SoonCard } from "@/components/sections/casos/soon-card";
import { Reveal } from "@/components/ui/animation/reveal";
import { Container } from "@/components/ui/section/container";
import { PageHeader } from "@/components/ui/section/page-header";
import { useI18n } from "@/i18n/provider";
import { estacionarImages } from "@/lib/projects/estacionar";
import { eventopsImages } from "@/lib/projects/eventops";

const GRID_DELAY = 400;
const SECOND_DELAY = 520;
const SOON_DELAY = 640;

export function Casos() {
  const { messages } = useI18n();
  const page = messages.casos;

  return (
    <div className="mx-auto w-full max-w-content border-x border-border">
      <Container className="py-20 sm:py-28">
        <PageHeader title={page.title} description={page.description} />
      </Container>

      <Container className="w-full border-t border-border py-16 sm:py-20 md:py-28">
        <div className="grid gap-x-12 gap-y-20 md:grid-cols-2">
          <Reveal delay={GRID_DELAY} className="h-full">
            <ProjectCard
              href="/casos/eventops"
              image={eventopsImages.hero}
              imageAlt={page.eventops.heroAlt}
              tags={page.eventops.tags}
              title={page.eventops.title}
              summary={page.eventops.summary}
              priority
            />
          </Reveal>
          <Reveal delay={SECOND_DELAY} className="h-full">
            <ProjectCard
              href="/casos/estacionar"
              image={estacionarImages.cover}
              imageAlt={page.estacionar.heroAlt}
              tags={page.estacionar.tags}
              title={page.estacionar.title}
              summary={page.estacionar.summary}
            />
          </Reveal>
        </div>

        <Reveal delay={SOON_DELAY} className="mt-12 sm:mt-16">
          <SoonCard
            title={page.soon.title}
            description={page.soon.description}
            cta={page.ctaButton}
          />
        </Reveal>
      </Container>
    </div>
  );
}
