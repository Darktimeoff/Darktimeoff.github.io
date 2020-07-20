'use strict';
//@ts-check
export default function searchRestaurants() {
    const inputSearch = document.querySelector('.input-search');
    let cardTitle = document.querySelectorAll('.card-title');
    let restaurants = document.querySelectorAll('.card-restaurant');

    function hideListElements(list, index = undefined) {
        for (let i = 0; i < list.length; i++) {
            if(i === index)  continue; 
            else {
               list[i].style.display = 'none';
            }
        }
        hideListElements.index = index;
    }

    function showListElements(list, index = undefined) {
        for (let i = 0; i < list.length; i++) {
            if(i === index) continue; 
            else {
                list[i].style.display = 'block';
            }
        }
    }

    inputSearch.addEventListener('input', (e) => {

        if(cardTitle.length === 0) {cardTitle = document.querySelectorAll('.card-title');}
        if(restaurants.length === 0) {restaurants = document.querySelectorAll('.card-restaurant');}

        if(!inputSearch.value) showListElements(restaurants, hideListElements.index);
        else{
            let searchWord = new RegExp(inputSearch.value.toLowerCase());
            for(let i = 0; i < cardTitle.length; i++) {
                if(cardTitle[i].textContent.toLowerCase().match(searchWord)) {

                    hideListElements(restaurants, i);
                    break;
                } else {
                    continue;
                }
            }
        }
    });
}
