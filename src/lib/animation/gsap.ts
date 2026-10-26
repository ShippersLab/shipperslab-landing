import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

CustomEase.create("ease-out", "0.23, 1, 0.32, 1");

gsap.defaults({ duration: 0.5, ease: "power3.out" });

export { gsap, ScrollTrigger, SplitText, useGSAP };
