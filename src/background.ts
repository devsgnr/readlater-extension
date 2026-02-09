import { CreateBookmark, CreateCollection } from "./api/mutations";
import { GetCollections } from "./api/queries";

/**
 * Background listener for handling authorization the
 * Readlater Saver extension
 */
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  (async () => {
    switch (msg.action) {
      case "OPEN_AUTH_TAB":
        await chrome.tabs.create({ url: msg.url });
        sendResponse({ status: "ok" });
        break;
      case "GET_READLATER_COLLECTIONS":
        const { data } = await GetCollections();
        sendResponse({ ...data.result.data });
        break;
      case "CREATE_READLATER_BOOKMARK":
        const res = await CreateBookmark({ ...msg.payload });
        sendResponse({ status: res.data });
        break;
      case "CREATE_READLATER_COLLECTION":
        const collection = await CreateCollection({ ...msg.payload });
        sendResponse({ status: collection.data });
        break;
    }
  })();

  return true;
});

/**
 * Background listener for external messages from web app
 */
chrome.runtime.onMessageExternal.addListener(async (msg, _, sendResponse) => {
  switch (msg.action) {
    case "READLATER_AUTH":
      /**
       * Background listener for handling adding authorization
       * for the Readlater Saver extension
       */
      await chrome.storage.local.set({ READLATER_TOKEN: msg.token });
      sendResponse({ status: "ok" });
      break;
    case "READLATER_REVOKE":
      /**
       * Background listener for handling revoking authorization
       * for the Readlater Saver extension
       */
      await chrome.storage.local.remove("READLATER_TOKEN");
      sendResponse({ status: "ok" });
      break;
  }

  return true;
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
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  /** Check for correct menu ID & Tab ID */
  if (info.menuItemId !== "SAVE_TO_READLATER" || !tab?.id || !tab.url) return;

  /** Make sure to run only in the right environment */
  if (!tab.url.startsWith("http")) return;

  /** Check if script is already injected */
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "PING" });
    /** Script already injected, just send the message */
    await chrome.tabs.sendMessage(tab.id, { type: "GET_HIGHLIGHT_DATA" });
  } catch {
    /** Script not injected, inject it first */
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
    /** Wait for script to load, then send message */
    setTimeout(async () => {
      await chrome.tabs.sendMessage(tab.id!, { type: "GET_HIGHLIGHT_DATA" });
    }, 100);
  }
});

/**
 * Background listener for when the Extension Icon is clicked
 * and then we can go ahead to perform the Inject
 */

chrome.action.onClicked.addListener(async (tab) => {
  /** Check for Tab ID and URL */
  if (!tab?.id || !tab.url) return;

  /** Make sure to run only in the right environment */
  if (!tab.url.startsWith("http")) return;

  /** Check if script is already injected */
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "PING" });
    /** Script already injected, send message to show UI */
    await chrome.tabs.sendMessage(tab.id, { type: "GET_HIGHLIGHT_DATA" });
  } catch {
    /** Script not injected, inject it first */
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
    /** Wait for script to load, then send message */
    setTimeout(async () => {
      await chrome.tabs.sendMessage(tab.id!, { type: "GET_HIGHLIGHT_DATA" });
    }, 100);
  }
});
