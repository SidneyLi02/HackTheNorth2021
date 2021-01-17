// domainName and title and arrAgreeing should come from storage

/*function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

req_url = 'https://www.googleapis.com/customsearch/v1?cx=b84518462114f3218&excludeTerms='+(domainName)+'&lr=%22lang_en%22&q='+(title)+
'&key=AIzaSyDAFluHuEtmYiWUpN6uKWgIQSuWXLmtDsA&cxb84518462114f3218';

results = json.parse(httpGetAsync(req_url));

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


// send arr to storage
*/

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.domain);
      if (request.bias == "leftWing") {
        sendResponse({farewell: "Trump sucks"});
      }
      else {
          sendResponse({farewell: "Trump rules"});
      }
    }
  );

// send oppArr and agreeArr to storage

