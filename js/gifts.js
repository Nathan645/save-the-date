/* ==========================================================
   LISTE DE MARIAGE — MODALE PARTICIPATION
========================================================== */

const GIFT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwBRLdS1ExOMGhdylWZ_ATl41CFg7nJ7xfdxlUALBui83mH_AQLgsYbL9oQPg7Lq8Fn/exec";

const giftModal = document.getElementById("gift-modal");
const modalGiftTitle = document.getElementById("modal-gift-title");
const modalGiftPrice = document.getElementById("modal-gift-price");
const giftAmount = document.getElementById("gift-amount");
const fullGift = document.getElementById("full-gift");
const giftModalForm = document.getElementById("gift-modal-form");

let currentGiftId = "";
let currentGiftPrice = 0;

document.querySelectorAll(".open-gift-modal").forEach((button) => {
  button.addEventListener("click", () => {
    currentGiftId = button.dataset.giftId || "";

    const title = button.dataset.title || "";
    const price = Number(button.dataset.price || 0);

    currentGiftPrice = price;

    modalGiftTitle.textContent = title;
    modalGiftPrice.textContent = `${price} €`;

    giftAmount.value = "";
    giftAmount.disabled = false;

    if (fullGift) {
      fullGift.checked = false;
    }

    giftModalForm?.reset();

    giftModal?.classList.remove("hidden");
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

  const giftMessage =
    giftModalForm.querySelector('[name="message"]')?.value || "";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Enregistrement...";
  }

  const formData = new FormData();
  formData.append("gift_id", currentGiftId);
  formData.append("cadeau", giftName);
  formData.append("prix_total", giftPrice);
  formData.append("montant", amount);
  formData.append("nom", displayName);
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

document.querySelector(".open-free-payment")?.addEventListener("click", () => {
  document.getElementById("gift-thanks-text").innerHTML =
    `Merci beaucoup ❤️<br>
     Vous pouvez participer librement au montant de votre choix.<br>
     Il ne reste plus qu'à choisir votre moyen de paiement.`;

  document.getElementById("gift-thanks-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

window.addEventListener("load", () => {

    document.querySelectorAll(".gift-image").forEach((image) => {

        const img = image.querySelector("img");

        image.style.setProperty("--bg", `url("${img.src}")`);

    });

});
