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

gsap.utils.toArray(".drop-down").forEach((el) => {
  console.log(el);
  gsap.from(el, {
    yPercent: -100,
    opacity: 0,
    delay: 0.2,
    duration: 0.75,
    transformOrigin: "top center",
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
      once: true, // animation only happens once
    },
  });
});

const heroMotionElements = gsap.utils.toArray(".hero-motion");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: heroMotionElements[0],
    start: "top 90%",
    toggleActions: "play none none none",
    once: true,
  },
});

// Slide in the entire container (text + border)
tl.from(heroMotionElements, {
  xPercent: -100,
  opacity: 0,
  duration: 0.75,
  ease: "power2.out",
  delay: 1.125,
  stagger: 0.25,
});

// Animate each .border-line individually
tl.to(
  heroMotionElements.map((el) => el.querySelector(".border-line")),
  {
    scaleY: 1,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.25,
  },
  "+=0.5" // overlaps with the entrance motion
);

const asciiEyes = gsap.utils.toArray(".eye");

const eyeTl = gsap.timeline({
  scrollTrigger: {
    trigger: asciiEyes[0],
    start: "top 50%",
    toggleActions: "play none none none",
    once: true,
  },
});

eyeTl.from(asciiEyes, {
  opacity: 0,
  scale: 0.55,
  duration: 0.05,
  ease: "power1.inOut",
  delay: 0.25,
  stagger: 0.05,
});
