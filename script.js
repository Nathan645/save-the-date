const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyVslzmvf_f2QXiDZI9qalE-93TTZ1xMK9h_1hvQcIZPzUCSY8LPqTrtcYpghDfbSqO/exec";

/* MENU MOBILE */
const toggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");

if (toggle && menuLinks) {
  toggle.addEventListener("click", () => {
    menuLinks.classList.toggle("open");
  });
}

/* COUNTDOWN */
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const weddingDate = new Date("2027-07-10T15:00:00").getTime();
  const now = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) {
    daysEl.textContent = "000";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(3, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* RSVP */
const presence = document.getElementById("presence");
const detailsBlock = document.getElementById("details-block");
const hebergementBlock = document.getElementById("hebergement-block");
const dortSurLieu = document.getElementById("dort_sur_lieu");

const adresse = document.getElementById("adresse");
const codePostal = document.getElementById("code_postal");
const ville = document.getElementById("ville");

function clearBlock(block) {
  if (!block) return;

  block.querySelectorAll("input, textarea, select").forEach((field) => {
    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = false;
    } else {
      field.value = "";
    }
  });
}

if (presence && detailsBlock && adresse && codePostal && ville) {
  presence.addEventListener("change", () => {
    const vient = presence.value && presence.value !== "non";

    detailsBlock.classList.toggle("hidden", !vient);

    adresse.required = vient;
    codePostal.required = vient;
    ville.required = vient;

    if (!vient) {
      clearBlock(detailsBlock);

      if (hebergementBlock) {
        clearBlock(hebergementBlock);
        hebergementBlock.classList.add("hidden");
      }
    }
  });
}

if (dortSurLieu && hebergementBlock) {
  dortSurLieu.addEventListener("change", () => {
    hebergementBlock.classList.toggle("hidden", !dortSurLieu.checked);

    if (!dortSurLieu.checked) {
      clearBlock(hebergementBlock);
    }
  });
}

/* ENVOI FORMULAIRE */
const form = document.getElementById("rsvp-form");
const message = document.getElementById("form-message");

if (form && message) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi...";
    }

    fetch(SCRIPT_URL, {
      method: "POST",
      body: new FormData(form),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur HTTP " + res.status);
        }

        return res.text();
      })
      .then(() => {
        form.classList.add("hidden");
        message.classList.remove("hidden");
      })
      .catch(() => {
        alert("Erreur lors de l’envoi 😢 Merci de réessayer.");

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Envoyer";
        }
      });
  });
}
