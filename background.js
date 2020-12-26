chrome.tabs.onUpdated.addListener((tabId, _, tabInfo) => {
  const { url } = tabInfo;

  if (!url.includes('netflix.com/watch')) return;
  
  chrome.tabs.sendMessage(tabId, { urlChange: true });
});