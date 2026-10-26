import { gsap } from "@/lib/animation/gsap";

type RevealOptions = {
  trigger: Element;
  targets: gsap.TweenTarget;
  from: gsap.TweenVars;
  duration: number;
  delay: number;
  stagger?: number;
};

export function scrollReveal({ trigger, targets, from, duration, delay, stagger }: RevealOptions) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(
      targets,
      { opacity: 0, ...from },
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration,
        delay,
        stagger,
        ease: "ease-out",
        clearProps: "all",
        scrollTrigger: { trigger, start: "top 88%", once: true },
      },
    );
  });

  return () => mm.revert();
}

type StaggerOptions = {
  trigger: Element;
  targets: gsap.TweenTarget;
  delay: number;
};

export function staggerReveal({ trigger, targets, delay }: StaggerOptions) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(
      targets,
      { opacity: 0, y: 10, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        delay,
        stagger: 0.13,
        ease: "ease-out",
        clearProps: "all",
        scrollTrigger: { trigger, start: "top 85%", once: true },
      },
    );
  });

  return () => mm.revert();
}
