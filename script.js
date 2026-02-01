// MENU MOBILE
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

// COMPTE À REBOURS
const countdown = document.getElementById("countdown");
const eventDate = new Date(2026, 6, 12, 15, 0);

if (countdown) {
  setInterval(() => {
    const now = new Date();
    const diff = eventDate - now;
    if (diff <= 0) return countdown.innerHTML = "C’est le grand jour 🎉";

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff % 86400000 / 3600000);
    const m = Math.floor(diff % 3600000 / 60000);
    const s = Math.floor(diff % 60000 / 1000);

    countdown.innerHTML = `${d}j ${h}h ${m}m ${s}s`;
  }, 1000);
}
