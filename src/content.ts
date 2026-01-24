/**
 * Await message from Readlater web application used for authorizing
 * Readlater Saver extension.
 */
window.addEventListener("message", (event) => {
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
  if (event.data.action === "READLATER_REVOKE") {
    chrome.runtime.sendMessage({ action: "READLATER_REVOKE" }, (res) => res);
  }
});
