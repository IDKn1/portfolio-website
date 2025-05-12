import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function setupScrollAnimations() {
  // Kill any existing triggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  const reference = document.querySelector(".over-text .head-text");
  const content = document.querySelector(".content");
  const lastProjectCard = document.querySelector(
    ".projects-wrapper .project-card:last-child"
  );
  const projects = document.querySelector(".projects");

  if (!(reference && content && projects && lastProjectCard)) return;

  const referenceBottom =
    reference.getBoundingClientRect().bottom + window.scrollY;

  // 1. Fade in overlay
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

  // 2. Scale heading as last card scrolls up
  gsap
    .timeline({
      scrollTrigger: {
        trigger: lastProjectCard,
        start: () => `top ${referenceBottom}px`,
        end: () => `top+=150 ${referenceBottom}px`,
        scrub: true,
      },
    })
    .to(".over-text", {
      scale: 0.65,
      y: -50,
      zIndex: 0,
      ease: "power2.out",
    });

  // 3. Fade background + fade other cards
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

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  setupScrollAnimations();
});

// Re-run after Astro View Transitions
document.addEventListener("astro:after-swap", () => {
  // Delay until DOM is fully painted
  requestAnimationFrame(() => {
    setTimeout(() => {
      setupScrollAnimations();
    }, 0); // if needed, increase to 50ms or 100ms
  });
});
