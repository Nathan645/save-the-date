/* MENU MOBILE */
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
if (menuToggle && menuLinks) {
  menuToggle.addEventListener("click", () => menuLinks.classList.toggle("open"));
}

/* COMPTE À REBOURS */
const countdownContainer = document.getElementById("countdown");
if (countdownContainer) {
  const weddingDate = new Date("2027-07-10T15:00:00");
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance < 0) { countdownContainer.innerHTML = "🎉 C’est le grand jour !"; return; }
    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);
    countdownContainer.innerHTML = `<span>${days}</span> jours <span>${hours}</span> h <span>${minutes}</span> min <span>${seconds}</span> s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* RSVP */
const form = document.getElementById("rsvp-form");
if (form) {
  const presence = form.presence;
  const presenceDetails = document.getElementById("presence-details");
  const sleepingCheckbox = form.sleeping;
  const sleepDetails = document.getElementById("sleep-details");
  const successMessage = document.getElementById("success-message");

  presence.addEventListener("change", () => {
    if (["samedi","dimanche brunch","les deux"].includes(presence.value)) {
      presenceDetails.classList.remove("hidden");
      setTimeout(()=>presenceDetails.classList.add("visible"),10);
      form.address.required = true;
      form.zipcode.required = true;
      form.city.required = true;
    } else {
      presenceDetails.classList.remove("visible");
      sleepDetails.classList.remove("visible");
      sleepingCheckbox.checked = false;
      setTimeout(()=>{ presenceDetails.classList.add("hidden"); sleepDetails.classList.add("hidden"); },300);
      form.address.required = false;
      form.zipcode.required = false;
      form.city.required = false;
    }
  });

  sleepingCheckbox.addEventListener("change", () => {
    if(sleepingCheckbox.checked){ sleepDetails.classList.remove("hidden"); setTimeout(()=>sleepDetails.classList.add("visible"),10);}
    else{ sleepDetails.classList.remove("visible"); setTimeout(()=>sleepDetails.classList.add("hidden"),300);}
  });

  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = {
      fullname: form.fullname.value,
      presence: form.presence.value,
      address: form.address.value,
      zipcode: form.zipcode.value,
      city: form.city.value,
      dietary: form.dietary.value,
      sleeping: form.sleeping.checked?"oui":"non",
      friday: form.night_friday?.checked?"oui":"non",
      saturday: form.night_saturday?.checked?"oui":"non",
      sunday: form.night_sunday?.checked?"oui":"non",
      bedlinen: form.bedlinen?.checked?"oui":"non",
      towels: form.towels?.checked?"oui":"non",
      comment: form.comment.value
    };
    fetch("https://script.google.com/macros/s/AKfycbw88Xwb-Fozj33XCamVG4iny0c8oEczak4IST1SgPpqh1zII5q1P6nLnya-QYvuOiAx/exec",{
      method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)
    });
    form.reset();
    presenceDetails.classList.add("hidden");
    sleepDetails.classList.add("hidden");
    form.classList.add("hidden");
    successMessage.classList.remove("hidden");
  });
}
