var xmlHttp = new XMLHttpRequest();;
var arrOpposing;
var arrAgreeing;
var domainName;
var title;
let agreeArr = [];
let oppArr = [];

function httpGetAsync(theUrl)
{
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            results = JSON.parse(xmlHttp.responseText);
            console.log("Api has been called");
            callBackTest();
      }
      xmlHttp.open("GET", theUrl, true);
      xmlHttp.send(null);
    }
}

let reqUrl = 'https://www.googleapis.com/customsearch/v1?cx=b84518462114f3218&excludeTerms='+(domainName)+'&lr=%22lang_en%22&q='+(title)+
'&key=AIzaSyDAFluHuEtmYiWUpN6uKWgIQSuWXLmtDsA&cxb84518462114f3218';
//const testingFunc = (a) => console.log(a);
httpGetAsync(reqUrl);
//results = JSON.parse(xmlHttp.responseText);
//console.log("Api has been called");
//console.log(results);
function callBackTest() {
results = JSON.parse(xmlHttp.responseText);
console.log("Api has been called");
console.log(results);
function isOpposingView(index)
{
    let acc = true;
    for (let i = 0; i<arrAgreeing.length; i++) {
        if (results.items[index].displayLink.includes(arrAgreeing[i])) {
            acc = acc && false;
        } else {
            acc = acc && true;
        }
    }
    return acc;
}

function isSameView(index)
{
    let acc = true;
    for (let i = 0; i<arrOpposing.length; i++) {
        if (results.items[index].displayLink.includes(arrOpposing[i])) {
            acc = acc && true;
        } else {
            acc = acc && false;
        }
    }
    return acc;
}


for (let i = 1; i<=50; i++) {
    if (isOpposingView(i)) { // checking if the webpage is opposing view
        oppArr.push({link: results.items[i].link, title: results.items[i].title});
    }
}
for (let i = 1; i<=50; i++) {
    if (isSameView(i)) { // checking if the webpage is same view
        agreeArr.push({link: results.items[i].link, title: results.items[i].title});
    }
}
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch(request.type) {
          case "sendArticleInfo":
            if (request.bias == "leftWing") {
                arrAgreeing = request.leftWing;
                arrOpposing = request.rightWing;
            } else {
                arrAgreeing = request.rightWing;
                arrOpposing = request.lefttWing;
            }
            title = request.title;
            domainName = request.domain;
          case "displayOtherArticles":
              sendResponse({agree: agreeArr, oppose: oppArr});
          default:
              console.log("Unrecognized message: ", request);
      }
    }
  );