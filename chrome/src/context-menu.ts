export function initContextMenus() {
  chrome.contextMenus.create({
    id: 'bizCtxMenu',
    title: 'Bizscrum',
    contexts: ['selection']
  });
}

function ctxClickHandler(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
  // TODO: Alert no longer supported in  MV3. Only choice is to open a popup window that mimics a message box.
  // if (!info.pageUrl.match(/^(chrome):\/\//i)) {
  //   return alert('Unable to run the extension in this page.');
  // }

  const request = {
    action: 'context_menu_click',
    page: undefined,
    data: undefined
  };

  switch (info.menuItemId) {
    case 'bizCtxMenu':
      request.page = 'popup';
      request.data = { notes: info.selectionText };
      break;

    default:
      throw new Error('Context menu id not supported.');
  }
  chrome.tabs.sendMessage(tab.id, request);
}

chrome.contextMenus.onClicked.addListener(ctxClickHandler);
