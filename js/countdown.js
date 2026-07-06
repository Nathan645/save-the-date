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
