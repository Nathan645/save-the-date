// ------------------- COMPTE À REBOURS -------------------
const countdown = document.getElementById("countdown");
const eventDate = new Date(2026, 6, 12, 15, 0, 0); // 12 juillet 2026 15h

function updateCountdown() {
  if (!countdown) return;
  const now = new Date();
  const diff = eventDate - now;
  if (diff <= 0) {
    countdown.innerHTML = "C’est le grand jour 🎉";
    return;
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600*24));
  const hours = Math.floor((totalSeconds % (3600*24))/3600);
  const minutes = Math.floor((totalSeconds % 3600)/60);
  const seconds = totalSeconds % 60;
  countdown.innerHTML = `<strong>${days}</strong> jours · <strong>${hours}</strong> h · <strong>${minutes}</strong> min · <strong>${seconds}</strong> s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ------------------- FADE-IN AU SCROLL -------------------
const sections = document.querySelectorAll(".section");

function checkVisible() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) section.classList.add("visible");
  });
}

window.addEventListener("scroll", checkVisible);
window.addEventListener("load", checkVisible);
