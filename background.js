var leftWing = ['cnn', 'msnbc', 'theguardian'];
var rightWing = ['foxnews', 'nypost', 'wsj'];

//var leftWing = ['www.cnn.com', 'www.msnbc.com', 'www.theguardian.com'];
//var rightwing = ['www.foxnews.com', 'nypost.com', 'www.wsj.com'];

var bias;
var title;
var domain;

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

            title = current_tab.title;
            domain = getDomainName(url);
            chrome.tabs.executeScript(null, {file: './article_content_script.js'}, () => {
                console.log("script injected");
                connect();
            });

            // put the title of the article and the domain name and agreeing view array into storage before executing this script
            chrome.tabs.executeScript(null, {file: './article_content_script.js'}, () => console.log("script injected"));

        }
    }
    for (let j = 0; j < rightWing.length; j++) {
        site = rightWing[j];
        if (url.includes(site)) {
            bias = 'rightWing';
            chrome.pageAction.show(tabId);

            title = current_tab.title;
            domain = getDomainName(url);
            chrome.tabs.executeScript(null, {file: './article_content_script.js'}, () => {
                console.log("script injected");
                connect();
            });

            // put the title of the article and the domain name and agreeing view array into storage before executing this script
            chrome.tabs.executeScript(null, {file: './article_content_script.js'}, () => console.log("script injected"));

        }
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
            title: title,
            domain: domain,
            bias: bias,
            leftWing: leftWing,
            rightWing: rightWing
        });
      });
}