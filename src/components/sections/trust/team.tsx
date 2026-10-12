"use client";

import { TeamCard } from "@/components/sections/trust/team-card";
import { Reveal } from "@/components/ui/animation/reveal";
import { useI18n } from "@/i18n/provider";
import { team } from "@/lib/site";

export function Team() {
  const { messages } = useI18n();

  return (
    <>
      <Reveal className="mt-16 sm:mt-20">
        <p className="text-sm text-muted sm:text-base">{messages.trust.teamTitle}:</p>
      </Reveal>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {team.map((member, index) => (
          <Reveal key={member.id} as="li" delay={index * 80} className="h-full">
            <TeamCard member={member} />
          </Reveal>
        ))}
      </ul>
    </>
  );
}
