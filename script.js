/* MENU */
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");

if (menuToggle && menuLinks) {
  menuToggle.addEventListener("click", () => {
    menuLinks.classList.toggle("open");
  });
}

/* SCROLL ANIMATION */
const animatedElements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

animatedElements.forEach(el => observer.observe(el));

/* COUNTDOWN */
const countdown = document.getElementById("countdown");

if (countdown) {
  const weddingDate = new Date("2027-07-10T15:00:00");

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff < 0) {
      countdown.innerHTML = "🎉 C’est le grand jour !";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdown.innerHTML = `${d}j ${h}h ${m}m ${s}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* RSVP */
const form = document.getElementById("rsvp-form");

if (form) {
  const presence = form.presence;
  const presenceDetails = document.getElementById("presence-details");
  const sleeping = form.sleeping;
  const sleepDetails = document.getElementById("sleep-details");
  const success = document.getElementById("success-message");

  presence.addEventListener("change", () => {
    if (["samedi", "dimanche brunch", "les deux"].includes(presence.value)) {
      presenceDetails.classList.remove("hidden");
      presenceDetails.classList.add("visible");
    } else {
      presenceDetails.classList.add("hidden");
      sleepDetails.classList.add("hidden");
      sleeping.checked = false;
    }
  });

  sleeping.addEventListener("change", () => {
    sleepDetails.classList.toggle("hidden", !sleeping.checked);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    fetch("https://script.google.com/macros/s/AKfycbzXKltJ8exzJlMVIZW1R_A1EeLLv2c1znRnAUN8L_z7f6PxkIXkfW2tLU5fMg6uumrF/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });

    form.classList.add("hidden");
    success.classList.remove("hidden");
  });
}
