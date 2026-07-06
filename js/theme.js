const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("night-mode");

    themeToggle.textContent =
      document.body.classList.contains("night-mode") ? "☀️" : "🌙";
  });
}
