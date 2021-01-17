// domainName and title and arrAgreeing should come from storage

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

const arr = [];
for (let i = 1; i<=50; i++) {
    if (isOpposingView(i)) { // checking if the webpage is opposing view
        arr.push(results.items[i].link);
    }
}

// send arr to storage
