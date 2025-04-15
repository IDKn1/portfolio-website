import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// rough reference from: https://gsap.com/community/forums/topic/40575-divide-a-site-into-two-equal-parts-and-have-different-scroll-speeds/

export default function initSplitScroll() {
  const container = document.querySelector("#verticalContainer");
  const left = document.querySelector(".left-section");
  const right = document.querySelector(".right-section");

  // early exit if the required dom elements don't exist
  if (!left || !right || !container) return;

  const leftHeight = left.scrollHeight;
  const rightHeight = right.scrollHeight;

  // calculating the amount each needs to scroll
  const leftScroll = leftHeight - window.innerHeight;
  const rightScroll = rightHeight - window.innerHeight;

  let currentHeight = Math.max(leftHeight, rightHeight);
  container.style.height = `${currentHeight}px`;

  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: `+=${Math.max(leftScroll, rightScroll)}`,
    scrub: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      const newLeftY = -leftScroll * progress;
      const newRightY = -rightScroll * progress;

      gsap.set(left, { y: newLeftY });
      gsap.set(right, { y: newRightY });

      // upper and lower bounds for the size the verticalContainer can be when lerping
      const leftVisible = leftHeight + newLeftY;
      const rightVisible = rightHeight + newRightY;
      const minHeight = window.innerHeight;

      const targetHeight = Math.max(leftVisible, rightVisible, minHeight);

      // lerp on container height adjustment to keep from the translations causing a bunch of dead space at the bottom
      currentHeight += (targetHeight - currentHeight) * 0.2;
      container.style.height = `${currentHeight}px`;
    },
  });

  ScrollTrigger.refresh();
}
