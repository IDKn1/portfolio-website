import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".fade-up").forEach((el) => {
  console.log(el);
  gsap.from(el, {
    y: 50,
    opacity: 0,
    scale: 0.85,
    duration: 0.75,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
      once: true, // animation only happens once
    },
  });
});
