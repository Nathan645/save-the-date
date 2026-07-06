/* ==========================================================
   LISTE DE MARIAGE — JAUGES AUTOMATIQUES
========================================================== */

const GIFT_SCRIPT_URL_1 =
  "https://script.google.com/macros/s/AKfycbwBRLdS1ExOMGhdylWZ_ATl41CFg7nJ7xfdxlUALBui83mH_AQLgsYbL9oQPg7Lq8Fn/exec";

function updateGiftProgress() {
  fetch(`${GIFT_SCRIPT_URL_1}?action=progress`)
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

        if (collected >= giftPrice) {
          card.classList.add("gift-card-funded");

          if (button) {
            button.textContent = "🎁 Offert";
            button.disabled = true;
            button.classList.add("gift-btn-disabled");
          }

          if (text) {
            text.textContent = "🎉 Cadeau entièrement offert";
          }
        }
      });

      const grid = document.querySelector(".gift-grid-travel");

      if (grid) {
        const cards = [...grid.querySelectorAll(".gift-card-photo")];

        cards.sort((a, b) => {
          const aFunded = a.classList.contains("gift-card-funded");
          const bFunded = b.classList.contains("gift-card-funded");

          if (aFunded === bFunded) return 0;

          return aFunded ? 1 : -1;
        });

        cards.forEach((card) => grid.appendChild(card));
      }
    })
    .catch((err) => {
      console.error(err);
      console.warn("Impossible de charger les jauges cadeaux.");
    });
}

updateGiftProgress();
