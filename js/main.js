(() => {
  const SELECTORS = {
    mobileToggle: ".mobile-toggle",
    mobilePanel: "#mobilePanel",
    primaryNav: ".nav",
  };

  function setActiveNavLinks() {
    const path = (window.location.pathname || "").split("/").pop() || "index.html";

    const links = document.querySelectorAll('a[href]');
    links.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");

      if (isExternal) return;

      const normalized = href.split("#")[0].split("?")[0];
      if (!normalized || normalized === "/") return;

      const current =
        normalized === path ||
        (path === "" && normalized === "index.html") ||
        (path === "index.html" && normalized === "./index.html");

      if (current) a.setAttribute("aria-current", "page");
      else if (a.getAttribute("aria-current") === "page") a.removeAttribute("aria-current");
    });
  }

  function initMobileMenu() {
    const toggleBtn = document.querySelector(SELECTORS.mobileToggle);
    const panel = document.querySelector(SELECTORS.mobilePanel);

    if (!toggleBtn || !panel) return;

    const isOpen = () => panel.classList.contains("open");

    const open = () => {
      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
      toggleBtn.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      toggleBtn.setAttribute("aria-expanded", "false");
    };

    const toggle = () => (isOpen() ? close() : open());

    toggleBtn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggle();
    });

    panel.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) close();
    });

    document.addEventListener("click", (e) => {
      const clickedToggle = toggleBtn.contains(e.target);
      const clickedPanel = panel.contains(e.target);
      if (!clickedToggle && !clickedPanel) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) close();
    });
  }

  function initExternalLinks() {
    const anchors = document.querySelectorAll('a[href^="http://"], a[href^="https://"]');
    anchors.forEach((a) => {
      const url = a.getAttribute("href");
      if (!url) return;

      const isSameHost = (() => {
        try {
          const u = new URL(url, window.location.href);
          return u.host === window.location.host;
        } catch {
          return false;
        }
      })();

      if (!isSameHost) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNavLinks();
    initMobileMenu();
    initExternalLinks();
  });
})();
