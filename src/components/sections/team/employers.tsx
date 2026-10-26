"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";
import { useI18n } from "@/i18n/provider";

const EASE = [0.23, 1, 0.32, 1] as const;

const EMPLOYERS = [
  {
    name: "Mercado Libre",
    src: "/companies/mercado-libre.png",
    width: 445,
    height: 112,
    size: "h-8",
  },
  {
    name: "Coderhouse",
    src: "/companies/coderhouse.svg",
    width: 673,
    height: 81,
    size: "h-4",
  },
  {
    name: "PUMA",
    src: "/companies/puma.svg",
    width: 24,
    height: 18.5,
    size: "h-6",
  },
  {
    name: "NFTYDoor",
    src: "/companies/nftydoor.png",
    width: 738,
    height: 165,
    size: "h-6",
  },
];

type Employer = (typeof EMPLOYERS)[number];

function EmployerLogo({ name, src, width, height, size }: Employer) {
  return (
    <li className="flex h-8 items-center">
      <Image
        src={src}
        alt={name}
        width={width}
        height={height}
        unoptimized
        className={`${size} w-auto opacity-60 mix-blend-multiply grayscale select-none`}
      />
    </li>
  );
}

export function Employers() {
  const { messages } = useI18n();
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="mt-16"
      initial={reduce ? false : { opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <p className="text-center text-base text-muted">{messages.team.employersLine}</p>
      <Marquee className="mt-8">
        {EMPLOYERS.map((employer) => (
          <EmployerLogo key={employer.name} {...employer} />
        ))}
      </Marquee>
    </motion.div>
  );
}
