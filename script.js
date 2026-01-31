const eventDate = new Date("July 12, 2026 15:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    countdown.innerHTML = "C'est le grand jour 🎉";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  countdown.innerHTML = `${days} jours avant le jour J`;
}, 1000);

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

