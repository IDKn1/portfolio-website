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

function animateAsciiArt() {
  const preElement = document.querySelector(".split");
  const lines = splitIntoLines(preElement);

  const tl = gsap.timeline({ delay: 0.75 });

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

// Call this function to start the animation
animateAsciiArt();
