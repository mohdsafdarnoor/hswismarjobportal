(() => {
  const menu = document.getElementById("mobileMenu");
  const toggleBtn = document.querySelector(".mobile-menu-btn");

  if (!menu || !toggleBtn) return;

  // a11y
  toggleBtn.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-hidden", "true");

  function openMenu() {
    menu.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    menu.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }

  function toggleMenu() {
    if (menu.classList.contains("open")) closeMenu();
    else openMenu();
  }

  // Keep your HTML onclick working
  window.toggleMobileMenu = toggleMenu;

  // Close menu when any mobile link is clicked
  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInsideMenu = menu.contains(e.target);
    const clickedToggle = toggleBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // If resized to desktop, ensure menu is closed
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
})();
