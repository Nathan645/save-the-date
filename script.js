// MENU MOBILE
const toggle = document.getElementById("menu-toggle");
const links = document.getElementById("menu-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

// COUNTDOWN
const countdown = document.getElementById("countdown");
if (countdown) {
  const eventDate = new Date("July 10, 2027 15:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff < 0) return;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdown.textContent = `${d}j ${h}h ${m}m ${s}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// RSVP LOGIC
const presence = document.getElementById("presence");
const addressBlock = document.getElementById("address-block");
const sleeping = document.getElementById("sleeping");
const sleepingOptions = document.getElementById("sleeping-options");

if (presence) {
  presence.addEventListener("change", () => {
    addressBlock.classList.toggle(
      "hidden",
      presence.value === "non" || presence.value === ""
    );
  });
}

if (sleeping) {
  sleeping.addEventListener("change", () => {
    sleepingOptions.classList.toggle("hidden", !sleeping.checked);
  });
}

// ANIMATION AU SCROLL
const elements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

elements.forEach(el => observer.observe(el));
