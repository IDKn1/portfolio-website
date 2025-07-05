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
    { xPercent: -150 },
    { xPercent: -5, duration: 0.75, delay: 0.5, ease: "power4.out" },
    "first-move",
  );

  tl.fromTo(
    last,
    { xPercent: 150 },
    { xPercent: 5, duration: 0.75, delay: 0.5, ease: "power4.out" },
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
        duration: 0.6,
        ease: "power1.out",
      },
      "second-move+=0.4",
    );
  });

  tl.add("third-move");

  tl.fromTo(
    dash,
    { width: "0px", opacity: 0 },
    {
      opacity: 1,
      width: "auto",
      transformOrigin: "center",
      ease: "back.out(3)",
      duration: 0.4,
    },
    ">.4",
  );

  tl.to(
    loader,
    {
      yPercent: -100,
      duration: 0.75,
      ease: "power3.in",
    },
    ">0.5",
  ).to(
    [first, last, dash],
    {
      opacity: 0,
      duration: 0.25,
    },
    ">-0.35",
  );

  return tl;
}
