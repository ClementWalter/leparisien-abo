// Regex-pattern to check URLs against.
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
const leParisienUrlRegex = /^http?:\/\/(?:[^./?#]+\.)?leparisien\.fr/;
let leParisienTabIds = [];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	const title = tab.title;
	if(leParisienUrlRegex.test(tab.url)){
	  leParisienTabIds.push(tabId);
	  leParisienTabIds = [...new Set(leParisienTabIds)];
	  chrome.storage.sync.set({leParisienTabIds}, function() {
      console.log('LeParisien tab id set to ' + leParisienTabIds);
      chrome.tabs.sendMessage(tab.id, {title});
    });
	}
});

chrome.tabs.onRemoved.addListener(function(tabId){
  chrome.storage.sync.get(["leParisienTabIds"], function(result) {
    leParisienTabIds = result.leParisienTabIds;
    leParisienTabIds = leParisienTabIds && leParisienTabIds.filter(
      (leParisienTabId) => leParisienTabId !== tabId
    );
    chrome.storage.sync.set({leParisienTabIds}, function(){
      console.log(`Currently ${leParisienTabIds.length} LeParisien tabs opened`)
    })
  })
});
