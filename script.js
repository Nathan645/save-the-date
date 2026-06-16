const SCRIPT_URL =
  "https://script.google.com/macros/library/d/1yq3kdoUnkerxMwIO92gT5rTvcWL8bJ9OBECENOac_t7cBfpNAxljCnms/10";

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

/* RSVP LOGIQUE */
const presence = document.getElementById("presence");
const addressBlock = document.getElementById("address-block");
const sleepingBlock = document.getElementById("sleeping-block");
const sleeping = document.getElementById("sleeping");
const nightsBlock = document.getElementById("nights-block");

function clearBlock(block) {
  if (!block) return;

  const fields = block.querySelectorAll("input, textarea, select");

  fields.forEach((field) => {
    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = false;
    } else {
      field.value = "";
    }
  });
}

if (presence) {
  presence.onchange = () => {
    const ok = presence.value && presence.value !== "non";

    if (addressBlock) {
      addressBlock.classList.toggle("hidden", !ok);
      if (!ok) clearBlock(addressBlock);
    }

    if (sleepingBlock) {
      sleepingBlock.classList.toggle("hidden", !ok);
      if (!ok) clearBlock(sleepingBlock);
    }

    if (nightsBlock) {
      if (!ok) {
        nightsBlock.classList.add("hidden");
        clearBlock(nightsBlock);
      }
    }
  };
}

if (sleeping && nightsBlock) {
  sleeping.onchange = () => {
    nightsBlock.classList.toggle("hidden", !sleeping.checked);

    if (!sleeping.checked) {
      clearBlock(nightsBlock);
    }
  };
}

/* ENVOI FORM */
const form = document.getElementById("rsvp-form");
const message = document.getElementById("form-message");

if (form && message) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(SCRIPT_URL, {
      method: "POST",
      body: new FormData(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.text();
      })
      .then(() => {
        form.classList.add("hidden");
        message.classList.remove("hidden");
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l’envoi 😢");
      });
  });
}
