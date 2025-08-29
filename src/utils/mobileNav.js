// mobileNav.js
const initMobileNav = () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("show");

    if (mobileMenu.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("show");
      document.body.style.overflow = "auto";
    });
  });
};

const initGalleryFilter = () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryImages = document.querySelectorAll(".gallery-img");

  galleryImages.forEach((img) => {
    const category = img.getAttribute("data-category");
    if (category === "livingroom") {
      img.classList.remove("hidden");
    } else {
      img.classList.add("hidden");
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      galleryImages.forEach((img) => {
        const category = img.getAttribute("data-category");
        if (category === filter) {
          img.classList.remove("hidden");
        } else {
          img.classList.add("hidden");
        }
      });
    });
  });
};

export { initMobileNav, initGalleryFilter };
