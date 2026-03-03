import { Readability } from "@mozilla/readability";
import type { Article } from "./types";

/** Constants */
const ROOT_ID = "readlater-root";

/** Prevent multiple injections */
if ((window as any).__READLATER_INJECTED__) {
  // Already injected, do nothing
} else {
  (window as any).__READLATER_INJECTED__ = true;

  /**
   * Function for injecting CSS Inline
   */
  const InjectStyles = async (shadowRoot: ShadowRoot) => {
    // Load local font CSS files
    const localFonts = ["open_runde/stylesheet.css", "tasa/stylesheet.css"];

    for (const file of localFonts) {
      const url = chrome.runtime.getURL(file);
      let fontCss = await fetch(url).then((res) => res.text());

      // Replace relative font URLs with chrome-extension:// URLs
      const fontDir = file.split("/")[0];
      fontCss = fontCss.replace(/url\((['"]?)([^'")]+)\1\)/g, (_, __, fontFile) => {
        return `url("${chrome.runtime.getURL(`${fontDir}/${fontFile}`)}")`;
      });

      const style = document.createElement("style");
      style.textContent = fontCss;
      shadowRoot.appendChild(style);
    }

    // Load main CSS
    const url = chrome.runtime.getURL("readlater-extension.css");
    const cssText = await fetch(url).then((res) => res.text());

    const style = document.createElement("style");
    style.textContent = cssText;

    shadowRoot.appendChild(style);
  };

  /**
   * Function for injecting UI for interaction
   */
  const InjectUI = async (payload: any) => {
    /** Avoid Duplicate Injection */
    if (document.getElementById(ROOT_ID)) return;

    /** Create DIV and Assign the ID to it */
    const host = document.createElement("div");
    host.id = ROOT_ID;

    /** Inject Styling */
    Object.assign(host.style, {
      position: "fixed",
      top: "16px",
      right: "16px",
      width: "320px",
      height: "auto",
      zIndex: "2147483647",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)",
    });

    /** Append the DIV to the document as Child */
    document.body.appendChild(host);

    /** Close UI when clicking outside and clear the payload */
    const handleClickOutside = (e: MouseEvent) => {
      if (!host.contains(e.target as Node)) {
        host.remove();
        (window as any).__READLATER_PAYLOAD__ = undefined;
        document.removeEventListener("click", handleClickOutside);
      }
    };
    setTimeout(() => document.addEventListener("click", handleClickOutside), 0);

    /** Attach Shadow DOM Tree: Preserve CSS and more */
    const shadow = host.attachShadow({ mode: "closed" });

    /** Create a DIV for Shadow DOM */
    const appRoot = document.createElement("div");
    shadow.appendChild(appRoot);

    /** Inject Inline CSS */
    await InjectStyles(shadow);

    /** Store Data in Window */
    (window as any).__READLATER_PAYLOAD__ = { bookmark: payload };

    /** Dynamically Import: and Render App */
    import(chrome.runtime.getURL("app.js")).then(({ render }) => {
      render(appRoot, shadow);
    });
  };

  /**
   * Sanitize the content
   */
  const sanitizeHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Remove scripts, and other non-visual tags
    doc.querySelectorAll("script, style, noscript, iframe, button").forEach((el) => el.remove());

    // Remove inline JS handlers
    doc.querySelectorAll("*").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;

      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith("on")) {
          el.removeAttribute(attr.name);
        }
      });

      const style = window.getComputedStyle(el as HTMLElement);
      if (style.display === "none" || style.visibility === "hidden" || el.hidden) {
        el.remove();
        return;
      }
    });

    doc.querySelectorAll("a").forEach((a) => {
      a.href = new URL(a.getAttribute("href")!, location.href).href;
    });

    doc.querySelectorAll("img").forEach((img) => {
      img.src = new URL(img.getAttribute("src")!, location.href).href;
    });

    return doc.body.innerHTML;
  };

  /** Try to Remove Ad Content */
  const removeAdLikeNodes = (container: HTMLElement) => {
    const suspicious = ["ad", "ads", "banner", "promo", "sponsor", "affiliate"];

    container.querySelectorAll("*").forEach((el) => {
      const className = el.className?.toString().toLowerCase() ?? "";
      const id = el.id?.toLowerCase() ?? "";

      if (suspicious.some((word) => className.includes(word) || id.includes(word))) {
        el.remove();
      }
    });
  };

  /**
   * Await message from window to close the UI
   */
  window.addEventListener("message", (event) => {
    /** Check Same Window */
    if (event.source !== window) return;
    /** Check Action Type */
    if (event.data.type !== "CLOSE_UI") return;

    /** Remove the injected UI */
    const host = document.getElementById(ROOT_ID);
    if (host) host.remove();
  });

  /**
   * Await message to get text selection, and then grab page
   * metadata, and prepare payload for delivery to the backend
   */
  chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
    if (message.type === "PING") {
      sendResponse({ status: "ok" });
      return true;
    }

    const selection = window.getSelection();
    const og_title = document.querySelector('meta[name="og:title"]');
    const og_image = document.querySelector('meta[property="og:image"]');
    const description = document.querySelector('meta[name="description"]');
    const og_description = document.querySelector('meta[property="og:description"]');
    const x_description = document.querySelector('meta[name="twitter:description"]');
    const _description =
      description?.getAttribute("content") ||
      og_description?.getAttribute("content") ||
      x_description?.getAttribute("content");

    switch (message.type) {
      case "GET_HIGHLIGHT_DATA": {
        const markdown = (): string | null => {
          if (!selection || selection.rangeCount === 0) return null;

          const range = selection.getRangeAt(0);
          const fragment = range.cloneContents();

          const container = document.createElement("div");
          container.appendChild(fragment);
          removeAdLikeNodes(container);

          const cleaned = sanitizeHTML(container.innerHTML);
          return cleaned;
        };

        const payload = {
          content: selection?.toString() || _description,
          markdown: markdown(),
          title: og_title?.getAttribute("content") || document.title,
          url: location.href,
          description: _description || document.title,
          image: og_image?.getAttribute("content"),
        };

        await InjectUI(payload);
        sendResponse({ status: "ok" });
        break;
      }

      case "GET_WHOLE_PAGE": {
        const callArticle = (): Article => {
          const fragment = document.cloneNode(true) as Document;
          const reader = new Readability(fragment);
          const article = reader.parse();

          if (!article?.content) return null;

          const cleaned = sanitizeHTML(article?.content);
          return { cleaned, ...article };
        };

        const article = callArticle();

        const payload = {
          content: article?.textContent || _description,
          markdown: article?.cleaned,
          title: og_title?.getAttribute("content") || article?.title || document.title,
          url: location.href,
          description: _description || article?.excerpt || document.title,
          image: og_image?.getAttribute("content"),
        };

        await InjectUI(payload);
        sendResponse({ status: "ok" });
        break;
      }
    }
    return true;
  });
} // End of injection guard
