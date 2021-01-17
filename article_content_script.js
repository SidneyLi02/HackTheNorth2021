let xmlHttp = new XMLHttpRequest();
let arrOpposing;
let arrAgreeing;
let domainName;
let title;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.domain);
      if (request.bias == "leftWing") {
          arrAgreeing = request.leftWing;
          arrOpposing = request.rightWing;
      } else {
          arrAgreeing = request.rightWing;
          arrOpposing = request.lefttWing;
      }
      title = request.title;
      domainName = request.domain;
    }
  );
  console.log(arrAgreeing);

  function httpGetAsync(theUrl, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true);
      xmlHttp.send(null);
  }

const reqUrl = 'https://www.googleapis.com/customsearch/v1?cx=b84518462114f3218&excludeTerms='+(domainName)+'&lr=%22lang_en%22&q='+(title)+
'&key=AIzaSyDAFluHuEtmYiWUpN6uKWgIQSuWXLmtDsA&cxb84518462114f3218';

httpGetAsync(reqUrl, (x) => console.log(x));
results = JSON.parse(xmlHttp.responseText);
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

const oppArr = [];
for (let i = 1; i<=50; i++) {
    if (isOpposingView(i)) { // checking if the webpage is opposing view
        oppArr.push({link: results.items[i].link, title: results.items[i].title});
    }
}

const agreeArr = [];
for (let i = 1; i<=50; i++) {
    if (isSameView(i)) { // checking if the webpage is same view
        agreeArr.push({link: results.items[i].link, title: results.items[i].title});
    }
}

/*
function connect() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            agreeArr: agreeArr,
            oppArr: oppArr
        });
      });
}
connect();
*/

chrome.runtime.sendMessage({agreArr: agreeArr, oppArr: oppArr});
// send oppArr and agreeArr to storage