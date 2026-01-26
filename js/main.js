(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function setActiveNavLinks() {
    const path = (window.location.pathname || "").split("/").pop() || "index.html";

    qsa('a[href]').forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");

      if (isExternal) return;

      const normalized = href.split("#")[0].split("?")[0];
      const current = normalized === path || (path === "" && normalized === "index.html");

      if (current) a.setAttribute("aria-current", "page");
      else if (a.getAttribute("aria-current") === "page") a.removeAttribute("aria-current");
    });
  }

  function initMobileMenu() {
    const toggleBtn = qs(".mobile-toggle");
    const panel = qs("#mobilePanel");
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

    toggleBtn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      isOpen() ? close() : open();
    });

    panel.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) close();
    });

    document.addEventListener("click", (e) => {
      if (!toggleBtn.contains(e.target) && !panel.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) close();
    });
  }

  function initExternalLinks() {
    qsa('a[href^="http://"], a[href^="https://"]').forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      let isSameHost = false;
      try {
        const u = new URL(href, window.location.href);
        isSameHost = u.host === window.location.host;
      } catch {
        isSameHost = false;
      }

      if (!isSameHost) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  function initToolsDirectory() {
    const grid = qs("#toolsGrid");
    const categoryTabs = qsa('.tab[data-category]');
    const stageTabs = qsa('.stage[data-stage]');
    const dataEl = qs("#toolsData");

    if (!grid || categoryTabs.length === 0 || stageTabs.length === 0 || !dataEl) return;

    let data = {};
    try {
      data = JSON.parse(dataEl.textContent || "{}");
    } catch {
      data = {};
    }

    const state = {
      category: categoryTabs.find((t) => t.getAttribute("aria-selected") === "true")?.dataset.category || categoryTabs[0].dataset.category,
      stage: stageTabs.find((t) => t.getAttribute("aria-selected") === "true")?.dataset.stage || stageTabs[0].dataset.stage,
    };

    const escapeHtml = (str) =>
      String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const setSelected = (list, selectedEl) => {
      list.forEach((el) => el.setAttribute("aria-selected", el === selectedEl ? "true" : "false"));
    };

    const render = () => {
      const tools = data?.[state.category]?.[state.stage] ?? [];

      if (!Array.isArray(tools) || tools.length === 0) {
        grid.innerHTML = `
          <div class="card card-pad" style="grid-column:1 / -1;">
            <p class="lead" style="margin:0;">No tools available for this selection.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = tools
        .map((t) => {
          const name = escapeHtml(t.name || "");
          const desc = escapeHtml(t.desc || "");
          const url = escapeHtml(t.url || "");
          const tag = escapeHtml(t.tag || state.stage);

          return `
            <a class="tool-card" href="${url}">
              <div class="tool-meta">
                <span class="badge">${tag}</span>
                <span class="badge">External</span>
              </div>
              <h3>${name}</h3>
              <p>${desc}</p>
              <div class="actions">
                <span class="btn btn-link btn-sm" aria-hidden="true">Open →</span>
              </div>
            </a>
          `;
        })
        .join("");
    };

    categoryTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        setSelected(categoryTabs, btn);
        render();
      });
    });

    stageTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.stage = btn.dataset.stage;
        setSelected(stageTabs, btn);
        render();
      });
    });

    render();
  }

  function initContactFormAjax() {
    const form = qs('form[data-web3forms="true"]');
    const statusEl = qs("#formStatus");
    if (!form || !statusEl) return;

    const endpoint = form.getAttribute("action") || "https://api.web3forms.com/submit";

    const setStatus = (type, message) => {
      statusEl.textContent = message;
      statusEl.style.display = "block";
      statusEl.style.padding = "12px 12px";
      statusEl.style.borderRadius = "12px";
      statusEl.style.border = "1px solid rgba(0,0,0,.12)";
      statusEl.style.background = type === "success" ? "rgba(51,153,51,.10)" : "rgba(255,93,2,.10)";
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      setStatus("info", "Sending…");

      const fd = new FormData(form);

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });

        const json = await res.json().catch(() => null);

        if (res.ok && json && json.success) {
          form.reset();
          setStatus("success", "Message sent successfully. Thank you.");
          return;
        }

        setStatus("error", "Unable to send right now. Please try again.");
      } catch {
        setStatus("error", "Network error. Please try again.");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNavLinks();
    initMobileMenu();
    initExternalLinks();
    initToolsDirectory();
    initContactFormAjax();
  });
})();
