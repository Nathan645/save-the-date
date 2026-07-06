/* ==========================================================
   APPARITIONS AU SCROLL
========================================================== */

const revealTargets = document.querySelectorAll(
  ".intro, .weekend, .domaine, .details, .gift, .footer"
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((element) => {
  revealObserver.observe(element);
});
