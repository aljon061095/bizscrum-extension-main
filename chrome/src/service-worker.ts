import { initContextMenus } from './context-menu';

chrome.runtime.onInstalled.addListener(function () {
  initContextMenus();
});

chrome.action.onClicked.addListener(tab => {
  // TODO: Alert no longer supported in  MV3. Only choice is to open a popup window that mimics a message box.
  // if (!tab.url.match(/^(http|https):\/\//i)) {
  //   return alert('Unable to run the extension in this page.');
  // }
  const message = {
    action: 'browser_action_click',
    data: undefined
  };

  chrome.tabs.sendMessage(tab.id, message);
});
