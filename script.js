/* URL GOOGLE APPS SCRIPT */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwyYmVRYvi6d9QTVcCxh5oPp5iagaGoEY3Yfwg0oHeSiM14iGHt9imxD12sNtm9139h/exec";

/* MENU */
const toggle = document.getElementById("menu-toggle");
const links = document.getElementById("menu-links");

if (toggle && links) {
  toggle.onclick = () => links.classList.toggle("open");
}

/* COUNTDOWN */
const countdown = document.getElementById("countdown");

if (countdown) {
  const date = new Date("2027-07-10T15:00:00").getTime();

  setInterval(() => {
    const d = date - Date.now();

    if (d < 0) {
      countdown.textContent = "C’est aujourd’hui 💛";
      return;
    }

    const j = Math.floor(d / 86400000);
    const h = Math.floor((d / 3600000) % 24);
    const m = Math.floor((d / 60000) % 60);
    const s = Math.floor((d / 1000) % 60);

    countdown.textContent = `${j}j ${h}h ${m}m ${s}s`;
  }, 1000);
}

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

if (presence) {
  presence.addEventListener("change", () => {
    const vient = presence.value && presence.value !== "non";

    detailsBlock.classList.toggle("hidden", !vient);

    adresse.required = vient;
    codePostal.required = vient;
    ville.required = vient;

    if (!vient) {
      clearBlock(detailsBlock);
      clearBlock(hebergementBlock);
      hebergementBlock.classList.add("hidden");
    }
  });
}

if (dortSurLieu) {
  dortSurLieu.addEventListener("change", () => {
    hebergementBlock.classList.toggle("hidden", !dortSurLieu.checked);

    if (!dortSurLieu.checked) {
      clearBlock(hebergementBlock);
    }
  });
}

/* ENVOI FORM */
const form = document.getElementById("rsvp-form");
const message =
  document.getElementById("form-message");

if (form && message) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Soumission formulaire");

    const submitBtn =
      form.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi...";
    }

    fetch(SCRIPT_URL, {
      method: "POST",
      body: new FormData(form),
    })
      .then((res) => {
        console.log("Réponse reçue", res);

        if (!res.ok) {
          throw new Error(
            "Erreur HTTP " + res.status
          );
        }

        return res.text();
      })
      .then((data) => {
        console.log(
          "Réponse Apps Script :",
          data
        );

        form.classList.add("hidden");
        message.classList.remove("hidden");
      })
      .catch((err) => {
        console.error(
          "Erreur formulaire :",
          err
        );

        alert(
          "Erreur lors de l’envoi 😢\n\nRegarde la console F12."
        );

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Envoyer";
        }
      });
  });
}
