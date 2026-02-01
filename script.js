const countdown = document.getElementById("countdown");

// Date de l'événement (12 juillet 2026 à 15h00)
const eventDate = new Date(2026, 6, 12, 15, 0, 0); 
// ⚠️ Mois = 6 → juillet (les mois commencent à 0)

function updateCountdown() {
  if (!countdown) return;

  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdown.innerHTML = "C’est le grand jour 🎉";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdown.innerHTML = `
    <strong>${days}</strong> jours ·
    <strong>${hours}</strong> h ·
    <strong>${minutes}</strong> min ·
    <strong>${seconds}</strong> s
  `;
}

// 🔥 affichage immédiat (supprime la latence)
updateCountdown();

// 🔁 mise à jour chaque seconde
setInterval(updateCountdown, 1000);

const form = document.getElementById("rsvp-form");
const thankYou = document.getElementById("thank-you");

if (form) {
  form.addEventListener("submit", function () {
    setTimeout(() => {
      form.classList.add("hidden");
      thankYou.classList.remove("hidden");
    }, 500);
  });
}

// Fade-in au scroll
const sections = document.querySelectorAll(".section");

function checkVisible() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;

    if (top < triggerBottom) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkVisible);
window.addEventListener("load", checkVisible);


