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

  if (!loader || !first || !dash || !last) {
    console.error("Required elements not found");
    callback?.();
    return;
  }

  tl.add("first-move");

  tl.fromTo(
    first,
    { xPercent: -200 },
    { xPercent: -5, duration: 1, delay: 0.75, ease: "power2.out" },
    "first-move",
  );

  tl.fromTo(
    last,
    { xPercent: 200 },
    { xPercent: 5, duration: 1, delay: 0.75, ease: "expo.out" },
    "first-move",
  );

  tl.add("second-move");

  extras.forEach((element) => {
    const originalWidth = element.offsetWidth;

    tl.fromTo(
      element,
      {
        width: `${originalWidth}px`,
      },
      {
        width: "0px",
        duration: 0.5,
        ease: "power1.out",
      },
      "second-move+=0.25",
    );
  });

  tl.add("third-move");

  tl.fromTo(
    dash,
    { width: "0px", opacity: 0 },
    { opacity: 1, width: "auto", ease: "back.out", duration: 0.4 },
    ">0.5",
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

  return tl;
}
