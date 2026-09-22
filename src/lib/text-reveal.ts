import { gsap, SplitText } from "@/lib/gsap";

export const TEXT_REVEAL_DURATION = 0.3;
export const TEXT_REVEAL_STAGGER = 0.025;
export const TEXT_REVEAL_Y = 14;

type RevealWordsOptions = {
  delay?: number;
  position?: gsap.Position;
  timeline?: gsap.core.Timeline;
  scrollTrigger?: object;
};

export function revealWords(target: Element, options: RevealWordsOptions = {}) {
  const split = SplitText.create(target, { type: "words" });

  gsap.set(target, { autoAlpha: 1 });

  const vars: gsap.TweenVars = {
    autoAlpha: 1,
    y: 0,
    duration: TEXT_REVEAL_DURATION,
    stagger: TEXT_REVEAL_STAGGER,
    ease: "power2.out",
    delay: options.delay,
    scrollTrigger: options.scrollTrigger,
  };

  const tween = options.timeline
    ? options.timeline.fromTo(
        split.words,
        { autoAlpha: 0, y: TEXT_REVEAL_Y },
        vars,
        options.position,
      )
    : gsap.fromTo(split.words, { autoAlpha: 0, y: TEXT_REVEAL_Y }, vars);

  return { split, tween };
}
