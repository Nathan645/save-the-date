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

/* Animation discrète des flèches sur mobile */

if (window.innerWidth < 850 && prevBtn && nextBtn) {
  prevBtn.classList.add("animate");
  nextBtn.classList.add("animate");

  setTimeout(() => {
    prevBtn.classList.remove("animate");
    nextBtn.classList.remove("animate");
  }, 2600);
}

/* Swipe mobile */

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
