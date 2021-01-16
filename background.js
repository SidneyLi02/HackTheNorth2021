var pageConditions = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: ['www.foxnews.com/', 'www.cnn.com/'], schemes: ['https', 'http'] }
        })
    ],
    actions: [ new chrome.declarativeContent.showPageAction()]
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([pageConditions])
    })
})