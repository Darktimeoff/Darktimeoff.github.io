'use strict';
//@ts-check
import {getResource} from '../services/services';
export  class cardPartners {
	constructor(name, time_of_delivery, stars, price, kitchen, image, products, parentSelector) {
		this.name = name;
		this.time_of_delivery = time_of_delivery;
		this.stars = stars;
		this.price = price;
		this.kitchen = kitchen;
		this.image = image;
		this.products = products;
		this.parentSelector = parentSelector;
	}
	renderCardRestaurants() {
		if(this.checkArguments()) {throw new SyntaxError("not enough data module cardRestaurants on 17 string")};
		const card = document.createElement('a');
		card.classList.add('card', 'card-restaurant');
		card.innerHTML = `
			<img src="${this.image}" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${this.name}</h3>
					<span class="card-tag tag">${this.time_of_delivery} мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						${this.stars}
					</div>
					<div class="price">От ${this.price} ₽</div>
					<div class="category">${this.kitchen}</div>
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
export default function cardCreate(classCard, urlCardInformation) {
	getResource(urlCardInformation)
		.then(partners => {
			partners.forEach(({name, time_of_delivery, stars, kitchen, image, products}) => {
				setMinPrice(products)
					.then(price => {
						new classCard(name, time_of_delivery, stars, price, kitchen, image, products, '.cards-restaurants').renderCardRestaurants();
					})
			});
		});
}
async function setMinPrice(products) {
		const menu = await getResource(`db/${products}`);
		let min = Infinity;
		for (let i = 0; i < menu.length; i++) {
			if(menu[i].price < min) min = menu[i].price;
		}
		return min;
	
}