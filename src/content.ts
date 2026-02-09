/** Constants */
const ROOT_ID = "readlater-root";

/** Prevent multiple injections */
if ((window as any).__READLATER_INJECTED__) {
  throw new Error("Content script already injected");
}
(window as any).__READLATER_INJECTED__ = true;

/**
 * Function for injecting CSS Inline
 */
const InjectStyles = async (shadowRoot: ShadowRoot) => {
  const url = chrome.runtime.getURL("readlater-extension.css");
  const cssText = await fetch(url).then((res) => res.text());

  const style = document.createElement("style");
  style.textContent = cssText;

  shadowRoot.appendChild(style);
};

/**
 * Inject Fonts
 */
const InjectFonts = async (shadowRoot: ShadowRoot) => {
  const fonts = [
    "fonts/open_runde/OpenRunde-Regular.woff2",
    "fonts/switzer/Switzer-Variable.woff2",
    "fonts/expose/Expose-Variable.woff2",
  ];

  fonts.forEach((font) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.href = chrome.runtime.getURL(font);
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    shadowRoot.append(link);
  });
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
    backgroundColor: "var(--background)",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)",
  });

  /** Append the DIV to the document as Child */
  document.body.appendChild(host);

  /** Close UI when clicking outside and clear the payload */
  const handleClickOutside = (e: MouseEvent) => {
    if (!host.contains(e.target as Node)) {
      host.remove();
      chrome.storage.local.remove("READLATER_PAYLOAD");
      document.removeEventListener("click", handleClickOutside);
    }
  };
  setTimeout(() => document.addEventListener("click", handleClickOutside), 0);

  /** Attach Shadow DOM Tree: Preserve CSS and more */
  const shadow = host.attachShadow({ mode: "open" });

  /** Create a DIV for Shadow DOM */
  const appRoot = document.createElement("div");
  shadow.appendChild(appRoot);

  /** Inject Fonts */
  await InjectFonts(shadow);

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

  switch (message.type) {
    case "GET_HIGHLIGHT_DATA":
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

      const payload = {
        content: selection?.toString() || _description,
        title: og_title?.getAttribute("content") || document.title,
        url: location.href,
        description: _description,
        image: og_image?.getAttribute("content"),
      };

      await InjectUI(payload);
      sendResponse({ status: "ok" });
      break;
  }
  return true;
});
