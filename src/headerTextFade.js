import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function setupScrollAnimations() {
  // Kill any existing triggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  const icon = document.querySelector(".icon-text");
  const content = document.querySelector(".content");
  const lastProjectCard = document.querySelector(
    ".projects-wrapper .project-card:last-child"
  );
  const projects = document.querySelector(".projects");
  gsap.set(icon, { yPercent: 20 });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: content,
        start: "top top",
        end: "+=150",
        scrub: true,
      },
    })
    .to(icon, {
      opacity: 1,
      yPercent: 0,
      ease: "expo.in",
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

// Re-run after Astro View Transitions
document.addEventListener("DOMContentLoaded", () => {
  // Delay until DOM is fully painted
  requestAnimationFrame(() => {
    setTimeout(() => {
      setupScrollAnimations();
    }, 0); // if needed, increase to 50ms or 100ms
  });
});
