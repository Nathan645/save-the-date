const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyVslzmvf_f2QXiDZI9qalE-93TTZ1xMK9h_1hvQcIZPzUCSY8LPqTrtcYpghDfbSqO/exec";

/* MENU */

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-links");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

/* COUNTDOWN */

const weddingDate = new Date("2027-07-10T15:00:00").getTime();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function updateCountdown() {
  if (!days || !hours || !minutes || !seconds) return;

  const distance = weddingDate - Date.now();

  if (distance <= 0) {
    days.textContent = "000";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    return;
  }

  days.textContent = String(Math.floor(distance / 86400000)).padStart(3, "0");
  hours.textContent = String(Math.floor((distance / 3600000) % 24)).padStart(2, "0");
  minutes.textContent = String(Math.floor((distance / 60000) % 60)).padStart(2, "0");
  seconds.textContent = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* CAROUSEL */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.getElementById("next-slide");
const prevBtn = document.getElementById("prev-slide");
const heroCarousel = document.querySelector(".hero-carousel");

let currentSlide = 0;
let carouselInterval;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = index;

  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[currentSlide].classList.add("active");

  if (dots[currentSlide]) {
    dots[currentSlide].classList.add("active");
  }
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startCarousel() {
  stopCarousel();
  carouselInterval = setInterval(nextSlide, 6000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

if (slides.length) {
  startCarousel();

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    startCarousel();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    startCarousel();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startCarousel();
    });
  });
}

/* ANIMATION DES FLÈCHES SUR MOBILE */

if (window.innerWidth < 850 && prevBtn && nextBtn) {
  prevBtn.classList.add("animate");
  nextBtn.classList.add("animate");

  setTimeout(() => {
    prevBtn.classList.remove("animate");
    nextBtn.classList.remove("animate");
  }, 2600);
}

/* SWIPE MOBILE */

let touchStartX = 0;
let touchEndX = 0;

if (heroCarousel && slides.length) {
  heroCarousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  heroCarousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 50) return;

    if (distance < 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    startCarousel();
  });
}

/* RSVP */

const presence = document.getElementById("presence");
const detailsBlock = document.getElementById("details-block");
const hebergementBlock = document.getElementById("hebergement-block");
const dort = document.getElementById("dort_sur_lieu");

const adresse = document.getElementById("adresse");
const cp = document.getElementById("code_postal");
const ville = document.getElementById("ville");

function clearFields(container) {
  if (!container) return;

  container.querySelectorAll("input, textarea, select").forEach((field) => {
    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = false;
    } else {
      field.value = "";
    }
  });
}

if (presence && detailsBlock && adresse && cp && ville) {
  presence.addEventListener("change", () => {
    const present = presence.value && presence.value !== "non";

    detailsBlock.classList.toggle("hidden", !present);

    adresse.required = present;
    cp.required = present;
    ville.required = present;

    if (!present) {
      clearFields(detailsBlock);
      clearFields(hebergementBlock);
      hebergementBlock?.classList.add("hidden");
    }
  });
}

if (dort && hebergementBlock) {
  dort.addEventListener("change", () => {
    hebergementBlock.classList.toggle("hidden", !dort.checked);

    if (!dort.checked) {
      clearFields(hebergementBlock);
    }
  });
}

/* FORMULAIRE */

const form = document.getElementById("rsvp-form");
const message = document.getElementById("form-message");

if (form && message) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const button = form.querySelector("button[type='submit']");

    if (button) {
      button.disabled = true;
      button.textContent = "Envoi...";
    }

    fetch(SCRIPT_URL, {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.text();
      })
      .then(() => {
        form.classList.add("hidden");
        message.classList.remove("hidden");
      })
      .catch(() => {
        alert("Une erreur est survenue.\nMerci de réessayer.");

        if (button) {
          button.disabled = false;
          button.textContent = "Envoyer ma réponse";
        }
      });
  });
}
