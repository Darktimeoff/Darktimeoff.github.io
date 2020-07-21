'use strict';
//@ts-check
import modals from './modals';
import {close} from './modals'
export default function cart() { 
	const modalDialog = document.querySelector('.modal-cart').querySelector('.modal-dialog');
	const cardsMenu = document.querySelector('.cards-menu');
    const modalPriceTotal = document.querySelector('.modal-pricetag');
    const cartArray = [];
    function counterItem() {
		modalDialog.addEventListener('click', (e) => {
			let foodCurPrice = e.target.closest('.food-row').querySelector('.food-price');
			let foodName = e.target.closest('.food-row').querySelector('.food-name');
			let tempObj = cartArray.find((item, i) => {
				if(item.title === foodName.textContent) {
					item.i = i;
					return item;
				}
			});
			if(e.target.getAttribute('data-plus') =='') {
				let currentCounter = e.target.previousElementSibling;
				currentCounter.textContent = (+currentCounter.textContent)  + 1;
				modalPriceTotal.textContent = parseInt(modalPriceTotal.textContent) + parseInt(foodCurPrice.textContent) + ' ₽';
				if(tempObj) tempObj.count += 1; 
			} else if(e.target.getAttribute('data-minus') =='') {
				let currentCounter = e.target.nextElementSibling;
				currentCounter.textContent =  (+currentCounter.textContent) - 1;
				if(tempObj) tempObj.count -= 1; 
				if((+currentCounter.textContent) == 0 && tempObj.count == 0) {
					e.target.closest('.food-row').remove()
					cartArray.splice(tempObj.i, 1);
				};
				modalPriceTotal.textContent = parseInt(modalPriceTotal.textContent) - parseInt(foodCurPrice.textContent) + ' ₽';
			}
		});
	}
	function getCartInf() {
		cardsMenu.addEventListener('click', (e) => {
			let button = e.target.closest('.button-add-cart');
			if(button) {
				const title = e.target.closest('.card-text').querySelector('.card-title-reg').textContent;
				const price = button.nextElementSibling.textContent;
				const id = button.id;
				const food = cartArray.find((item) => {
					return item.id === id;
				})
				if(food) food.count += 1;
				else {
					cartArray.push({
						id,
						title,
						price,
						count: 1
					});
				}
				addToCart(cartArray, modalDialog, '.modal-body');
			}
		});
	}
	function renderCart(title, price, count, modalElm, parentSelector) {
		modalElm.querySelector(parentSelector).insertAdjacentHTML('afterbegin',  `
			<div class="food-row">
				<span class="food-name">${title}</span>
				<strong class="food-price">${price}</strong>
				<div class="food-counter">
					<button class="counter-button" data-minus>-</button>
					<span class="counter">${count}</span>
					<button class="counter-button" data-plus>+</button>
				</div>
			</div>
		`);
	}
	function addToCart(cartArray, modalElm, parentSelector) {
		modalDialog.querySelector('.modal-body').innerHTML = '';
		let sum = 0;
		cartArray.forEach(({id, title, price, count}) => {
			renderCart(title, price, count, modalElm, parentSelector)
			sum += parseInt(price) * parseInt(count);
		});
		modalPriceTotal.textContent = parseInt(sum) + ' ₽';
	}
	function clearCart(cartItemParentElm) {
		const buttonClearCart = modalDialog.querySelector('.clear-cart');
		buttonClearCart.addEventListener('click', () => {
			cartItemParentElm.innerHTML = '';
			modalPriceTotal.textContent = '0 ₽';
			close(document.querySelector('.modal-cart'), 'is-open');
			cartArray.splice(0);
		});
	}	
	modals('.modal-cart', '.button-cart', '.close');
	getCartInf();
	counterItem();
	clearCart(modalDialog.querySelector('.modal-body'));
}