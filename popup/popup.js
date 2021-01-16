const popupRun = () => {

    const popupBody = document.addEventListener('.extension-body');
    const findOppose = document.querySelector('#find-oppose');
    const findSimilar = document.querySelector('#find-similar');

    findOppose.onClick = () => {
        popupBody.classList.add("fadeOut");
    }
};

popupRun();

