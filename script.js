const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const tiltTarget = document.querySelector("[data-tilt]");
const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (tiltTarget && canTilt && !prefersReducedMotion) {
  tiltTarget.addEventListener("pointermove", (event) => {
    const rect = tiltTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -5;
    const rotateY = x * 6;

    tiltTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  tiltTarget.addEventListener("pointerleave", () => {
    tiltTarget.style.transform = "";
  });
}

const statusRows = document.querySelectorAll(".check-list li");

if (statusRows.length && !prefersReducedMotion) {
  let activeIndex = 0;

  window.setInterval(() => {
    statusRows.forEach((row) => row.removeAttribute("data-active"));
    statusRows[activeIndex].setAttribute("data-active", "true");
    activeIndex = (activeIndex + 1) % statusRows.length;
  }, 1400);
}
