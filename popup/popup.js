const run = () => {

    const popupBody = document.querySelector('.init');
    const resultsBody = document.querySelector('.init2');
    const findOppose = document.querySelectorAll('.extension-body button')[0];
    const findSimilar = document.querySelectorAll('.extension-body button')[1];

    findOppose.addEventListener("click", () => {
        popupBody.classList.add("fadeOut");
        resultsBody.classList.remove("fadeOut");

    })
    
    findSimilar.addEventListener("click", () => {
        popupBody.classList.add("fadeOut");
        resultsBody.classList.remove("fadeOut");
    })

}
run();