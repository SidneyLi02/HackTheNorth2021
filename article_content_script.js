var agreeArr = [];
var oppArr = [];

function isOpposingView(index, arr, results)
{
    let acc = true;
    for (let i = 0; i<arr.length; i++) {
        if (results.items[index].displayLink.includes(arr[i])) {
            acc = acc && false;
        } else {
            acc = acc && true;
        }
    }
    return acc;
}

function isSameView(index, arr, results)
{
    let acc = true;
    for (let i = 0; i<arr.length; i++) {
        if (results.items[index].displayLink.includes(arr[i])) {
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
            if (oppArr.length != 0 || agreeArr.length != 0){
                port.postMessage({type: "sentResults", agree: agreeArr, oppose: oppArr});
            }
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
            } else {
                arrAgreeing = request.rightWing;
                arrOpposing = request.lefttWing;
            }
            title = request.title;
            domainName = request.domain;

            console.log("doing fetch");
            fetch('https://www.googleapis.com/customsearch/v1?cx=b84518462114f3218&excludeTerms='+(domainName)+'&lr=%22lang_en%22&q='+(title)+
            '&key=AIzaSyDAFluHuEtmYiWUpN6uKWgIQSuWXLmtDsA&cxb84518462114f3218')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    for (let i = 0; i<=0; i++) {
        if (isOpposingView(i, arrAgreeing, data)) { // checking if the webpage is opposing view
            oppArr.push({link: data.items[i].link, title: data.items[i].title});
        }
    }
    for (let i = 0; i<=0; i++) {
        if (isSameView(i, arrOpposing, data)) { // checking if the webpage is same view
            agreeArr.push({link: data.items[i].link, title: data.items[i].title});
        }
    }
    console.log("pushed, agreeArr");
    console.log(oppArr);
    
  })
  .catch(err => console.log(err));
}})