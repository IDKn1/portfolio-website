import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function initSplitScroll() {
  const container = document.querySelector("#verticalContainer");
  const left = document.querySelector(".left-section");
  const right = document.querySelector(".right-section");

  if (!left || !right || !container) return;

  const leftHeight = left.scrollHeight;
  const rightHeight = right.scrollHeight;

  const leftScroll = leftHeight - window.innerHeight;
  const rightScroll = rightHeight - window.innerHeight;

  // Set initial height to avoid whitespace at start
  container.style.height = `${Math.max(leftHeight, rightHeight)}px`;

  // Create a shared ScrollTrigger for left
  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: `+=${leftScroll}`,
    scrub: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      // Move left normally
      gsap.set(left, {
        y: -leftScroll * progress,
      });

      // Move right proportionally based on its own scroll height
      gsap.set(right, {
        y: -rightScroll * progress,
      });

      // Adjust container height based on visible content
      const leftVisible = leftHeight - leftScroll * progress;
      const rightVisible = rightHeight - rightScroll * progress;
      container.style.height = `${Math.max(leftVisible, rightVisible)}px`;
    },
  });

  ScrollTrigger.refresh();
}
