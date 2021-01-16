var pageConditions = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.foxnews.com/', hostEquals: 'www.cnn.com/',
            hostEquals: 'en.wikipedia.org', schemes: ['https', 'http'] }
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([pageConditions]);
    });
});