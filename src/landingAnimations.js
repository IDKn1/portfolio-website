import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// card stack animations

gsap.registerPlugin(ScrollTrigger);

function setupCardStackAnimation(wrapperSelector) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;

  const cards = [...wrapper.querySelectorAll(":scope > .project-card")];
  if (cards.length === 0) return;

  const lastCard = cards[cards.length - 1];
  const siblingsToFade = cards.slice(0, -1);

  function scaleScrollDistance(minWidth, maxWidth, minScroll, maxScroll) {
    const screenWidth = window.innerWidth;
    const clampedWidth = Math.min(Math.max(screenWidth, minWidth), maxWidth);
    const t = (clampedWidth - minWidth) / (maxWidth - minWidth);
    return minScroll + t * (maxScroll - minScroll);
  }

  let cardFadeBP;
  if (window.innerWidth > 850) {
    cardFadeBP = scaleScrollDistance(800, 1100, 300, 350);
  } else {
    cardFadeBP = scaleScrollDistance(300, 800, 250, 300);
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: lastCard,
      start: `top top+=${cardFadeBP}`,
      end: "bottom",
      scrub: true,
    },
  });

  siblingsToFade.forEach((el, i) => {
    tl.to(
      el,
      {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "bottom center",
        ease: "power2.out",
      },
      i * 0.03,
    );
  });
}

gsap.utils.toArray(".drop-down").forEach((el) => {
  // console.log(el);
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

function setupScrollAnimations() {
  // Apply animation to multiple stacks
  setupCardStackAnimation(".projects-wrapper");
  setupCardStackAnimation(".misc-wrapper");
}

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      setupScrollAnimations();
    }, 50);
  });
});
