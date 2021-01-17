const run = () => {

    const popupBody = document.querySelector('.init');
    const resultsBody = document.querySelector('.init2');
    const findOppose = document.querySelectorAll('.extension-body button')[0];
    const findSimilar = document.querySelectorAll('.extension-body button')[1];
    const newsLinks = document.querySelector(".newsLinks");
    var opposeToggle = false;
    var similarToggle = false;
    let arrAgreeing;
    let arrOpposing;

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          arrAgreeing = request.arrAgreeing;
          arrOpposing = request.arrOpposing;
        }
      );
     
    findOppose.addEventListener("click", () => {
        if (findSimilar.classList.contains("noClick")) {
            findSimilar.classList.remove("noClick")
        }
        //findOppose.classList.add("noClick");
        // popupBody.classList.add("fadeOut");

        resultsBody.classList.remove("fadeOut");
        opposeToggle = true;

        if (similarToggle) {
            newsLinks.innerHTML = "";
            similarToggle = false;
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
            itemList.appendChild(a)
            newsLinks.appendChild(itemList)
        }
    })
    
    findSimilar.addEventListener("click", () => {
        if (findOppose.classList.contains("noClick")) {
            findOppose.classList.remove("noClick");
        }
        //findSimilar.classList.add("noClick")
        //popupBody.classList.add("fadeOut");
        resultsBody.classList.remove("fadeOut");

        similarToggle = true;

        if (opposeToggle) {
            newsLinks.innerHTML = "";
            opposeToggle = false;
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
            itemList.appendChild(a)
            newsLinks.appendChild(itemList)
        }
    })

}
run();