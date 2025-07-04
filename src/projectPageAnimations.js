import { gsap } from "gsap";

export default function pageWipe() {
  const transitionCover = document.getElementById("transition-cover");
  const left = document.getElementById("left-section");
  const right = document.getElementById("right-section");

  const tl = gsap.timeline();

  if (transitionCover && left && right) {
    tl.set(left, { xPercent: -100 });
    if (window.innerWidth > 850) {
      tl.set(right, { xPercent: 100 });
    } else {
      tl.set(right, { xPercent: -100 });
    }
    tl.set(transitionCover, {
      yPercent: 0,
      position: "fixed",
    })
      .to(transitionCover, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      })
      .to([left, right], {
        xPercent: 0,
        duration: 0.5,
        delay: 0.125,
        stagger: 0.4,
        ease: "power2.out",
      });
  }
}
