const cleanPage = (pageTitle) => {
  console.log("Cleaning page " + pageTitle);
  // Override blurring rule on every stylesheets
  Array.from(document.styleSheets).forEach(x => x.insertRule('.blurText { filter: blur(0px) !important; }'));
  // Remove any paywall modals
  document.querySelectorAll('.piano-paywall').forEach(x => x.remove());
};

chrome.runtime.onMessage.addListener(function (message) {
  // 3 delayed attempts to compensate possible race conditions (css stylesheets could load slowly)
  if (message.title) {
    const timeouts = [1000, 2000, 3000, 4000, 5000, 10000];
    let timeout;
    for (timeout in timeouts) {
      window.setTimeout(() => cleanPage(message.title), timeouts[timeout])
    }
  }
});
