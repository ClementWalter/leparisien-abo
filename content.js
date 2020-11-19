const cleanPage = (pageTitle) => {
  console.log("Cleaning page " + pageTitle);
  Array.from(document.getElementsByClassName('content')).map((section) => section.style = "");
  Array.from(document.getElementsByClassName('ob-widget')).map((element) => element.parentNode.removeChild(element));
  Array.from(document.getElementsByClassName('piano-paywall')).map((element) => element.parentNode.removeChild(element));
};


chrome.runtime.onMessage.addListener(function (message) {
  if (message.title) {
    const timeouts = [1000, 2000, 3000, 4000, 5000, 10000];
    let timeout;
    for (timeout in timeouts) {
      window.setTimeout(() => cleanPage(message.title), timeouts[timeout])
    }
  }
});
