import { gsap } from "gsap";

export function setupCardClickHandlers() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const linkEl = card.querySelector("a");
      const color = linkEl?.dataset.color;
      const href = linkEl?.getAttribute("href");
      const transitionCover = document.querySelector(".transition-cover");

      if (transitionCover && color && href) {
        e.preventDefault();

        // Get card's position on screen
        const rect = card.getBoundingClientRect();

        // Set initial position and size of the transition cover
        gsap.set(transitionCover, {
          backgroundColor: color,
          opacity: 1,
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          scale: 0,
          transformOrigin: "center center",
          zIndex: 9999,
          borderRadius: window.getComputedStyle(card).borderRadius, // optional: copy border radius
        });

        // Animate to fill the screen
        gsap.to(transitionCover, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          scale: 1,
          borderRadius: 0,
          duration: 1,
          ease: "expo.out",
          onComplete: () => {
            window.location.href = href;
          },
        });
      }
    });
  });
}
