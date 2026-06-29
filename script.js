/* ======================================
   CONFIG
====================================== */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyVslzmvf_f2QXiDZI9qalE-93TTZ1xMK9h_1hvQcIZPzUCSY8LPqTrtcYpghDfbSqO/exec";

/* ======================================
   MENU MOBILE
====================================== */

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-links");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

/* ======================================
   COMPTE À REBOURS
====================================== */

const weddingDate = new Date("2027-07-10T15:00:00").getTime();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function updateCountdown() {

  if (!days) return;

  const now = Date.now();

  const distance = weddingDate - now;

  if (distance <= 0) {

    days.textContent = "000";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";

    return;

  }

  days.textContent = String(
    Math.floor(distance / (1000 * 60 * 60 * 24))
  ).padStart(3, "0");

  hours.textContent = String(
    Math.floor((distance / (1000 * 60 * 60)) % 24)
  ).padStart(2, "0");

  minutes.textContent = String(
    Math.floor((distance / (1000 * 60)) % 60)
  ).padStart(2, "0");

  seconds.textContent = String(
    Math.floor((distance / 1000) % 60)
  ).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);

/* ======================================
   HERO CAROUSEL
====================================== */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("next-slide");
const prevBtn = document.getElementById("prev-slide");

let currentSlide = 0;

let interval;

/* -------- */

function showSlide(index) {

  slides.forEach(slide => slide.classList.remove("active"));

  dots.forEach(dot => dot.classList.remove("active"));

  currentSlide = index;

  if (currentSlide >= slides.length)
    currentSlide = 0;

  if (currentSlide < 0)
    currentSlide = slides.length - 1;

  slides[currentSlide].classList.add("active");

  dots[currentSlide].classList.add("active");

}

/* -------- */

function nextSlide() {

  showSlide(currentSlide + 1);

}

/* -------- */

function prevSlide() {

  showSlide(currentSlide - 1);

}

/* -------- */

function startCarousel() {

  interval = setInterval(nextSlide, 6000);

}

function stopCarousel() {

  clearInterval(interval);

}

/* -------- */

if (slides.length) {

  startCarousel();

  nextBtn?.addEventListener("click", () => {

    stopCarousel();

    nextSlide();

    startCarousel();

  });

  prevBtn?.addEventListener("click", () => {

    stopCarousel();

    prevSlide();

    startCarousel();

  });

  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      stopCarousel();

      showSlide(index);

      startCarousel();

    });

  });

  const hero = document.querySelector(".hero-carousel");

  hero.addEventListener("mouseenter", stopCarousel);

  hero.addEventListener("mouseleave", startCarousel);

}

/* ======================================
   SWIPE MOBILE CAROUSEL
====================================== */

const heroCarousel = document.querySelector(".hero-carousel");

let touchStartX = 0;
let touchEndX = 0;

if (heroCarousel && slides.length) {
  heroCarousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  heroCarousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) return;

    stopCarousel();

    if (swipeDistance < 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    startCarousel();
  });
}

/* ======================================
   RSVP
====================================== */

const presence = document.getElementById("presence");

const detailsBlock =
  document.getElementById("details-block");

const hebergementBlock =
  document.getElementById("hebergement-block");

const dort =
  document.getElementById("dort_sur_lieu");

const adresse =
  document.getElementById("adresse");

const cp =
  document.getElementById("code_postal");

const ville =
  document.getElementById("ville");

/* -------- */

function clearFields(container) {

  if (!container) return;

  container
    .querySelectorAll("input, textarea, select")
    .forEach(field => {

      if (field.type === "checkbox") {

        field.checked = false;

      } else {

        field.value = "";

      }

    });

}

/* -------- */

if (presence) {

  presence.addEventListener("change", () => {

    const present =
      presence.value &&
      presence.value !== "non";

    detailsBlock.classList.toggle(
      "hidden",
      !present
    );

    adresse.required = present;
    cp.required = present;
    ville.required = present;

    if (!present) {

      clearFields(detailsBlock);

      clearFields(hebergementBlock);

      hebergementBlock.classList.add("hidden");

    }

  });

}

/* -------- */

if (dort) {

  dort.addEventListener("change", () => {

    hebergementBlock.classList.toggle(
      "hidden",
      !dort.checked
    );

    if (!dort.checked) {

      clearFields(hebergementBlock);

    }

  });

}

/* ======================================
   ENVOI FORMULAIRE
====================================== */

const form =
  document.getElementById("rsvp-form");

const message =
  document.getElementById("form-message");

if (form) {

  form.addEventListener("submit", e => {

    e.preventDefault();

    const button =
      form.querySelector("button");

    button.disabled = true;

    button.textContent = "Envoi...";

    fetch(SCRIPT_URL, {

      method: "POST",

      body: new FormData(form)

    })

      .then(response => {

        if (!response.ok)

          throw new Error();

        return response.text();

      })

      .then(() => {

        form.classList.add("hidden");

        message.classList.remove("hidden");

      })

      .catch(() => {

        alert(
          "Une erreur est survenue.\nMerci de réessayer."
        );

        button.disabled = false;

        button.textContent =
          "Envoyer ma réponse";

      });

  });

}
