/* ==========================================================
   MENU MOBILE
========================================================== */

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-links");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}
