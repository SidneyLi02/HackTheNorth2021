var agreeArr = [];
var oppArr = [];

function isOpposingView(index, arr, results, domain)
{
    let acc = true;
    for (let i = 0; i<arr.length; i++) {
        if (results.items[index].displayLink.includes(domain))  {
            acc = acc && false;
        } else {
            acc = acc && true;
        }
    }
    return acc;
}

function isSameView(index, arr, results, domain)
{
    let acc = true;
    for (let i = 0; i<arr.length; i++) {
        if (!(results.items[index].displayLink.includes(domain))) {
            acc = acc && true;
        } else {
            acc = acc && false;
        }
    }
    return acc;
}


function establishPort(port) {
    
}
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "otherArticles");
    port.onMessage.addListener(function(msg) {
        console.log("received message");
        if (msg.type == "displayOtherArticles") {
            //if (oppArr.length != 0 || agreeArr.length != 0){
                port.postMessage({type: "sentResults", agree: agreeArr, oppose: oppArr});
            //}
        }
    });
  });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch(request.type) {
          case "sendArticleInfo":
            if (request.bias == "leftWing") {
                arrAgreeing = request.leftWing;
                arrOpposing = request.rightWing;
                searchId2 = "778a2b28a14fec18e";
                searchId1 = "02b3a1274e7c15efe";
            } else {
                arrAgreeing = request.rightWing;
                arrOpposing = request.lefttWing;
                searchId1 = "778a2b28a14fec18e";
                searchId2 = "02b3a1274e7c15efe";
            }
            title = escape(request.title);
            domainName = escape(request.domain);
//b84518462114f3218&
            console.log("doing fetch");
            Promise.all([fetch(`https://www.googleapis.com/customsearch/v1?cx=${searchId1}&lr=%22lang_en%22&q=${title}&key=AIzaSyA79DqRoWL-84GkMabc47xTt2f_rWI3CVE`).then(value => value.json()), 
            fetch(`https://www.googleapis.com/customsearch/v1?cx=${searchId2}&lr=%22lang_en%22&q=${title}&key=AIzaSyA79DqRoWL-84GkMabc47xTt2f_rWI3CVE`).then(value => value.json())])
  .then(allResponses => {
    let response1 = allResponses[0];
    let response2 = allResponses[1];
    console.log(response1);
    let limit1 = Math.min(20, allResponses[0].items.length);
    let limit2 = Math.min(20, allResponses[1].items.length);
    for (let i = 0; i<limit1; i++) {
        if (isOpposingView(i, arrAgreeing, response1, domainName)) { // checking if the webpage is opposing view
            oppArr.push({link: response1.items[i].link, title: response1.items[i].title});
        }
    }
    for (let i = 0; i<limit2; i++) {
        if (isSameView(i, arrAgreeing, response2, domainName)) { // checking if the webpage is same view
            agreeArr.push({link: response2.items[i].link, title: response2.items[i].title});
        }
    }
    console.log("pushed, agreeArr");
    console.log(oppArr);
    
  })
  .catch(err => console.log(err));
}})