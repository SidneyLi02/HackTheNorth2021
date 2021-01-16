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

const arr = [];
for (let i = 1; i<=10; i++) {
    if (condition) { // condition is placeholder for checking if the webpage is opposing view
        arr.append(results.items[i].formattedUrl);
    }
}

// then display however many elements from arr in the popup
