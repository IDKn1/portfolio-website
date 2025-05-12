import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  const reference = document.querySelector(".over-text .head-text");
  const content = document.querySelector(".content");
  const lastProjectCard = document.querySelector(
    ".projects-wrapper .project-card:last-child"
  );
  const projects = document.querySelector(".projects");
  // fade in overlay heading
  if (reference && content) {
    const referenceBottom =
      reference.getBoundingClientRect().bottom + window.scrollY;

    ScrollTrigger.create({
      trigger: content,
      start: () => `top ${referenceBottom}px`,
      onEnter: () => {
        gsap.to(".over-text", {
          opacity: 1,
          duration: 0,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(".over-text", {
          opacity: 0,
          duration: 0,
        });
      },
      toggleActions: "play none none reverse",
    });
  }

  if (lastProjectCard && projects) {
    const referenceBottom =
      reference.getBoundingClientRect().bottom + window.scrollY;
    // scale back heading based on
    gsap
      .timeline({
        scrollTrigger: {
          trigger: lastProjectCard,
          start: () => `top ${referenceBottom}px`,
          end: () => `top+=150 ${referenceBottom}px`, // Adjust 150px for scroll range
          scrub: true,
        },
      })
      .to(".over-text", {
        scale: 0.65,
        y: -50, // use `y` instead of translateY in GSAP
        zIndex: 0,
        ease: "power2.out",
      });

    const siblingsToFade = [...projects.querySelectorAll(":scope > *")].filter(
      (el) => !el.contains(lastProjectCard)
    );
    gsap
      .timeline({
        scrollTrigger: {
          trigger: lastProjectCard,
          start: "bottom-=700 top",
          end: "bottom-=400 top",
          scrub: true,
        },
      })
      .to(
        ".over-text",
        {
          color: "#eee",
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        lastProjectCard,
        {
          backgroundColor: "transparent",
          ease: "power2.in",
        },
        0
      )
      .to(
        siblingsToFade,
        {
          opacity: 0,
          duration: 0.1,
        },
        0
      );
  }
});
