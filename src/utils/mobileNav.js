// src/utils/mobileNav.js

// Mobile Navigation (hamburger menu)
const initMobileNav = () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("show");
    document.body.style.overflow = mobileMenu.classList.contains("show")
      ? "hidden"
      : "auto";
  });

  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("show");
      document.body.style.overflow = "auto";
    });
  });
};

export { initMobileNav };
