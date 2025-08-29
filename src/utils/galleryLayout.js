document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const images = document.querySelectorAll(".gallery-img");
  const galleryGrid = document.getElementById("galleryGrid");

  let sliderTimer = null;
  const SLIDE_MS = 3000; // 3s

  const clearSlider = () => {
    if (sliderTimer) {
      clearInterval(sliderTimer);
      sliderTimer = null;
    }
    const ctrls = galleryGrid.querySelector("[data-slider-controls]");
    if (ctrls) ctrls.remove();
    galleryGrid.onmouseenter = null;
    galleryGrid.onmouseleave = null;
  };

  // ✅ κρατάμε min-h στο mobile, h-full μόνο από md και πάνω
  const stackAsFullscreen = () => {
    galleryGrid.className =
      "md:col-span-2 relative overflow-hidden rounded-lg min-h-[320px] md:min-h-0 md:h-full";
  };

  const toSingle = (img) => {
    clearSlider();
    stackAsFullscreen();

    images.forEach((i) => (i.style.display = "none"));
    img.style.display = "block";
    img.className = "gallery-img absolute inset-0 w-full h-full object-cover";
    img.style.opacity = "1";
  };

  const addControls = (onPrev, onNext) => {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("data-slider-controls", "true");
    wrapper.className =
      "pointer-events-none absolute inset-0 flex items-center justify-between p-2";

    const btnBase =
      "pointer-events-auto inline-flex items-center justify-center rounded-full shadow-lg bg-white/90 hover:bg-white transition text-2xl font-bold w-12 h-12";

    const btnLeft = document.createElement("button");
    btnLeft.setAttribute("aria-label", "Previous image");
    btnLeft.className = btnBase + " ml-2";
    btnLeft.innerText = "‹";

    const btnRight = document.createElement("button");
    btnRight.setAttribute("aria-label", "Next image");
    btnRight.className = btnBase + " mr-2";
    btnRight.innerText = "›";

    const restart = () => {
      clearInterval(sliderTimer);
      sliderTimer = setInterval(onNext, SLIDE_MS);
    };

    btnLeft.addEventListener("click", (e) => {
      e.stopPropagation();
      onPrev();
      restart();
    });
    btnRight.addEventListener("click", (e) => {
      e.stopPropagation();
      onNext();
      restart();
    });

    wrapper.appendChild(btnLeft);
    wrapper.appendChild(btnRight);
    galleryGrid.appendChild(wrapper);

    // keyboard + pause on hover
    galleryGrid.tabIndex = 0;
    galleryGrid.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        onPrev();
        restart();
      }
      if (e.key === "ArrowRight") {
        onNext();
        restart();
      }
    });
    galleryGrid.onmouseenter = () => clearInterval(sliderTimer);
    galleryGrid.onmouseleave = () => restart();
  };

  // Slider για 2+ εικόνες
  const toSlider = (imgs) => {
    clearSlider();
    stackAsFullscreen();

    imgs.forEach((img, idx) => {
      img.style.display = "block";
      img.className =
        "gallery-img absolute inset-0 w-full h-full object-cover transition-opacity duration-500";
      img.style.opacity = idx === 0 ? "1" : "0";
    });

    let i = 0;
    const show = (idx) => {
      imgs[i].style.opacity = "0";
      i = (idx + imgs.length) % imgs.length;
      imgs[i].style.opacity = "1";
    };
    const next = () => show(i + 1);
    const prev = () => show(i - 1);

    sliderTimer = setInterval(next, SLIDE_MS);
    addControls(prev, next);
  };

  // -------- Εφαρμογή φίλτρου --------
  const applyFilter = (filter) => {
    buttons.forEach((b) => {
      b.classList.toggle(
        "active-filter",
        b.getAttribute("data-filter") === filter
      );
    });

    images.forEach((img) => {
      img.style.display = "none";
      img.className = "gallery-img rounded-lg";
      img.style.opacity = "";
    });

    const visible = [...images].filter(
      (img) => img.getAttribute("data-category") === filter
    );

    if (visible.length === 1) {
      toSingle(visible[0]);
    } else if (visible.length > 1) {
      toSlider(visible);
    }
  };

  // Clicks
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.getAttribute("data-filter"));
    });
  });

  // Apply στο load (π.χ. livingroom)
  const activeBtn = document.querySelector(".filter-btn.active-filter");
  const defaultFilter = activeBtn
    ? activeBtn.getAttribute("data-filter")
    : "livingroom";
  applyFilter(defaultFilter);
});
