/**
 * Await message from Readlater web application used for authorizing
 * Readlater Saver extension.
 */
window.addEventListener("message", (event) => {
  /** Check Same Origin */
  if (event.origin !== import.meta.env.VITE_BASE_URL) return;
  /** Check Same Window */
  if (event.source !== window) return;
  /** Check Data Type */
  if (typeof event.data.token !== "string") return;
  /** Check Action Type */
  if (event.data.action !== "READLATER_AUTH") return;

  /** Check the Action Type */
  if (event.data.action === "READLATER_AUTH") {
    chrome.runtime.sendMessage(
      { action: "READLATER_AUTH", token: event.data.token },
      (res) => res,
    );
  }
});

/**
 * Await message from Readlater web application used for revoking
 * Readlater Saver extension authorization.
 */
window.addEventListener("message", (event) => {
  /** Check Same Origin */
  if (event.origin !== import.meta.env.VITE_BASE_URL) return;
  /** Check Same Window */
  if (event.source !== window) return;
  /** Check Action Type */
  if (event.data.action !== "READLATER_REVOKE") return;

  if (event.data.action === "READLATER_REVOKE") {
    chrome.runtime.sendMessage({ action: "READLATER_REVOKE" }, (res) => res);
  }
});

/**
 * Await message to get text selection, and then grab page
 * metadata, and prepare payload for delivery to the backend
 */
chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== "GET_HIGHLIGHT_DATA") return;

  const selection = window.getSelection();
  const description = document.querySelector('meta[name="description"]');

  chrome.runtime.sendMessage({
    type: "READLATER_PREPARE_DATA",
    payload: {
      content: selection?.toString(),
      title: document.title,
      url: location.href,
      description: description?.getAttribute("content"),
    },
  });
});
