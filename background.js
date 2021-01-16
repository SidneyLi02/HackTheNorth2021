var leftWing = ['cnn', 'msnbc', 'theguardian'];
var rightWing = ['foxnews', 'nypost', 'wsj'];
var bias;

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab => {
        determineArticle(tab.tabId, current_tab);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.get(tabId, current_tab => {
            determineArticle(tabId, current_tab);
        });
    }
});

let determineArticle = function(tabId, current_tab) {
    let url = current_tab.url;
    var site;
    for (let i = 0; i < leftWing.length; i++) {
        site = leftWing[i];
        if (url.includes(site)) {
            bias = 'leftWing';
            chrome.pageAction.show(tabId);
        }
    }
    for (let j = 0; j < rightWing.length; j++) {
        site = rightWing[j];
        if (url.includes(site)) {
            bias = 'rightWing';
            chrome.pageAction.show(tabId);
        }
    }
}
