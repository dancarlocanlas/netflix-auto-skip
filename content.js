/**
 * Check for the Skip Intro / Recap button
 * then trigger the click event.
 */

const SKIP_INTRO = 'Skip Intro';
const SKIP_RECAP = 'Skip Recap';
const CONT_PLAYING = 'Continue Playing';

const getNode = (target) => document.querySelector(`[aria-label="${target}"]`);
const observerConfig = { childList: true, subtree: true };

/**
 * Mutation observer callback function 
 * @param {Array} _ mutations (unused)
 * @param {Object} observerInstance current observer instance
 */
function observerCallback(_, observerInstance) {
  console.log('Running observer...');
  const targetNode = getNode(SKIP_INTRO) || getNode(SKIP_RECAP) || getNode(CONT_PLAYING);
    
  if (!targetNode) return;

  console.log('Target node found!');
  targetNode.click();

  // In cases that there's an intro after a recap
  if (targetNode.getAttribute('aria-label') === SKIP_RECAP || targetNode.getAttribute('aria-label') === CONT_PLAYING) return;

  console.log('Disconnecting observer...');
  observerInstance.disconnect();
}

/**
 * Listen for messages from background script
 */
chrome.runtime.onMessage.addListener((message) => {
  if (message.urlChange) {
    const observer = new MutationObserver(observerCallback);
    
    console.log('Starting observer...');
    observer.observe(document.body, observerConfig);
  }
})

