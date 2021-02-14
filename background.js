/**
 * Listens for tab changes -- specifically URL changes
 * then triggers the DOM observer via messaging
 */
chrome.tabs.onUpdated.addListener((tabId, _, tabInfo) => {
  const { url } = tabInfo;

  if (!url.includes('netflix.com/watch')) return;

  console.log('url changed for a netflix tab')
  
  chrome.tabs.sendMessage(tabId, { urlChange: true });
});