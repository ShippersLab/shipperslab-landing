import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({ duration: 0.8, ease: "power3.out" });

export { gsap, ScrollTrigger, useGSAP };
