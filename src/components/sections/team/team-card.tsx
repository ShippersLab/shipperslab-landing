"use client";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { SkeletonImage } from "@/components/ui/skeleton/skeleton-image";
import { useI18n } from "@/i18n/provider";
import type { TeamMember } from "@/lib/site";

export function TeamCard({ member }: { member: TeamMember }) {
  const { messages } = useI18n();
  const copy = messages.team.members[member.id];
  const profileLabel = `${messages.team.profileLabel.replace("{name}", member.name)} (${messages.common.opensNewTab})`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-paper">
      <div className="relative aspect-3/1">
        <SkeletonImage
          src={member.cover}
          alt={messages.team.coverAlt.replace("{name}", member.name)}
          fill
          sizes="(min-width: 640px) 568px, 100vw"
          className="object-cover"
          quality={90}
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
        <div className="relative -mt-12 size-24 overflow-hidden sm:-mt-14 sm:size-28 rounded-full border-4 border-paper">
          {member.avatar ? (
            <SkeletonImage
              src={member.avatar}
              alt={member.name}
              fill
              sizes="112px"
              quality={90}
              className="object-cover"
            />
          ) : (
            <span
              role="img"
              aria-label={member.name}
              className="flex size-full items-center justify-center font-heading text-3xl text-ink sm:text-4xl"
            >
              {member.initials}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-xl text-ink sm:text-2xl">{member.name}</h3>
        <p className="mt-2 text-sm text-muted">{copy.role}</p>
        <p className="mt-4 text-base text-muted">{copy.bio}</p>

        <div className="mt-auto pt-6">
          <a
            href={member.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={profileLabel}
            className="group inline-flex items-center gap-1.5 rounded-sm text-sm text-muted transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {messages.team.profileLink}
            <ArrowUpRightIcon
              size={16}
              className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </article>
  );
}
