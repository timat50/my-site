const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -72px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const machine = document.querySelector("[data-tilt]");
const hasPrecisePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (machine && hasPrecisePointer && !reducedMotion) {
  machine.addEventListener("pointermove", (event) => {
    const rect = machine.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    machine.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-4px)`;
  });

  machine.addEventListener("pointerleave", () => {
    machine.style.transform = "";
  });
}

const signalRows = document.querySelectorAll(".signal-list li");

if (signalRows.length && !reducedMotion) {
  let activeSignal = 0;

  const cycleSignal = () => {
    signalRows.forEach((row) => row.removeAttribute("data-active"));
    signalRows[activeSignal].setAttribute("data-active", "true");
    activeSignal = (activeSignal + 1) % signalRows.length;
  };

  cycleSignal();
  window.setInterval(cycleSignal, 1250);
}
