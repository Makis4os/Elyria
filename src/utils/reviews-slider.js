document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  if (!slider) return;

  const slides = slider.children.length;
  const wrapper = document.querySelector("#reviews .relative"); // πιάνει και τα βελάκια
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  let index = 0;
  let timer = null;
  let stoppedByUser = false; // αν πατηθούν τα κουμπιά, μην ξαναξεκινήσει

  const render = () => {
    slider.style.transform = `translateX(-${index * 100}%)`;
  };

  const start = () => {
    if (stoppedByUser) return; // μην ξεκινάς αν ο χρήστης το έχει σταματήσει
    stop();
    timer = setInterval(() => {
      index = (index + 1) % slides;
      render();
    }, 4000);
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  // Κουμπιά: μετακίνηση + μόνιμο stop στο auto-slide
  nextBtn.addEventListener("click", () => {
    stoppedByUser = true;
    stop();
    index = (index + 1) % slides;
    render();
  });

  prevBtn.addEventListener("click", () => {
    stoppedByUser = true;
    stop();
    index = (index - 1 + slides) % slides;
    render();
  });

  // Hover πάνω στο slider (και στα βελάκια) => pause, έξοδος => resume
  if (wrapper) {
    wrapper.addEventListener("mouseenter", stop);
    wrapper.addEventListener("mouseleave", start);
  }

  // ξεκίνα το auto-slide
  start();
});
