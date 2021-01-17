const run = () => {

    const popupBody = document.querySelector('.init');
    const resultsBody = document.querySelector('.init2');
    const findOppose = document.querySelectorAll('.extension-body button')[0];
    const findSimilar = document.querySelectorAll('.extension-body button')[1];
    const newsLinks = document.querySelector(".newsLinks");
    var opposeToggle = false;
    var similarToggle = false;
    var arrAgreeing;
    var arrOpposing;
    var initState = 0;


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var port = chrome.tabs.connect(tabs[0].id, {name: "otherArticles"});
    port.postMessage({type: "displayOtherArticles"});
    port.onMessage.addListener(function(msg) {
        if (msg.type == "sentResults") {
            arrAgreeing = msg.agree;
            arrOpposing = msg.oppose;
            console.log("finished request");
        }
    });
});
 
    findOppose.addEventListener("click", () => {
        if (findSimilar.classList.contains("noClick")) {
            findSimilar.classList.remove("noClick")
        }
        // popupBody.classList.add("fadeOut");

        resultsBody.classList.remove("fadeOut");
        opposeToggle = true;

        if (initState === 0 && arrAgreeing.length === 0) {
            var defaultText = document.createTextNode("There is none.");
            newsLinks.appendChild(defaultText)
            findOppose.classList.add("noClick");
        }

        if (similarToggle) {
            newsLinks.innerHTML = "";
            similarToggle = false;
            initState = 0;
        }

        // adding 
        if (arrAgreeing.length != 0) {

            let temp = arrAgreeing.shift();

            var itemList = document.createElement("LI");
            var a = document.createElement('a');
            
            let titleText = temp.title
            let articleLink = temp.link

            var linkText = document.createTextNode(titleText);
            a.appendChild(linkText);
            a.href = articleLink;
            a.setAttribute('target', '_blank');
            itemList.appendChild(a)
            newsLinks.appendChild(itemList)

            initState++;
        }
    })
    
    findSimilar.addEventListener("click", () => {
        if (findOppose.classList.contains("noClick")) {
            findOppose.classList.remove("noClick");
        }
        //popupBody.classList.add("fadeOut");
        resultsBody.classList.remove("fadeOut");

        similarToggle = true;

        if (initState === 0 && arrOpposing.length === 0) {
            var defaultText = document.createTextNode("There is none.");
            newsLinks.appendChild(defaultText)
            findSimilar.classList.add("noClick");
        }

        if (opposeToggle) {
            newsLinks.innerHTML = "";
            opposeToggle = false;
            initState = 0;
        }

        if (arrOpposing.length != 0) {
            // adding 

            let temp = arrOpposing.shift();

            let titleText = temp.title
            let articleLink = temp.link

            var itemList = document.createElement("LI");
            var a = document.createElement('a');
            var linkText = document.createTextNode(titleText);
            a.appendChild(linkText);
            a.href = articleLink;
            a.setAttribute('target', '_blank');
            itemList.appendChild(a)
            newsLinks.appendChild(itemList)

            initState++;
        }
    })

}
run();