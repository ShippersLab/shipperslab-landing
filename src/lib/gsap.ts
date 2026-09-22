import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

gsap.defaults({ duration: 0.8, ease: "power3.out" });

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP };
