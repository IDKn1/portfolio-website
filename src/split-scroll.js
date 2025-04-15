import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// rough reference from: https://gsap.com/community/forums/topic/40575-divide-a-site-into-two-equal-parts-and-have-different-scroll-speeds/

gsap.registerPlugin(ScrollTrigger);

export default function initSplitScroll() {
  const container = document.querySelector("#verticalContainer");
  const left = document.querySelector(".left-section");
  const right = document.querySelector(".right-section");

  if (!left || !right || !container) return;

  const leftHeight = left.scrollHeight;
  const rightHeight = right.scrollHeight;

  // calculate distances each column needs to scroll
  const leftScroll = leftHeight - window.innerHeight;
  const rightScroll = rightHeight - window.innerHeight;

  // set initial height to avoid whitespace at start
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

      // move left normally
      gsap.set(left, {
        y: -leftScroll * progress,
      });

      // move right proportionally based on its own scroll height
      gsap.set(right, {
        y: -rightScroll * progress,
      });

      // adjust container height based on visible content so that when they translate it doesn't leave blank space at the bottom
      const leftVisible = leftHeight - leftScroll * progress;
      const rightVisible = rightHeight - rightScroll * progress;
      container.style.height = `${Math.max(leftVisible, rightVisible)}px`;
    },
  });

  ScrollTrigger.refresh();
}
