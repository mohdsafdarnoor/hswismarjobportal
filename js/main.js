// ===============================
// Mobile menu (header)
// ===============================
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;
  menu.classList.toggle("open");
}

// Close mobile menu on link click
document.addEventListener("click", (e) => {
  const menu = document.getElementById("mobileMenu");
  if (!menu || !menu.classList.contains("open")) return;

  const link = e.target.closest("a");
  if (link && link.classList.contains("mobile-nav-link")) {
    menu.classList.remove("open");
  }
});

// Close menu on resize to desktop
window.addEventListener("resize", () => {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;
  if (window.innerWidth >= 860) menu.classList.remove("open");
});

// ===============================
// FAQ Accordion (optional)
// ===============================
// HTML structure expected:
//
// <div class="faq" data-faq>
//   <div class="faq-item">
//     <button class="faq-q" type="button">Question?</button>
//     <div class="faq-a">Answer...</div>
//   </div>
// </div>
//
// JS will add aria-controls/expanded + collapse behavior
//
(function initFAQAccordion() {
  const root = document.querySelector("[data-faq]");
  if (!root) return;

  const items = root.querySelectorAll(".faq-item");
  items.forEach((item, index) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;

    const panelId = `faq-panel-${index + 1}`;

    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", panelId);
    panel.setAttribute("id", panelId);
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-hidden", "true");
    panel.style.display = "none";

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // close all (accordion behavior)
      items.forEach((otherItem) => {
        const otherBtn = otherItem.querySelector(".faq-q");
        const otherPanel = otherItem.querySelector(".faq-a");
        if (!otherBtn || !otherPanel) return;
        otherBtn.setAttribute("aria-expanded", "false");
        otherPanel.setAttribute("aria-hidden", "true");
        otherPanel.style.display = "none";
      });

      // open current if it was closed
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        panel.setAttribute("aria-hidden", "false");
        panel.style.display = "block";
      }
    });
  });
})();

