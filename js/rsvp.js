/* ==========================================================
   RSVP — AFFICHAGE CONDITIONNEL
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

/* ==========================================================
   RSVP — ENVOI GOOGLE APPS SCRIPT
========================================================== */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyVslzmvf_f2QXiDZI9qalE-93TTZ1xMK9h_1hvQcIZPzUCSY8LPqTrtcYpghDfbSqO/exec";

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
