const run = () => {

    const popupBody = document.querySelector('.init');
    const findOppose = document.querySelectorAll('.extension-body button')[0];
    const findSimilar = document.querySelectorAll('.extension-body button')[1];
    const searchResultsBody = document.querySelectorAll('.displayNews');

    findOppose.addEventListener("click", () => {
        popupBody.classList.add("fadeOut")
        searchResultsBody.classList.add("fadeIn")
    })
    
    findSimilar.addEventListener("click", () => {
        popupBody.classList.add("fadeOut")
        searchResultsBody.classList.add("fadeIn")
    })

}
run();