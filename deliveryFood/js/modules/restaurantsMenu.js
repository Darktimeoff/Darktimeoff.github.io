'use strict';
//@ts-check
import {getResource} from '../services/services';
import modals from './modals';

class CardMenu{
    constructor(name, description, price, image, parentSelector) {
        this.name = name;
        this.description = description;
        this.price = +price;
        this.image = image;
        this.parentSelector = parentSelector;

    }
    renderCardRestaurantsMenu() {
		if(this.checkArguments()) {throw new SyntaxError("not enough data module cardRestaurants on 17 string")};
		const card = document.createElement('div');
		card.classList.add('card');
		card.innerHTML = `
            <img src="${this.image}" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${this.name}</h3>
                </div>
                <!-- /.card-heading -->
                <div class="card-info">
                    <div class="ingredients">${this.description}
                    </div>
                </div>
                <!-- /.card-info -->
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${this.price} ₽</strong>
                </div>
            </div>
		`
		document.querySelector(this.parentSelector).append(card);
    }
    checkArguments() {
		for(let arg in this) {
			if(!this[arg] && typeof this[arg] != 'object') return true;
		} 
	}
}

export default function createMenuPage() {
    const containerPromo = document.querySelector('.container-promo');
    const buttonCart = document.querySelector('.button-cart');
    const menu = document.querySelector('.menu');
    const restaurants = document.querySelector('.restaurants');
    const logo  = document.querySelector('.logo');
    const cardRestaurants = document.querySelector('.cards-restaurants');
    function createRestaurantMenu() {
        cardRestaurants.addEventListener('click', (e) => {
            e.preventDefault();
            let cardRestaurant = e.target.closest('.card-restaurant');
            let cardTitle = cardRestaurant.querySelector('.card-title');
            let price = cardRestaurant.querySelector('.price').textContent;
            getResource(`db/partners.json`)
                .then(response => {
                    const restaurant = findNesessaryItem(response, 'name', cardTitle.textContent);
                    renderMenuPage();
                    changeHeaderMenuPage(restaurant.name, restaurant.stars, price, restaurant.kitchen);
                    createMenuCard(CardMenu, `db/${restaurant.products}`, '.cards-menu');
                });
        });
    }
    function createMenuCard(classCard, url, parentSelector) {
        getResource(url)
            .then(items => {
                items.forEach(({id, name, description, price, image}) => {
                    new classCard(name, description, price, image, parentSelector).renderCardRestaurantsMenu();
                })
            })
    }
    function cancelRenderMenuPage() {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        buttonCart.style.display = '';
        menu.classList.add('hide');
        document.querySelector('.cards-menu').querySelectorAll('.card').forEach( card => {
            card.remove();
        })
    }
    function renderMenuPage(cancelRender = false) {
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        buttonCart.style.display = 'block';
        menu.classList.remove('hide');
        modals('.modal-cart', '.button-cart', '.close');
        if(cancelRender && !menu.classList.contains('hide')) cancelRenderMenuPage();
        else return;
    }
    function findNesessaryItem(list, property, value) {
        for(let item of list) {
            if(item[property] == value) {
                return item;
            }
        }
    }
    function changeHeaderMenuPage(title, rating, price, category) {
        const sectionHeading = menu.querySelector('.section-heading');
        const titleElm = menu.querySelector('.restaurant-title');
        const ratingElm = menu.querySelector('.rating');
        const priceElm = menu.querySelector('.price');
        const categoryElm = menu.querySelector('.category');

        titleElm.textContent = title;
        ratingElm.textContent = rating;
        priceElm.textContent = price
        categoryElm.textContent =  category;
    }
    logo.addEventListener('click', () => {
        renderMenuPage(true);
    })
    createRestaurantMenu();
}