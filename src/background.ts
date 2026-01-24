/**
 * Background listener for handling authorization the
 * Readlater Saver extension
 */
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.action === "READLATER_AUTH") {
    const token = msg.token;

    chrome.storage.local.set({ readlaterToken: token });
    sendResponse({ status: "ok" });
  }
});

/**
 * Background listener for handling revoking authorization
 * for the Readlater Saver extension
 */
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.action === "READLATER_REVOKE") {
    chrome.storage.local.remove("readlaterToken");
    sendResponse({ status: "ok" });
  }
});
