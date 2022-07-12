const extIframeId = 'iframe0';

export function getExtIframe() {
  return document.getElementById(extIframeId) as HTMLIFrameElement;
}

export function getExtIframStyle(height: number) {
  return `position:fixed;z-index: 99999;top:14px;right:20px;border:0;border-radius: 4px;box-shadow:0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);height:${height}px!important;`;
}

export function initExtIframe() {
  if (getExtIframe()) {
    return removeExtIframe();
  }

  injectExtIframe();
}

export function isExtIframeExist() {
  if (getExtIframe()) {
    return true;
  }

  return false;
}

export function injectExtIframe() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', extIframeId);
  iframe.src = chrome.runtime.getURL('index.html');

  // inject
  if (document.body) {
    // sometimes document body is not loaded yet. Just skip
    // document.body.insertBefore(iframe, document.body.lastChild);
    document.body.appendChild(iframe);
  }

  iframe.onload = () => {
    const height = 500;
    iframe.style.cssText = getExtIframStyle(height);
  };
}

export function reloadExtIframe(page: string, params: any) {
  const queryParams = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  let iframe = getExtIframe();

  if (iframe) {
    iframe.remove();
  }

  iframe = document.createElement('iframe') as HTMLIFrameElement;
  iframe.setAttribute('id', extIframeId);

  if (document.body) {
    // sometimes document body is not loaded yet. Just skip
    // document.body.insertBefore(iframe, document.body.lastChild);
    document.body.appendChild(iframe);
  }

  iframe.onload = () => {
    const height = 500;
    iframe.style.cssText = getExtIframStyle(height);
  };

  iframe.src = chrome.runtime.getURL(`index.html?#/${page}?${queryParams}`);
}

export function removeExtIframe() {
  const iframe = getExtIframe();
  setTimeout(() => {
    iframe.remove();
  }, 290);
}

chrome.runtime.onMessage.addListener((request, sender) => {
  switch (request.action) {
    case 'browser_action_click':
      initExtIframe();
      break;
    case 'popup_close_btn_click':
      removeExtIframe();
      break;
    case 'context_menu_click':
      reloadExtIframe(request.page, request.data);
      break;
  }
  return true;
});
