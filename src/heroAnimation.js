import { gsap } from "gsap";

export function animateHeroCopy() {
  const heroMotionElements = gsap.utils.toArray(".hero-motion");
  if (!heroMotionElements.length) return; // Exit if no targets found

  const tl = gsap.timeline();
  tl.to(heroMotionElements, { opacity: 1, duration: 0 });
  // Slide in the entire container (text + border)
  tl.from(heroMotionElements, {
    xPercent: -100,
    opacity: 0,
    duration: 0.75,
    ease: "power2.out",
    delay: 0.75,
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
    "+=0.5", // slight delay after the first animation
  );
}
