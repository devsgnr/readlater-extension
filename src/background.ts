/**
 * Background listener for handling authorization the
 * Readlater Saver extension
 */
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.action === "READLATER_AUTH") {
    const token = msg.token;

    chrome.storage.local.set({ READLATER_TOKEN: token });
    sendResponse({ status: "ok" });
  }
});

/**
 * Background listener for handling revoking authorization
 * for the Readlater Saver extension
 */
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.action === "READLATER_REVOKE") {
    chrome.storage.local.remove("READLATER_TOKEN");
    sendResponse({ status: "ok" });
  }
});

/**
 * Background listener for adding "Save to Readlater" to
 * the browser context (when you right click), only for when
 * text is selected (aka. highlighted)
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "SAVE_TO_READLATER",
    title: "Save to Readlater",
    contexts: ["selection"],
  });
});

/** Continuation: Listener for click from the click above */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  /** Check for correct menu ID & Tab ID */
  if (info.menuItemId !== "SAVE_TO_READLATER" || !tab?.id) return;

  chrome.tabs.sendMessage(tab.id, {
    type: "GET_HIGHLIGHT_DATA",
  });
});

/**
 * Await message for getting prepare and moving into
 * persistence phase, and cleaning out data
 */
chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== "READLATER_PREPARE_DATA") return;

  console.log(message.payload);
});
