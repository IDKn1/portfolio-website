import { gsap } from "gsap";

function splitIntoLines(element) {
  const text = element.textContent;
  const lines = text.split("\n");

  element.innerHTML = "";

  lines.forEach((line, index) => {
    const lineSpan = document.createElement("span");
    lineSpan.textContent = line;
    lineSpan.classList.add("line");
    lineSpan.style.display = "block";
    element.appendChild(lineSpan);

    if (index < lines.length - 1) {
      element.appendChild(document.createTextNode("\n"));
    }
  });

  return element.querySelectorAll(".line");
}

export function animateAsciiArt() {
  const preElement = document.querySelector(".split");
  const lines = splitIntoLines(preElement);

  const tl = gsap.timeline();
  tl.to(preElement, { opacity: 1 });
  tl.fromTo(
    lines,
    {
      opacity: 0,
      x: -50,
      // rotationX: -90,
    },
    {
      opacity: 1,
      x: 0,
      rotationX: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    },
  );
}

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
    delay: 3.125,
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
