var leftWing = ['cnn.com',
'msnbc.com',
'theguardian.com',
'slate.com',
'mediaite.com',
'thedailybeast.com',
'huffpost.com',
'newyorker.com',
'dailyshow.com',
'buzzfeed.com',
'nbcnews.com',
'pbs.com',
'economist.com',
'bloomberg.com',
'usatoday.com',
'abcnews.go.com'
];
var rightWing = ['foxnews.com',
'nypost.com',
'wsj.com',
'nationalreview.com',
'hughhewitt.com',
'washingtontimes.com',
'drudgereport.com',
'breitbart.com',
'rushlimbaugh.com',
'glennbeck.com',
'nationalreview.com',
'theblaze.com',
'redstate.com'
];

var bias;
var title;
var domain;
var article = false;

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
    article = false;
    var site;
    for (let i = 0; i < leftWing.length; i++) {
        site = leftWing[i];
        if (url.includes(site)) {
            bias = 'leftWing';
            article = true;
            chrome.pageAction.show(tabId);
            title = current_tab.title;
            domain = getDomainName(url);
            chrome.tabs.executeScript(null, {file: './article_content_script.js'}, () => {
                console.log("script injected");
                connect();
                console.log("made it");
                return;
            });
        }
    }
    for (let j = 0; j < rightWing.length; j++) {
        site = rightWing[j];
        if (url.includes(site)) {
            bias = 'rightWing';
            article = true;
            chrome.pageAction.show(tabId);
            title = current_tab.title;
            domain = getDomainName(url);
            chrome.tabs.executeScript(null, {file: './article_content_script.js'}, () => {
                console.log("script injected");
                connect();
                console.log("made it");
                return;
            });
        }
    }
    if (article == false) {
        console.log("Should be hidden");
        chrome.pageAction.setIcon({
            tabId: tabId,
            path: "./grayed_out.png"
        });
    }
}

let getDomainName = function(url) {
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    if (url.indexOf("www") > -1) {
        hostname = hostname.split('.')[1];
    }
    else {
        hostname.split('.')[0];
    }
    return hostname;
}

function connect() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "sendArticleInfo",
            title: title,
            domain: domain,
            bias: bias,
            leftWing: leftWing,
            rightWing: rightWing
        });
      });
}