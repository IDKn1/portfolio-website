import gsap from "gsap";
export default function loader(callback) {
  const tl = gsap.timeline({
    onComplete: () => {
      if (typeof callback === "function") {
        callback();
      }
    },
  });

  const loader = document.getElementById("loader");
  const first = document.getElementById("nikolai");
  const dash = document.getElementById("en");
  const last = document.getElementById("suvanto");
  const extras = gsap.utils.toArray(".fade-out");
  const work = document.getElementById("work");
  tl.add("first-move");
  // Step 1: First enters
  tl.fromTo(
    first,
    {
      xPercent: -200,
      ease: "power2.out",
    },
    {
      xPercent: 10,
      duration: 1,
      delay: 0.75,
      ease: "power2.out",
    },
    "first-move",
  );

  // Step 2: Last name enters
  tl.fromTo(
    last,
    {
      xPercent: 200,
    },
    {
      xPercent: 5,
      duration: 1,
      delay: 0.75,
      ease: "expo.out",
    },
    "first-move", //same time as step 1
  );

  tl.add("second-move");
  // Step 3: Fade out extras start second movement
  tl.to(
    extras,
    {
      opacity: 0,
      delay: 0.25,
      ease: "expo.in",
      stagger: 0,
    },
    "second-move",
  );

  // Step 4: First moves again (to the right)
  tl.to(
    first,
    {
      xPercent: 85,
      duration: 0.75,
      delay: 0.5,
      ease: "back.inOut",
    },
    "second-move", // Slight delay after fade-out starts
  );

  tl.to(
    last,
    {
      xPercent: 10,
      duration: 0.75,
      delay: 0.5,
      ease: "back.inOut",
    },

    "second-move",
  );

  // Step 5: Dash fades in
  tl.fromTo(
    dash,
    {
      xPercent: 60,
      yPercent: 20,
      scale: 0.5,
      opacity: 0,
    },
    {
      opacity: 1,
      xPercent: 60,
      yPercent: 0,
      scale: 1,
      ease: "back.in",
      duration: 0.4,
    },
    ">0.1", // Start near the end of `last`'s entrance
  );

  tl.fromTo(
    // work pops in
    work,
    {
      transformOrigin: "top center",
      yPercent: 30,
      xPercent: 145,
      scaleY: 0,
    },
    {
      ease: "back.out",
      scaleY: 1,
    },
    ">0.1",
  );

  tl.to(
    loader,
    {
      scale: 0,
      duration: 0.75,
      ease: "power4.inOut",
    },
    ">0.5",
  );
}
