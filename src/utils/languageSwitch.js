// languageSwitch.js (ES module)
export const initLanguageSwitch = () => {
  const htmlLang = (
    document.documentElement.getAttribute("lang") || ""
  ).toLowerCase();

  // Desktop anchors
  const enD = document.getElementById("lang-en");
  const elD = document.getElementById("lang-gr");
  // Mobile anchors
  const enM = document.getElementById("lang-en-mobile");
  const elM = document.getElementById("lang-gr-mobile");

  // Πάρε τα hrefs από τα ίδια τα links (fallback σε defaults)
  const enHref = (enD && enD.getAttribute("href")) || "index.html";
  const elHref = (elD && elD.getAttribute("href")) || "index-el.html";

  const setActive = (a) => {
    if (!a) return;
    a.classList.remove("inactive");
    a.classList.add("active"); // βάφει μπλε + pointer-events: none από το CSS σου
    a.setAttribute("aria-current", "true");
    a.setAttribute("aria-disabled", "true");
    a.setAttribute("tabindex", "-1");
    a.removeAttribute("href"); // για να μην γίνεται click
  };

  const setInactive = (a, href) => {
    if (!a) return;
    a.classList.remove("active");
    a.classList.add("inactive");
    if (href) a.setAttribute("href", href);
    a.removeAttribute("aria-current");
    a.removeAttribute("aria-disabled");
    a.removeAttribute("tabindex");
  };

  // Επιλογή γλώσσας (fallback σε en αν κάτι είναι άκυρο)
  const lang = htmlLang === "el" || htmlLang === "en" ? htmlLang : "en";

  if (lang === "el") {
    setActive(elD);
    setActive(elM);
    setInactive(enD, enHref);
    setInactive(enM, enHref);
  } else {
    setActive(enD);
    setActive(enM);
    setInactive(elD, elHref);
    setInactive(elM, elHref);
  }
};

// Προαιρετικά κάν’ το και default για εύκολο import
export default initLanguageSwitch;
