document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  if (!slider) return; // ασφάλεια

  const slides = slider.children.length;
  let index = 0;

  document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % slides;
    slider.style.transform = `translateX(-${index * 100}%)`;
  });

  document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + slides) % slides;
    slider.style.transform = `translateX(-${index * 100}%)`;
  });

  setInterval(() => {
    index = (index + 1) % slides;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }, 6000);
});
