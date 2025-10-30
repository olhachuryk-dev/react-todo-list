(function () {
  "use strict";

  let modalContainer = null;
  let iframeEl = null;

  // Listen for messages from iframe
  window.addEventListener("message", function (event) {
    if (event.data.type === "OPEN_SCAM_ALERT_WIDGET") {
      openWidget(event.data.url, event.data.access_key, event.data.options);
    } else if (event.data.type === "CLOSE_SCAM_ALERT_WIDGET") {
      closeWidget();
    } else if (event.data.type === "SUBMIT_SCAM_ALERT_REPORT") {
      handleSubmit();
    }
  });

  function toUrlWithTheme(url, theme) {
    if (!theme) return url;
    try {
      const u = new URL(url, window.location.href);
      const encoded = btoa(JSON.stringify(theme));
      u.searchParams.set("theme", encoded);
      return u.toString();
    } catch (e) {
      console.error("Error parsing theme:", e);
      return url;
    }
  }

  function sanitizeLanguage(lang) {
    if (!lang || typeof lang !== "string") return "";
    // allow patterns like en, en-US, pt-BR, zh, ar, uk, etc.
    const trimmed = lang.trim().slice(0, 10);
    if (!/^[A-Za-z-]{2,10}$/.test(trimmed)) return "";
    return trimmed;
  }

  function toUrlWithParams(url, access_key, options) {
    try {
      const u = new URL(
        toUrlWithTheme(url, options && options.theme),
        window.location.href
      );
      u.searchParams.set("access_key", "pk_1fce8f1e3018e5e53146429da2dc788a");
      u.searchParams.set("hostname", "scam.cbeng.io");
      const lang =
        (options && options.lang) ||
        document.querySelector("html").getAttribute("lang");
      const safeLang = sanitizeLanguage(lang);
      if (safeLang) {
        u.searchParams.set("lang", safeLang);
      }
      return u.toString();
    } catch (e) {
      console.error("Error parsing URL:", e);
      return toUrlWithTheme(url, options && options.theme);
    }
  }

  function openWidget(url, access_key, options) {
    const finalUrl = toUrlWithParams(url, access_key, options || {});
    if (!modalContainer) {
      modalContainer = document.createElement("div");
      modalContainer.id = "scam-alert-widget";
      document.body.appendChild(modalContainer);
    }

    // Set modal content
    modalContainer.innerHTML = `
      <style>
        @media (max-width: 1060px) {
          #scam-alert-widget-content {
            padding-top: 45px;
          }
          #scam-alert-widget-close-button {
            right: 0 !important;
          }
        }
      </style>
        <div id="scam-alert-widget-overlay" data-testid="saw-overlay" style="position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.5);display: flex; align-items: center; justify-content: center; padding: 1rem;">
          <div id="scam-alert-widget-content" data-testid="saw-content" style="position: relative; ; width: 100%; max-width: 1120px; border-radius: 32px;  overflow: hidden;">
            <button id="scam-alert-widget-close-button" data-testid="saw-close" aria-label="Close modal" onclick="closeScamAlertWidget()" style="position: absolute; top: 1rem; right: 1rem; z-index: 10; background: transparent; cursor: pointer; border: none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="#D4D9DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="#D4D9DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <iframe src="${finalUrl}" data-testid="saw-iframe" style="width: 100%; height: 90vh; border: none; display: flex; align-items: center; justify-content: center;"></iframe>
          </div>
        </div>
      `;

    iframeEl = modalContainer.querySelector("iframe");
    if (iframeEl) {
      iframeEl.addEventListener("load", function () {
        try {
          if (options && options.theme && iframeEl && iframeEl.contentWindow) {
            iframeEl.contentWindow.postMessage(
              { type: "SET_SCAM_ALERT_WIDGET_THEME", theme: options.theme },
              "*"
            );
          }
        } catch (e) {
          console.error("Error setting theme:", e);
        }
      });
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }

  function closeWidget() {
    if (modalContainer) {
      modalContainer.remove();
      modalContainer = null;
    }

    // Restore body scroll
    document.body.style.overflow = "";
  }

  function handleSubmit() {
    // Call optional callback if host defined it
    if (typeof window.onScamAlertReportSubmit === "function") {
      window.onScamAlertReportSubmit();
    }
  }

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalContainer) {
      closeWidget();
    }
  });

  // Expose simple API on window
  window.openScamAlertWidget = openWidget;
  window.closeScamAlertWidget = closeWidget;
})();
