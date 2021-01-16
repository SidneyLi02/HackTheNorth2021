var leftWing = ['cnn', 'msnbc', 'theguardian'];
var rightWing = ['foxnews', 'nypost', 'wsj'];

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab => {
        let url = current_tab.url;
        var site;
        for (let i = 0; i < leftWing.length; i++) {
            site = leftWing[i];
            if (url.includes(site)) {
                console.log("This is leftwing");
                chrome.pageAction.show(tab.tabId);
            }
        }
        for (let j = 0; j < rightWing.length; j++) {
            site = rightWing[j];
            if (url.includes(site)) {
                console.log("This is rightwing");
            }
        }
    });
});