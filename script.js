/* ==========================================================
   CONFIG
========================================================== */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyVslzmvf_f2QXiDZI9qalE-93TTZ1xMK9h_1hvQcIZPzUCSY8LPqTrtcYpghDfbSqO/exec";

const GIFT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwBRLdS1ExOMGhdylWZ_ATl41CFg7nJ7xfdxlUALBui83mH_AQLgsYbL9oQPg7Lq8Fn/exec";

/* ==========================================================
   MENU MOBILE
========================================================== */

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-links");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}

/* ==========================================================
   COMPTE À REBOURS
========================================================== */

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

/* ==========================================================
   CAROUSEL HERO
========================================================== */

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
  carouselInterval = setInterval(nextSlide, 5000);
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

if (window.innerWidth < 850 && prevBtn && nextBtn) {
  prevBtn.classList.add("animate");
  nextBtn.classList.add("animate");

  setTimeout(() => {
    prevBtn.classList.remove("animate");
    nextBtn.classList.remove("animate");
  }, 2600);
}

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

/* ==========================================================
   RSVP
========================================================== */

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

/* ==========================================================
   LISTE DE MARIAGE — MODALE PARTICIPATION
========================================================== */

const giftModal = document.getElementById("gift-modal");
const modalGiftTitle = document.getElementById("modal-gift-title");
const modalGiftPrice = document.getElementById("modal-gift-price");
const giftAmount = document.getElementById("gift-amount");
const fullGift = document.getElementById("full-gift");
const giftModalForm = document.getElementById("gift-modal-form");

let currentGiftPrice = 0;

document.querySelectorAll(".open-gift-modal").forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.dataset.title;
    const price = Number(button.dataset.price);

    currentGiftPrice = price;

    modalGiftTitle.textContent = title;
    modalGiftPrice.textContent = `${price} €`;

    giftAmount.value = "";
    giftAmount.disabled = false;
    fullGift.checked = false;

    giftModalForm?.reset();

    giftModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

function closeGiftModal() {
  giftModal?.classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("gift-modal-close")?.addEventListener("click", closeGiftModal);
document.getElementById("gift-modal-x")?.addEventListener("click", closeGiftModal);

fullGift?.addEventListener("change", () => {
  if (fullGift.checked) {
    giftAmount.value = currentGiftPrice;
    giftAmount.disabled = true;
  } else {
    giftAmount.value = "";
    giftAmount.disabled = false;
  }
});

giftModalForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const submitButton = giftModalForm.querySelector("button[type='submit']");

  const amount = giftAmount.value;
  const giftName = modalGiftTitle.textContent;
  const giftPrice = currentGiftPrice;

  const displayName =
    giftModalForm.querySelector('[name="nom_affichage"]')?.value || "";

  const anonymous =
    giftModalForm.querySelector('[name="anonymous"]')?.checked ? "oui" : "non";

  const giftMessage =
    giftModalForm.querySelector('[name="message"]')?.value || "";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Enregistrement...";
  }

  const formData = new FormData();
  formData.append("cadeau", giftName);
  formData.append("prix_total", giftPrice);
  formData.append("montant", amount);
  formData.append("nom", displayName);
  formData.append("anonyme", anonymous);
  formData.append("message", giftMessage);

  fetch(GIFT_SCRIPT_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.text();
    })
    .then(() => {
      closeGiftModal();

      document.getElementById("gift-thanks-text").innerHTML =
        `<strong>${displayName || "Merci"}</strong>, votre participation de <strong>${amount} €</strong>
         pour <strong>${giftName}</strong> a bien été enregistrée.<br>
         Il ne reste plus qu'à choisir votre moyen de paiement.`;

      document.getElementById("gift-thanks-modal").classList.remove("hidden");
      document.body.style.overflow = "hidden";

      giftModalForm.reset();
    })
    .catch(() => {
      alert("Une erreur est survenue. Merci de réessayer.");
    })
    .finally(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Confirmer ma participation";
      }
    });
});

function closeThanksModal() {
  document.getElementById("gift-thanks-modal")?.classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("gift-thanks-button")?.addEventListener("click", closeThanksModal);
document.getElementById("gift-thanks-x")?.addEventListener("click", closeThanksModal);
document.getElementById("gift-thanks-close")?.addEventListener("click", closeThanksModal);

document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", () => {
    navigator.clipboard.writeText(button.dataset.copy);

    const oldText = button.textContent;
    button.textContent = "Copié ✓";
    button.classList.add("copied");

    setTimeout(() => {
      button.textContent = oldText;
      button.classList.remove("copied");
    }, 1800);
  });
});

/* ==========================================================
   LISTE DE MARIAGE — JAUGES AUTOMATIQUES
========================================================== */

function updateGiftProgress() {
  fetch(`${GIFT_SCRIPT_URL}?action=progress`)
    .then((response) => response.json())
    .then((totals) => {
      document.querySelectorAll(".gift-card-photo").forEach((card) => {
        const giftName = card.dataset.gift;
        const giftPrice = Number(card.dataset.price);

        if (!giftName || !giftPrice) return;

        const collected = Number(totals[giftName] || 0);
        const percent = Math.min((collected / giftPrice) * 100, 100);

        const bar = card.querySelector(".gift-progress-bar span");
        const text = card.querySelector(".gift-progress-text");
        const button = card.querySelector(".open-gift-modal");

        if (bar) {
          bar.style.width = `${percent}%`;
        }

        if (text) {
          text.textContent = `${collected} € / ${giftPrice} € offerts`;
        }

        if (collected >= giftPrice && button) {
          button.textContent = "Offert ❤️";
          button.disabled = true;
          button.classList.add("gift-btn-disabled");
        }
      });
    })
    .catch(() => {
      console.warn("Impossible de charger les jauges cadeaux.");
    });
}

updateGiftProgress();
