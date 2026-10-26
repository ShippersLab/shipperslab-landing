"use client";

import { TeamCard } from "@/components/sections/team/team-card";
import { StaggerReveal } from "@/components/ui/animation/stagger-reveal";
import { team } from "@/lib/site";

export function Founders() {
  return (
    <StaggerReveal as="ul" className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2">
      {team.map((member) => (
        <li key={member.id} className="h-full">
          <TeamCard member={member} />
        </li>
      ))}
    </StaggerReveal>
  );
}
