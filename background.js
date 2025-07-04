chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "postToTanka",
    title: "/tankaに投稿",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "postToTanka" && info.selectionText) {
    const text = encodeURIComponent(info.selectionText);
    chrome.storage.sync.get(['defaultName'], (result) => {
      const name = encodeURIComponent(result.defaultName || '');
      chrome.tabs.create({
        url: `https://xn--n8je9hcf0t4a.xn--q9jyb4c/tanka?tanka=${text}&name=${name}`
      }, (newTab) => {
        const tabId = newTab.id;
        chrome.tabs.onUpdated.addListener(function listener(id, info) {
          if (id === tabId && info.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.scripting.executeScript({
              target: { tabId },
              func: injectedFillOnce,
              args: [text, name]
            });
          }
        });
      });
    });
  }
});

function injectedFillOnce(encodedTanka, encodedName) {
  const tanka = decodeURIComponent(encodedTanka);
  const name = decodeURIComponent(encodedName);

  setTimeout(() => {
    const inputTanka = document.querySelector('input#tanka');
    if (inputTanka) {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(inputTanka, tanka);
      inputTanka.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const inputName = document.querySelector('input#name');
    if (inputName && name) {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(inputName, name);
      inputName.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, 500);
}

