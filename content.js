const SKIP_INTRO = 'Skip Intro';
const SKIP_RECAP = 'Skip Recap';
const getNode = (target) => document.querySelector(`[aria-label="${target}"]`);
const observerConfig = { childList: true, subtree: true };

function observerCallback(_, observerInstance) {
  const targetNode = getNode(SKIP_INTRO) || getNode(SKIP_RECAP);
    
  if (!targetNode) return;

  targetNode.click();
  observerInstance.disconnect();
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.urlChange) {
    const observer = new MutationObserver(observerCallback);
    
    observer.observe(document.body, observerConfig);
  }
})

