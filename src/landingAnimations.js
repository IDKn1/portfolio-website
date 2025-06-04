import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function setupScrollAnimations() {
  const icon = document.querySelector(".icon-text");
  const content = document.querySelector(".content");
  const projects = document.querySelector(".projects-wrapper");

  const lastProjectCard = document.querySelector(
    ".projects-wrapper .project-card:last-child"
  );

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

  const siblingsToFade = [...projects.querySelectorAll(":scope > *")].filter(
    (el) => !el.contains(lastProjectCard)
  );

  function scaleScrollDistance(minWidth, maxWidth, minScroll, maxScroll) {
    const screenWidth = window.innerWidth;

    // Clamp screen width between minWidth and maxWidth
    const clampedWidth = Math.min(Math.max(screenWidth, minWidth), maxWidth);

    // Normalize to 0–1
    const t = (clampedWidth - minWidth) / (maxWidth - minWidth);

    // Interpolate scroll distance
    return minScroll + t * (maxScroll - minScroll);
  }

  let cardFadeBP;
  if (window.innerWidth > 800) {
    cardFadeBP = scaleScrollDistance(800, 1100, 250, 300);
  } else {
    cardFadeBP = scaleScrollDistance(300, 800, 200, 250);
  }

  console.log(cardFadeBP);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: lastProjectCard,
        start: `top top+=${cardFadeBP}`,
        end: "top+=50",
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

document.addEventListener("DOMContentLoaded", () => {
  // Delay until DOM is fully painted
  requestAnimationFrame(() => {
    setTimeout(() => {
      setupScrollAnimations();
    }, 50); // if needed, increase to 50ms or 100ms
  });
});
