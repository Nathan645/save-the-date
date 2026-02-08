/*************************
 * CONFIG
 *************************/
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw88Xwb-Fozj33XCamVG4iny0c8oEczak4IST1SgPpqh1zII5q1P6nLnya-QYvuOiAx/exec";

/*************************
 * MENU
 *************************/
const toggle = document.getElementById("menu-toggle");
const links = document.getElementById("menu-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

/*************************
 * COUNTDOWN
 *************************/
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

/*************************
 * RSVP LOGIQUE FORMULAIRE
 *************************/
const presence = document.getElementById("presence");
const addressBlock = document.getElementById("address-block");
const sleepingBlock = document.getElementById("sleeping-block");
const sleeping = document.getElementById("sleeping");
const nightsBlock = document.getElementById("nights-block");

if (presence) {
  presence.addEventListener("change", () => {
    const present = presence.value && presence.value !== "non";

    addressBlock.classList.toggle("hidden", !present);
    sleepingBlock.classList.toggle("hidden", !present);

    if (!present) {
      sleeping.checked = false;
      nightsBlock.classList.add("hidden");
    }
  });
}

if (sleeping) {
  sleeping.addEventListener("change", () => {
    nightsBlock.classList.toggle("hidden", !sleeping.checked);
  });
}

/*************************
 * ENVOI GOOGLE SHEET
 *************************/
const form = document.getElementById("rsvp-form");
const message = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then(() => {
        form.classList.add("hidden");
        message.classList.remove("hidden");
      })
      .catch((err) => {
        alert("Erreur lors de l’envoi 😢");
        console.error(err);
      });
  });
}

/*************************
 * ANIMATION AU SCROLL
 *************************/
const items = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

items.forEach((item) => observer.observe(item));
