"use client";

import Image from "next/image";

import { LinkedInIcon, PortfolioIcon, TwitterIcon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/provider";
import type { TeamMember } from "@/lib/site";

const NETWORK_ICONS = {
  Portfolio: PortfolioIcon,
  LinkedIn: LinkedInIcon,
  X: TwitterIcon,
};

export function TeamCard({ member }: { member: TeamMember }) {
  const { messages } = useI18n();
  const copy = messages.trust.team[member.id];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-paper">
      <div className="relative aspect-3/1 bg-border">
        <Image
          src={member.cover}
          alt=""
          fill
          sizes="(min-width: 640px) 568px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
        <div className="relative -mt-12 size-24 overflow-hidden sm:-mt-14 sm:size-28 rounded-full border-4 border-paper bg-border">
          {member.avatar ? (
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              sizes="112px"
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
        <p className="mt-2 font-mono text-label uppercase tracking-label text-muted">{copy.role}</p>
        <p className="mt-4 text-base text-muted">{copy.bio}</p>

        <ul className="mt-auto flex items-center gap-6 pt-6">
          {member.links.map((link) => {
            const Icon = NETWORK_ICONS[link.network];
            const label = messages.trust.socialLabel
              .replace("{name}", member.name)
              .replace("{network}", link.network);

            return (
              <li key={link.network}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="-m-3 flex rounded-md p-3 text-muted transition-colors duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <Icon size={20} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
